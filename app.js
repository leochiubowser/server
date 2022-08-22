//基本https設定

const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const SocketServer = require("ws").Server
const app = express();


const server = https.createServer(
    {
        key: fs.readFileSync(path.join("./private.key")),
        cert: fs.readFileSync(path.join("./cert.crt")),
    },
    app,
);

// 傳送所有leochiu資料夾中的檔案

app.use(express.static("./leochiu"));



// WebSocket

const wss = new SocketServer({ server })


wss.on("Connection", (stream) => {
    
    wss.on("message", (stream) => {
        console.log('Client connected')
    })
    
    wss.on("close", (stream) => {
        console.log('Close connected')
    })
})



// login

app.post("/login", (req, res) => {
    var result;
    var correct = false
    var account = req.body.account
    var password = req.body.password
    var correct_i;

    // sessionStorage.setItem("name", "")

    data = fs.readFileSync("./data/account.json", "utf-8")
    data = JSON.parse(data)

    for (let i = 0; i < data.length; i++) {
        if (account == data[i].account) {
            if (data[i].password == password) {
                correct = true
                correct_i = i;
            }
        }
    }
    if (correct) {
        res.sendFile(__dirname + "/leochiu/comments/main.html")
    }
    else {
        res.sendFile(__dirname + "/leochiu/comments/wrong.html")
    }

})


// 監聽 https預設桿:443


server.listen(443);