
const Cards = require('./dbCards.js') 

const express = require('express')
const mongoose = require('mongoose')
const Cors = require('cors')
const Pusher = require('pusher')


const app = express()
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://thuyngoc:tn3032000@cluster0.vkztqeo.mongodb.net/?retryWrites=true&w=majority'

const pusher = new Pusher({
  appId: "1524839",
  key: "7fe28a81015d211efc48",
  secret: "208e4b4aa3787a15a9af",
  cluster: "ap2",
  useTLS: true
});

app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
})

//API Endpoints
const db = mongoose.connection
db.once("open", () => {
    console.log("DB Connected")
    const msgCollection = db.collection("messagingmessages")
    const changeStream = msgCollection.watch()
    changeStream.on('change', change => {
        console.log(change)

        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})


app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/messages/new', (req, res) => {
    const dbCart = req.body
    Cards.create(dbCart, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/messages/sync', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
