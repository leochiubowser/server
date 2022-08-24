//基本https設定

const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const nodemailer = require("nodemailer")
const io = require("socket.io")(https)

const server = https.createServer(
    {
        key: fs.readFileSync(path.join("./private.key")),
        cert: fs.readFileSync(path.join("./cert.crt")),
    },
    app,
);

// 載入時傳送檔案，計算人次。

app.get("/", (req, res) => {
    loadPeople();
    res.sendFile(__dirname + "/leochiu/index.html");
})
app.get("/index.html", (req, res) => {
    loadPeople();
    res.sendFile(__dirname + "/leochiu/index.html");
})


//阻止闖入留言

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/leochiu/comment/index.html");
})
app.get("/comments/main.html", (req, res) => {
    res.sendFile(__dirname + "/leochiu/comment/index.html");
})



// 傳送所有leochiu資料夾中的檔案

app.use(express.static("./leochiu"));

// 計算人數統計

var people;


//讀取

function loadPeople() {
    fs.readFile("./leochiu/data/people.txt", "utf-8", function (err, data) {
        people = parseInt(data);
        people += 1;
        var data = people;
        data = String(data);
        write(data);
    });
}

//寫入

function write(num) {
    fs.writeFileSync("./leochiu/data/people.txt", num)
}

//寫入留言


var data
var date1
var year
var month
var date
var day
var hour
var minute
var second

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


app.use(express.urlencoded({ extended: true }))



function getDate() {
    date1 = new Date()
    year = date1.getFullYear()
    month = date1.getMonth() + 1
    date = date1.getDate()
    day = weekday[date1.getDay()]
    hour = date1.getHours()
    minute = date1.getMinutes()
    second = date1.getSeconds()
}




// Socket.io



io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});



// app.post("/login", (req, res) => {
//     var result;
//     var correct = false
//     var account = req.body.account
//     var password = req.body.password
//     var correct_i;

//     // sessionStorage.setItem("name", "")

//     data = fs.readFileSync("./data/account.json", "utf-8")
//     data = JSON.parse(data)

//     for (let i = 0; i < data.length; i++) {
//         if (account == data[i].account) {
//             if (data[i].password == password) {
//                 correct = true
//                 correct_i = i;
//             }
//         }
//     }
//     if (correct) {
//         res.sendFile(__dirname + "/leochiu/comment/index.html")
//     }
//     else {
//         res.sendFile(__dirname + "/leochiu/comments/wrong.html")
//     }

// })




// 監聽 https預設桿:443

//Send Email

app.post("/SendEmail", (req, res) => {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ANJH811@gmail.com",
            pass: "zkcsettzywudeaoo"
        }
    })

    var mailOptions = {
        from: "ANJH811@gmail.com",
        to: `${req.body.email}`,
        subject: `${req.body.title}`,
        text: `${req.body.content}`,
        // html: '<h1>Welcome</h1><p>That was easy!</p>',
        // attachments: [{
        //     path: "./anjh811_linebot_icon.png",
        // }, {
        //     filename: "description.txt",
        //     content: "This is the txt file."
        // }]
    }



    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.sendFile(__dirname + "/leochiu/SendEmail/fail.html")
        }
        else {
            // console.log("Email sent : " + info.response)
            res.sendFile(__dirname + "/leochiu/SendEmail/finish.html")
        }
    })


})


server.listen(443);
io.listen(server);