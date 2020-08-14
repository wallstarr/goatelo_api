const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const Player = require('./models/Player')

console.log(process.env.DATABASE_URL)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Bruh moment!!")
})

const emptyData = {
    firstName: "",
    lastName: "",
    goatElo: 0,
    birthday: {
        year: 0,
        month: 0,
        day: 0
    },
    team: "",
    position: "",
    url: ""
}

// tier 1
const giannisData = {
    firstName: "Giannis",
    lastName: "Antetokounmpo",
    goatElo: 2400,
    birthday: {
        year: 1994,
        month: 12,
        day: 6
    },
    team: "Milwaukee Bucks",
    position: "PF",
    url: "https://a.espncdn.com/photo/2020/0327/r683588_1296x729_16-9.jpg"
}

const kawhiData = {
    firstName: "Kawhi",
    lastName: "Leonard",
    goatElo: 2400,
    birthday: {
        year: 1991,
        month: 6,
        day: 29
    },
    team: "Los Angeles Clippers",
    position: "SF",
    url: "https://ca-times.brightspotcdn.com/dims4/default/538778f/2147483647/strip/true/crop/3240x2160+300+0/resize/1680x1120!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fbd%2Fea%2F0a9ee574420e99929f0119c09d40%2Fclippers-spurs-basketball-94818.jpg"
}

const leBronData =  {
    "firstName": "LeBron",
    "lastName": "James",
    "goatElo": 2400,
    "birthday": {
        year: 1984,
        month: 12,
        day: 30
    },
    "team": "Los Angeles Lakers",
    "position": "SF",
    "url": "https://static01.nyt.com/images/2020/06/10/us/politics/10lebron-voters/10lebron-voters-mediumSquareAt3X.jpg"
}

const hardenData = {
    firstName: "James",
    lastName: "Harden",
    goatElo: 2400,
    birthday: {
        year: 1989,
        month: 8,
        day: 26
    },
    team: "Houston Rockets",
    position: "SG",
    url: "https://spacecityscoop.com/wp-content/uploads/getty-images/2017/07/1141851134.jpeg"
}

const anthonyData = {
    firstName: "Anthony",
    lastName: "Davis",
    goatElo: 2400,
    birthday: {
        year: 1993,
        month: 3,
        day: 11
    },
    team: "Los Angeles Lakers",
    position: "PF",
    url: "https://images.actionnetwork.com/blog/2020/08/nba-player-props-betting-odds-picks-predictions-myles-turner-anthony-davis-ivica-zubac-thursday-augu.jpg"
}

// tier 2
const jokicData = {
    firstName: "Nikola",
    lastName: "Jokic",
    goatElo: 2250,
    birthday: {
        year: 1995,
        month: 2,
        day: 19
    },
    team: "Denver Nuggets",
    position: "C",
    url: "https://pm1.narvii.com/6754/24688f244296fd5b16e8af844be8093ad2b69007v2_hq.jpg"
}

const curryData = {
    firstName: "Stephen",
    lastName: "Curry",
    goatElo: 2250,
    birthday: {
        year: 1988,
        month: 3,
        day: 14
    },
    team: "Golden State Warriors",
    position: "PG",
    url: "https://img.bleacherreport.net/img/images/photos/003/879/235/hi-res-eca68b4d05d144f6f9ab8c31e6d2f12c_crop_north.jpg?1596833837&w=3072&h=2048"
}

const doncicData = {
    firstName: "Luka",
    lastName: "Doncic",
    goatElo: 2250,
    birthday: {
        year: 1999,
        month: 2,
        day: 28
    },
    team: "Dallas Mavericks",
    position: "PG",
    url: "https://image-cdn.essentiallysports.com/wp-content/uploads/20200621151035/lukadoncic-cropped5xpc4uy6pnx915fmhowgkpjvvjpg.jpg"
}

const lillardData = {
    firstName: "Damian",
    lastName: "Lillard",
    goatElo: 2250,
    birthday: {
        year: 1990,
        month: 7,
        day: 15
    },
    team: "Portland Trailblazers",
    position: "PG",
    url: "https://www.nbcsports.com/northwest/sites/csnnw/files/2020/06/15/usatsi_12456644.jpg"
}

const butlerData = {
    firstName: "Jimmy",
    lastName: "Butler",
    goatElo: 2250,
    birthday: {
        year: 1989,
        month: 9,
        day: 14
    },
    team: "Miami Heat",
    position: "SG",
    url: "https://www.miamiherald.com/latest-news/c59yuf/picture240682526/alternates/FREE_1140/402%20Timberwolves%20at%20Heat%20DS.jpg"
}

