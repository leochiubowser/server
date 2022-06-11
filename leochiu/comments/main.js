//讀取Json file 

var body = document.querySelector("span")
var currentResultLength;
var isFirst = true

fetchComments();

function fetchComments() {
    fetch("../comments/data/comments.json")
        .then(data => data.json())
        .then(result => {
            Getresult(result)
            var res1 = setInterval(() => {
                fetchcurrentComments();
                if (result.length != currentResultLength) {
                    if (isFirst == true) {
                        isFirst = false
                    }
                    else {
                        clearInterval(res1)
                        update()
                    }
                }
            }, 100)
        })
}

function fetchcurrentComments() {
    fetch("../comments/data/comments.json")
        .then(data => data.json())
        .then(result => {
            currentResultLength = result.length
        })
}

//將資料傳到函式中處理


function Getresult(data) {

    var i = data.length - 1;

    while (i > 0 || i == 0) {
        var index = data[i];
        //創建Element 
        var author = document.createElement("h2");
        var time = document.createElement("p");
        var content = document.createElement("p");
        //定位
        time.id = "time"
        author.id = "author"
        //從Json file 賦值
        author.textContent = index.user_name;
        time.textContent = getTime(index.time);
        content.textContent = index.content;

        var div = document.createElement("div");
        div.appendChild(author);
        div.appendChild(time);
        div.appendChild(content);
        div.id = "divs"
        body.appendChild(div)
        //是否增加底線
        if (i != 0) {
            div.style.borderBottom = "2px solid gray";
        }
        i -= 1
    }
}


//更新留言

function update() {
    var elements = document.querySelectorAll("div")
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    fetchComments();
}



//處理時間

var date1 = new Date()
var year
var month
var date
var day
var hour
var minute
var second

function upDateTime() {
    year = date1.getFullYear()
    month = date1.getMonth() + 1
    date = date1.getDate()
    hour = date1.getHours()
    minute = date1.getMinutes()
    second = date1.getSeconds()
}


function getTime(index) {
    upDateTime();

    if (year == index.year && month == index.month && date == index.date && hour == index.hour && minute == index.minute && second == index.second) {
        return "現在";
    }
    else {
        var date_01 = new Date();
        var date_02 = new Date(index.year + "/" + index.month + "/" + index.date);
        date_02.setHours(index.hour, index.minute, index.second);
        var result = date_01 - date_02

        if (result / 1000 < 60) {
            return `${Math.round(result / 1000)}秒前`
        }
        else if (result / 1000 / 60 < 60) {
            return `${Math.round(result / 1000 / 60)}分鐘前`
        }
        else if (result / 1000 / 60 / 60 < 24) {
            return `${Math.round(result / 1000 / 60 / 60)}小時前`
        }
        else if (result / 1000 / 60 / 60 / 24 < 30) {
            return `${Math.round(result / 1000 / 60 / 60 / 24)}天前`
        }
        else if (result / 1000 / 60 / 60 / 24 / 30 < 12) {
            return `${Math.round(result / 1000 / 60 / 60 / 24 / 30)}個月前`
        }
        else {
            return `${Math.round(result / 1000 / 60 / 60 / 24 / 30 / 12)}年前`
        }
    }

}



//防呆機制 (內容不可以為空的)

var content = document.getElementById("content")
var submit = document.getElementById("submit")

submit.addEventListener("click", () => {
    if (content.value == "") {
        alert("請輸入內容!")
    }
})
