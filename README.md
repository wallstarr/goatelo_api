# GOATElo API

## A RESTful API built for a an NBA elo ranking website.

### After cloning this app:

Install the dependencies
```
npm install
```
Create your own MongoDB server -- if you wish to use Atlas, create a free one on their [website](https://www.mongodb.com/cloud/atlas). Then, replace DATABASE_URL in the .env_sample file with your own collection link and rename .env_sample to .env.

Then run the addingPlayers.js script to add my rankings to your MongoDB server (essentially in tier list format). Change the values of the players's elo values as you see fit. Then run the server.

```
node addingPlayers.js
nodemon app.js
```

### Then use the API routes in the following ways (through localhost:3000):
- GET: **localhost:3000/api/players** - retrieves all players, sorted by elo values in descending order
- GET: **localhost:3000/api/players/randomPair** - retrieves two random players that are close in elo value. 
- GET: **localhost:3000/api/players?min=x&max=y** - retrieves all players with elo values in between and including x and y. 
- PATCH: **localhost:3000/api/players?_idOne=x&_idTwo=y&winner=1** - updates player elo values depending on the value of winner. _idOne and _idTwo are the MongoDB _id's assigned to two distinct players. If winner === 1, then the player with _idOne wins, and vice versa if the winner !== 1. Each player's respective elo values are adjusted and updated using the [elo ranking system](https://en.wikipedia.org/wiki/Elo_rating_system). 

*front end currently work in progress*