// tier 3
const embiidData = {
    firstName: "Joel",
    lastName: "Embiid",
    goatElo: 2025,
    birthday: {
        year: 1994,
        month: 3,
        day: 16
    },
    team: "Philadelphia 76ers",
    position: "C",
    url: "https://img.bleacherreport.net/img/images/photos/003/875/578/hi-res-aae5d217fb9ff574ebdc82c468cc10bc_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top"
}

const pgData = {
    firstName: "Paul",
    lastName: "George",
    goatElo: 2025,
    birthday: {
        year: 1990,
        month: 5,
        day: 2
    },
    team: "Los Angeles Clippers",
    position: "SG",
    url: "https://www.essentiallysports.com/wp-content/uploads/Paul-George-2.jpg"
}

const katData = {
    firstName: "Karl",
    lastName: "Anthony-Towns",
    goatElo: 2025,
    birthday: {
        year: 1995,
        month: 11,
        day: 15
    },
    team: "Minnesota Timberwolves",
    position: "C",
    url: "https://www.nba.com/timberwolves/sites/timberwolves/files/by-the-numbers.jpg"
}

const westbrookData = {
    firstName: "Russell",
    lastName: "Westbrook",
    goatElo: 2025,
    birthday: {
        year: 1988,
        month: 11,
        day: 12
    },
    team: "Houston Rockets",
    position: "PG",
    url: "https://miro.medium.com/proxy/1*HLJqDpT4UoBD8CJ7HmCUjg.jpeg"
}

const cpData = {
    firstName: "Chris",
    lastName: "Paul",
    goatElo: 2025,
    birthday: {
        year: 1985,
        month: 5,
        day: 6
    },
    team: "Oklahoma City Thunder",
    position: "PG",
    url: "https://s.yimg.com/uu/api/res/1.2/OrV5Ah0z9wy6fmHMOV6pWA--~B/aD0yNDYzO3c9NDM3ODtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-images/2019-10/249404c0-f9e8-11e9-bd6d-b5f7ad635939"
}

const siakamData = {
    firstName: "Pascal",
    lastName: "Siakam",
    goatElo: 2025,
    birthday: {
        year: 1994,
        month: 4,
        day: 2
    },
    team: "Toronto Raptors",
    position: "PF",
    url: "https://www.nba.com/images/cms/2019-11/siakam-dribble-iso-1118.jpg?cw=1920&w=2188&x=87&ch=1080&h=1459&y=50"
}

// tier 4
const tatumData = {
    firstName: "Jayson",
    lastName: "Tatum",
    goatElo: 1900,
    birthday: {
        year: 1998,
        month: 3,
        day: 3
    },
    team: "Boston Celtics",
    position: "SF",
    url: "https://sportshub.cbsistatic.com/i/r/2020/01/12/43ca0a98-785d-40f0-902f-543cfd217e36/thumbnail/1200x675/20a45685d63a3adfbdf23d923ad249f7/jaysontatum.jpg"
}

const khashData = {
    firstName: "Khris",
    lastName: "Middleton",
    goatElo: 1900,
    birthday: {
        year: 1991,
        month: 8,
        day: 12
    },
    team: "Milwaukee Bucks",
    position: "SG",
    url: "https://images.daznservices.com/di/library/omnisport/28/1e/khris-middleton-usnews-031919-ftr-gettyjpg_cainrt8ycxjq1ofjvk3fnn3c7.jpg?t=-1731019807&quality=100"
}

const bradData = {
    firstName: "Bradley",
    lastName: "Beal",
    goatElo: 1900,
    birthday: {
        year: 1993,
        month: 6,
        day: 28
    },
    team: "Washington Wizards",
    position: "SG",
    url: "https://cdn.vox-cdn.com/thumbor/8k5kqtjYYLsjTZbdj6p8vogDI-c=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19606758/1193935927.jpg.jpg"
}

const simmonsData = {
    firstName: "Ben",
    lastName: "Simmons",
    goatElo: 1900,
    birthday: {
        year: 1996,
        month: 7,
        day: 20
    },
    team: "Philadelphia 76ers",
    position: "PG",
    url: "https://www.gannett-cdn.com/presto/2020/08/08/USAT/10744043-6134-4e4e-a9dc-9c42a2bf8d7f-2020-08-07_Ben_Simmons.jpg?crop=1980,1478,x366,y102"
}

