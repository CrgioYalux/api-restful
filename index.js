"use strict"

const mongoose = require('mongoose')
const app = require("./app")
const config = require("./config")

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.db, options, (err, res) => {
    if (err) {
        return console.log(`Failed to connect to the database: ${err}`)
    }
    console.log('Sucessfully connected to the database')

    app.listen(config.port, () => {
        console.log(`API REST running on http://localhost:${config.port}`)
    }
    )
})


