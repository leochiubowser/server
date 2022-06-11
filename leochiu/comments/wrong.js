alert("帳號或密碼錯誤!")

//手機視窗select偵測

var section3 = document.getElementById("section3");
var section4 = document.getElementById("section4");
var show = false;

function open() {
    $("#section").animate({
        width: "65%"
    }, 500);
    $("#section2").animate({
        width: "65%"
    }, 500);
    $("#body").animate({
        backgroundColor: "rgb(80, 80,80)"
    }, 800);
    $("#body1").animate({
        filter: "brightness(110%)",
        opacity: "0.1",
        backgroundColor: "rgb(80,80,80)"
    }, 800);
    section3.style.display = "block";
    section4.style.display = "block";
    show = true;
}

function close() {
    $("#section").animate({
        width: "0%"
    }, 300);
    $("#section2").animate({
        width: "0%"
    }, 300);
    $("#body").animate({
        backgroundColor: "white"
    }, 500);
    $("#body1").animate({
        filter: "brightness(100%)",
        opacity: "1",
        backgroundColor: "white"
    }, 500);
    section3.style.display = "none";
    section4.style.display = "none";
    show = false;
}

$("#select").click(function () {
    if (show) {
        close();
    }
    else {
        open();
    }
});
$("#section3").click(function () {
    if (show) {
        close();
    }
});
$("#section4").click(function () {
    if (show) {
        close();
    }
});