const zionData = {
    firstName: "Zion",
    lastName: "Williamson",
    goatElo: 1900,
    birthday: {
        year: 2000,
        month: 7,
        day: 6
    },
    team: "New Orleans Pelicans",
    position: "PF",
    url: "https://images.daznservices.com/di/library/sporting_news/fc/b3/zion-williamson-020320-getty_md8qw5hqghod1gi6b4jidkfir.jpg?t=300082928&quality=100"
}

const lowryData = {
    firstName: "Kyle",
    lastName: "Lowry",
    goatElo: 1900,
    birthday: {
        year: 1986,
        month: 3,
        day: 25
    },
    team: "Toronto Raptors",
    position: "PG",
    url: "https://www.sportsnet.ca/wp-content/uploads/2019/01/20345549.jpg"
}

const kyrieData = {
    firstName: "Kyrie",
    lastName: "Irving",
    goatElo: 1900,
    birthday: {
        year: 1992,
        month: 3,
        day: 23
    },
    team: "Brooklyn Nets",
    position: "PG",
    url: "https://balldurham.com/wp-content/uploads/getty-images/2017/07/1197872817.jpeg"
}

const bookerData = {
    firstName: "Devin",
    lastName: "Booker",
    goatElo: 1900,
    birthday: {
        year: 1996,
        month: 10,
        day: 30
    },
    team: "Phoenix Suns",
    position: "SG",
    url: "https://image-cdn.essentiallysports.com/wp-content/uploads/20200808010036/Devon-Booker-1.jpg"
}

const gobertData = {
    firstName: "Rudy",
    lastName: "Gobert",
    goatElo: 1900,
    birthday: {
        year: 1992,
        month: 6,
        day: 26
    },
    team: "Utah Jazz",
    position: "C",
    url: "https://image-cdn.essentiallysports.com/wp-content/uploads/20200410233715/rudy-gobert-coronavirus.jpg"
}

const mitchellData = {
    firstName: "Donovan",
    lastName: "Mitchell",
    goatElo: 1900,
    birthday: {
        year: 1996,
        month: 9,
        day: 7
    },
    team: "Utah Jazz",
    position: "SG",
    url: "https://img.bleacherreport.net/img/images/photos/003/857/395/hi-res-2083c9f06ac5a6a1d1134b7a082b2139_crop_north.jpg?1584131796&w=3072&h=2048"
}

const ingramData = {
    firstName: "Brandon",
    lastName: "Ingram",
    goatElo: 1900,
    birthday: {
        year: 1997,
        month: 9,
        day: 2
    },
    team: "New Orleans Pelicans",
    position: "SF",
    url: "https://s.yimg.com/uu/api/res/1.2/r8V1E21Q5KEv0.lioFxGqQ--~B/aD0xNTUwO3c9MjMyNTtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-images/2019-11/b12fedd0-1122-11ea-bd5b-4576fe1ad40f"
}

const jaylenData = {
    firstName: "Jaylen",
    lastName: "Brown",
    goatElo: 1900,
    birthday: {
        year: 1996,
        month: 10,
        day: 24
    },
    team: "Boston Celtics",
    position: "SG",
    url: "https://sportshub.cbsistatic.com/i/r/2020/01/06/c5428390-f608-4728-a5d2-8d1d49fcbd47/thumbnail/1200x675/deafa22f7c40d893d40b05a043dbc0a1/jaylen-brown.jpg"
}

const kembaData = {
    firstName: "Kemba",
    lastName: "Walker",
    goatElo: 1900,
    birthday: {
        year: 1990,
        month: 5,
        day: 8
    },
    team: "Boston Celtics",
    position: "PG",
    url: "https://img.bleacherreport.net/img/images/photos/003/877/054/hi-res-bc56aa976573d14b80471b541a2fdaed_crop_north.jpg?1595373904&w=3072&h=2048"
}

const traeData = {
    firstName: "Trae",
    lastName: "Young",
    goatElo: 1900,
    birthday: {
        year: 1998,
        month: 9,
        day: 19
    },
    team: "Atlanta Hawks",
    position: "PG",
    url: "https://i.insider.com/5e8f27058427e92b7d217049?width=1100&format=jpeg&auto=webp"
}

// tier 5
const sabonisData = {
    firstName: "Domantis",
    lastName: "Sabonis",
    goatElo: 1700,
    birthday: {
        year: 1996,
        month: 5,
        day: 3
    },
    team: "Indiana Pacers",
    position: "C",
    url: "https://8points9seconds.com/wp-content/uploads/getty-images/2017/07/1126989714.jpeg"
}

