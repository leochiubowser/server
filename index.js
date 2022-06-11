//基本https設定

const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const server = https.createServer(
    {
        key: fs.readFileSync(path.join("key.pem")),
        cert: fs.readFileSync(path.join("cert.pem")),
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
    fs.writeFile("./leochiu/data/people.txt", num, (err, data) => { })
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


app.post("/", (req, res) => {
    var content = req.body.content
    if (content != "") {
        data = fs.readFileSync("./leochiu/comments/data/comments.json", "utf-8")
        data = JSON.parse(data)
        getDate();
        data[data.length] = {
            user_name: "Leo Chiu",
            time: {
                year: year,
                month: month,
                date: date,
                day: day,
                hour: hour,
                minute: minute,
                second: second
            },
            content: content
        }
        data = JSON.stringify(data)
        fs.writeFileSync("./leochiu/comments/data/comments.json", data, "utf-8")
    }
    res.sendFile(__dirname + "/leochiu/comments/main.html");
})


app.post("/login", (req, res) => {
    var result;
    var correct = false
    var account = req.body.account
    var password = req.body.password
    var correct_i;

    result = {
        name: ""
    }
    result = JSON.stringify(result)
    fs.writeFileSync("./leochiu/comments/data/login.json", result, "utf-8")

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
        result = {
            name: data[correct_i].name
        }
        result = JSON.stringify(result)
        fs.writeFileSync("./leochiu/comments/data/login.json", result, "utf-8")
    }
    else {
        res.sendFile(__dirname + "/leochiu/comments/wrong.html")
    }
})


// 監聽 https預設桿:443
server.listen(443);