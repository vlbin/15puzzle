// Initial vars
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var w;
var h;

var size = 4;

$(document).ready(function () {
    //Setting window size depending on viewport
    if (window.innerWidth > window.innerHeight) {
        canvas.height = 0.8 * (window.innerHeight);
        canvas.width = 0.8 * (window.innerHeight);
        w = canvas.width;
        h = canvas.height;
    } else {
        canvas.height = 0.8 * (window.innerWidth);
        canvas.width = 0.8 * (window.innerWidth);
        w = canvas.width;
        h = canvas.height;
    }
    gameSetup(w, h);

});

function gameSetup(w, h) {
    for(var i =0; i<size;i++) {
        ctx.moveTo(0, 0);
        ctx.fillRect(0,0,);
        ctx.stroke();
    }
}






/*
$(window).resize(function() {
    if(window.innerWidth>window.innerHeight) {
        canvas.style.height = "72vh";
        canvas.style.width = "72vh";
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;
    }else {
        canvas.style.height = "72vw";
        canvas.style.width = "72vw";
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;
    }
});
*/