const jrueData = {
    firstName: "Jrue",
    lastName: "Holiday",
    goatElo: 1700,
    birthday: {
        year: 1990,
        month: 6,
        day: 12
    },
    team: "New Orleans Pelicans",
    position: "PG",
    url: "https://i2.wp.com/franchisesports.co.uk/wp-content/uploads/2020/01/Jrue-Holiday-trade.jpg?fit=1200%2C668&ssl=1"
}

const adebayoData = {
    firstName: "Bam",
    lastName: "Adebayo",
    goatElo: 1700,
    birthday: {
        year: 1997,
        month: 7,
        day: 18
    },
    team: "Miami Heat",
    position: "C",
    url: "https://megasportsarena.com/wp-content/uploads/2019/10/Bam-Adebayo.jpg"
}

const porzingisData = {
    firstName: "Kristaps",
    lastName: "Porzingis",
    goatElo: 1700,
    birthday: {
        year: 1995,
        month: 8,
        day: 2
    },
    team: "Dallas Mavericks",
    position: "PF",
    url: "https://img.bleacherreport.net/img/images/photos/003/842/224/hi-res-ea735fda36403655fe5151131626d95e_crop_north.jpg?1576090728&w=3072&h=2048"
}

const louData = {
    firstName: "Lou",
    lastName: "Williams",
    goatElo: 1700,
    birthday: {
        year: 1986,
        month: 10,
        day: 27
    },
    team: "Los Angeles Clippers",
    position: "SG",
    url: "https://losangeles.cbslocal.com/wp-content/uploads/sites/14984641/2020/07/GettyImages-1133923426.jpg?w=1500"
}

const murrayData = {
    firstName: "Jamal",
    lastName: "Murray",
    goatElo: 1700,
    birthday: {
        year: 1997,
        month: 2,
        day: 23
    },
    team: "Denver Nuggets",
    position: "PG",
    url: "https://cdn.vox-cdn.com/thumbor/RW-MxAWou6fUB9wUzLRZT8PRCHs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19593724/usa_today_13887100.jpg"
}

const mccollumData = {
    firstName: "CJ",
    lastName: "McCollum",
    goatElo: 1700,
    birthday: {
        year: 1991,
        month: 9,
        day: 19
    },
    team: "Portland Trailblazers",
    position: "SG",
    url: "https://cdn.theathletic.com/app/uploads/2019/08/22080442/USATSI_12627101-e1591397887981-1024x683.jpg"
}

const morantData = {
    firstName: "Ja",
    lastName: "Morant",
    goatElo: 1700,
    birthday: {
        year: 1999,
        month: 8,
        day: 10
    },
    team: "Memphis Grizzlies",
    position: "PG",
    url: "https://hoopshabit.com/wp-content/uploads/getty-images/2018/08/1194342121.jpeg"
}

const tobiasData = {
    firstName: "Tobias",
    lastName: "Harris",
    goatElo: 1700,
    birthday: {
        year: 1992,
        month: 7,
        day: 15
    },
    team: "Philadelphia 76ers",
    position: "SF",
    url: "https://static01.nyt.com/images/2019/04/19/sports/19nets3/merlin_153707535_fd436761-ad2f-48db-a5c5-9fdf011bc643-superJumbo.jpg"
}

const derozanData = {
    firstName: "DeMar",
    lastName: "DeRozan",
    goatElo: 1700,
    birthday: {
        year: 1989,
        month: 8,
        day: 7
    },
    team: "San Antonio Spurs",
    position: "SG",
    url: "https://sportshub.cbsistatic.com/i/r/2019/11/27/476c25ce-aa20-4500-aeb7-300dc40d7911/thumbnail/1200x675/a1be67d8f2ec866149c10d92c1b5c5c6/demar-derozan.jpg"
}

const foxData = {
    firstName: "De'Aaron",
    lastName: "Fox",
    goatElo: 1700,
    birthday: {
        year: 1997,
        month: 12,
        day: 20
    },
    team: "Sacramento Kings",
    position: "PG",
    url: "https://i.ytimg.com/vi/vjpLKF2c3y8/maxresdefault.jpg"
}

const harrellData = {
    firstName: "Montrezl",
    lastName: "Harrell",
    goatElo: 1700,
    birthday: {
        year: 1994,
        month: 1,
        day: 26
    },
    team: "Los Angeles Clippers",
    position: "PF",
    url: "https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_2521,w_3200/http%3A%2F%2Fhoopshabit.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F1195348517.jpeg"
}

