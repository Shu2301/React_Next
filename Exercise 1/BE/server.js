const Cards = require('./dbCards.js') 

const express = require('express')
const mongoose = require('mongoose')
const Cors = require('cors')


const app = express()
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://thuyngoc:tn3032000@cluster0.vkztqeo.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
})

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/v2/posts', (req, res) => {
    const dbCart = req.body
    Cards.create(dbCart, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/v2/posts', (req, res) => {
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
