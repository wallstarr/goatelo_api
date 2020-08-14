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

app.get('/', (req, res) => {
    res.json({
        confirmation: "success"
    })
})

app.get('/api', (req, res) => {
    const query = req.query

    if (query.max && query.max) { // returns players that are in a range of elo values
        Player.find({goatElo: { $gte: query.min, $lte: query.max }})
            .then((players) => {
                res.json({
                    players
                })
            })
            .catch(() => {
                console.log(error)
            })
    } else if (query.randomPlayerPair === "1") { // returns two random players with near elo values
        Player.countDocuments().exec((err, count) => {
            var randomPlayerOneIndex = Math.floor(Math.random() * count)
            const arrayOfValidPlayers = []
            for (let x = randomPlayerOneIndex - 2; x < randomPlayerOneIndex + 3; x++) {
                if (x >= 0 && x < count && x != randomPlayerOneIndex) {
                    arrayOfValidPlayers.push(x)
                }
            }
            console.log(arrayOfValidPlayers)

            const playerOne = Player.findOne().skip(randomPlayerOneIndex).exec((err, result) => {
                console.log(result.firstName)
            })
        })
    }
})


app.listen(3000);