const vucData = {
    firstName: "Nikola",
    lastName: "Vucevic",
    goatElo: 1700,
    birthday: {
        year: 1990,
        month: 10,
        day: 24
    },
    team: "Orlando Magic",
    position: "C",
    url: "https://cdn.vox-cdn.com/thumbor/0x88QHLxdXwBv9X_ONFTBds2fqk=/0x0:2117x1694/1200x800/filters:focal(832x523:1170x861)/cdn.vox-cdn.com/uploads/chorus_image/image/59136303/usa_today_10681971.0.jpg"
}

// tier 6
const vanvleetData = {
    firstName: "Fred",
    lastName: "VanVleet",
    goatElo: 1557,
    birthday: {
        year: 1994,
        month: 2,
        day: 25
    },
    team: "Toronto Raptors",
    position: "PG",
    url: "https://cdn.vox-cdn.com/thumbor/eqZwxop4pTsFjgTDUrTaR7H-faE=/0x0:2084x3273/1200x800/filters:focal(860x824:1192x1156)/cdn.vox-cdn.com/uploads/chorus_image/image/66965222/1209117358.jpg.0.jpg"
}

const sgaData = {
    firstName: "Shai",
    lastName: "Gilgeous-Alexander",
    goatElo: 1557,
    birthday: {
        year: 1998,
        month: 7,
        day: 12
    },
    team: "Oklahoma City Thunder",
    position: "PG",
    url: "https://cdn.vox-cdn.com/thumbor/X2Q91aP2LnZtWZG6CIwf794BQ-8=/0x0:4247x3138/1200x800/filters:focal(2022x744:2700x1422)/cdn.vox-cdn.com/uploads/chorus_image/image/66096147/1192322879.jpg.0.jpg"
}

const bledsoeData = {
    firstName: "Eric",
    lastName: "Bledsoe",
    goatElo: 1557,
    birthday: {
        year: 1989,
        month: 12,
        day: 9
    },
    team: "Milwaukee Bucks",
    position: "PG",
    url: "https://www.nba.com/bucks/sites/bucks/files/getty-images-1128329768.jpg?w=756&h=504"
}

const gallinariData = {
    firstName: "Danilo",
    lastName: "Gallinari",
    goatElo: 1557,
    birthday: {
        year: 1988,
        month: 8,
        day: 8
    },
    team: "Oklahoma City Thunder",
    position: "SF",
    url: "https://i1.wp.com/thefranchiseok.com/wp-content/uploads/2020/02/AP_20023151547775-scaled.jpg?fit=2560%2C1707"
}

const smartData = {
    firstName: "Marcus",
    lastName: "Smart",
    goatElo: 1557,
    birthday: {
        year: 1994,
        month: 3,
        day: 6
    },
    team: "Boston Celtics",
    position: "SG",
    url: "https://www.nbcsports.com/bayarea/sites/csnbayarea/files/2020/05/13/marcussmartusatsi.jpg"
}

const haywardData = {
    firstName: "Gordon",
    lastName: "Hayward",
    goatElo: 1557,
    birthday: {
        year: 1990,
        month: 3,
        day: 23
    },
    team: "Boston Celtics",
    position: "SF",
    url: "https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F1108%2Fr460750_1296x729_16%2D9.jpg"
}

const gasolData = {
    firstName: "Marc",
    lastName: "Gasol",
    goatElo: 1557,
    birthday: {
        year: 1985,
        month: 1,
        day: 29
    },
    team: "Toronto Raptors",
    position: "C",
    url: "https://www.nba.com/images/cms/2019-03/gasol_emotion.jpg?w=1920&h=1080"
}

let playersData = [giannisData, kawhiData, leBronData, hardenData, anthonyData, jokicData, curryData, doncicData, lillardData, butlerData, embiidData, pgData, katData, westbrookData, cpData, siakamData, tatumData, khashData, bradData, simmonsData, zionData, lowryData, kyrieData, bookerData, gobertData, mitchellData, ingramData, jaylenData, kembaData, traeData, sabonisData, jrueData, adebayoData, porzingisData, louData, murrayData, mccollumData, morantData, tobiasData, derozanData, foxData, harrellData, vucData, vanvleetData, sgaData, bledsoeData, gallinariData, smartData, haywardData, gasolData]

console.log(playersData.length)

for (playerData in playersData) {
    let somePlayer = new Player(playersData[playerData])
    somePlayer.save((error) => {
    if (error) {
        console.log("Error")
    } else {
        console.log(`${somePlayer.firstName} ${somePlayer.lastName} is officially in!`)
    }
})
}