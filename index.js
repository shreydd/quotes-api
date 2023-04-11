const dotenv = require('dotenv');
let express = require('express');
let app = express();
const cors = require('cors');
const fs = require('fs');

dotenv.config();

const port = process.env.PORT;
const http = require("http");
const server = http.Server(app);

// server stuff
app.use(cors({
    origin: '*'
}))

app.get("/", function (req, res) {
    console.log('hit')
    res.send("Hello Express");
});

app.get("/quote", function (req, res) {
    console.log('/quote')

    // read file
    fs.readFile('data.json', 'utf-8', (error, data) => {

        if(error) {
            console.error('error:', error)
            res.status(500).send('Internal server error')
            return;
        }

        let parsed_json = JSON.parse(data)

        let randomNumber = Math.random() * (parsed_json.length)
        randomNumber = Math.floor(randomNumber)

        let responseToSend = JSON.parse(data)[randomNumber]
        res.status(200).json(responseToSend).end()
    })
    
})

server.listen(port, () => {
    console.log(`listening at ${port}`);
})