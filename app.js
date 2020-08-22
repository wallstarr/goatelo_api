const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const Player = require('./models/Player')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Connection to database successful")
})

app.get('/api/players', (req, res) => {
    const query = req.query
    if (query.min && query.max) { // returns players that are in a range of elo values
        Player.find({goatElo: { $gte: query.min, $lte: query.max }}).sort({"goatElo": -1})
            .then((players) => {
                res.json({
                    players
                })
            })
            .catch(() => {
                console.log(error)
            })
    } else if (query.randomPlayerPair === "1") { // returns two random players with close elo values
        Player.countDocuments().exec((err, count) => {
            const randomPlayerOneIndex = Math.floor(Math.random() * count)
            const arrayOfValidPlayers = []
            for (let x = randomPlayerOneIndex - 2; x < randomPlayerOneIndex + 3; x++) {
                if (x >= 0 && x < count && x != randomPlayerOneIndex) {
                    arrayOfValidPlayers.push(x)
                }
            }

            const randomValue = Math.floor(Math.random() * arrayOfValidPlayers.length)
            const randomPlayerTwoIndex = arrayOfValidPlayers[randomValue]

            Player.findOne().sort({"goatElo": -1}).skip(randomPlayerOneIndex).exec((err, playerOne) => {
                Player.findOne().sort({"goatElo": -1}).skip(randomPlayerTwoIndex).exec((err, playerTwo) => {
                    res.json({
                        playerOne, playerTwo
                    })
                })
            })
        })
    } else { // simply return all players
        Player.find().sort({"goatElo": -1})
            .then((players) => {
                res.json({
                    players
                })
            })
    }
})


app.get('/api/players/randomPair', (req, res) => {
    // returns two random players with close elo values
    Player.countDocuments().exec((err, count) => {
        const randomPlayerOneIndex = Math.floor(Math.random() * count)
        const arrayOfValidPlayers = []
        for (let x = randomPlayerOneIndex - 2; x < randomPlayerOneIndex + 3; x++) {
            if (x >= 0 && x < count && x != randomPlayerOneIndex) {
                arrayOfValidPlayers.push(x)
            }
        }

        const randomValue = Math.floor(Math.random() * arrayOfValidPlayers.length)
        const randomPlayerTwoIndex = arrayOfValidPlayers[randomValue]

        Player.findOne().sort({"goatElo": -1}).skip(randomPlayerOneIndex).exec((err, playerOne) => {
            Player.findOne().sort({"goatElo": -1}).skip(randomPlayerTwoIndex).exec((err, playerTwo) => {
                res.json({
                    playerOne, playerTwo
                })
            })
        })
    })
})

/*
  Notes:
  This patch is for taking two players respective _id's and 
  applying an elo adjustment according to who won. If query.winner = "1", then 
  the player with _idOne wins, and vice versa. 
*/

app.patch('/api/players', async (req, res) => {
    const query = req.query
    if (query._idOne && query._idTwo && query.winner && query._idOne !== query._idTwo) {
        
        let playerOne = false
        let playerTwo = false
        
        try {
            const playerOneData = await Player.findById(query._idOne)
            const playerTwoData = await Player.findById(query._idTwo)
            playerOne = playerOneData
            playerTwo = playerTwoData
        } catch (err) {
            res.json({
                message: err
            })
        }

        if (playerOne && playerTwo) {
            adjustEloRatings(playerOne, playerTwo, query.winner === "1" ? true : false)
            await Player.updateOne({_id: playerOne._id}, {$set: {goatElo: playerOne.goatElo}})
            await Player.updateOne({_id: playerTwo._id}, {$set: {goatElo: playerTwo.goatElo}})
        } else {
            res.json({
                message: "Error in retrieving players."
            })
        }

        res.json({
            playerOne: playerOne,
            playerTwo: playerTwo
        })
    }
})

/*
  MODIFIES: The elo ratings of player1 and player2
  EFFECTS: Adjusts the elo ratings of player1 & player2
  depending on the truth value of player1Wins
  Notes:
  TR = Transformed Rating
  ES = Expected Score
  AER = Adjusted Elo Rating
*/
function adjustEloRatings(player1, player2, player1Wins) {
    const player1TR = Math.pow(10, player1.goatElo / 400)
    const player2TR = Math.pow(10, player2.goatElo / 400)
  
    const player1ES = player1TR / (player1TR + player2TR)
    const player2ES = player2TR / (player1TR + player2TR)
  
    const player1Score = player1Wins ? 1 : 0
    const player2Score = player1Wins ? 0 : 1
  
    const kValue = 32
    const player1AER = player1.goatElo + kValue * (player1Score - player1ES)
    const player2AER = player2.goatElo + kValue * (player2Score - player2ES)
  
    player1.goatElo = player1AER
    player2.goatElo = player2AER
  }

  
app.listen(3000);
