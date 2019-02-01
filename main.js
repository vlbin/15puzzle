var game = document.getElementById("game");
var rectangles = document.getElementsByClassName("rectangle");
var shuffleButton = document.getElementById("shufflebutton");
var win = document.getElementById("win");
var newGame = document.getElementById("newgame");
var w = game.clientWidth;
var h = game.clientHeight;
var size = 2;
var blankPos;
var clickedTile;
var tiles;
var id;
var x;
var y;
var newX;
var newY;
var rect;
var shuffleX;
var shuffleY;
var cpuMove;
var isSolved = false;
setup();
/**
 * Skapar de element som krävs för pusslet, och känner av ifall
 * det redan finns några brickor, d.v.s. att användaren redan
 * har spelat en eller flera gånger.
 */
function setup() {
    if (rect) {
        $('.rectangle').remove();
    }
    isSolved = false;
    shuffleButton.disabled = false;
    win.style.visibility = "hidden";
    win.style.opacity = "0";
    var i = 1;
    for (var row = 0; row < size; row++) {
        for (var col = 0; col < size; col++) {
            if (!(col === size - 1 && row === size - 1)) {
                rect = document.createElement("div");
                rect.setAttribute("class", "rectangle");
                rect.style.width = w / size + "px";
                rect.style.height = h / size + "px";
                rect.style.position = "absolute";
                rect.style.left = col * (w / size) + "px";
                rect.style.top = row * (h / size) + "px";
                rect.innerHTML = i;
                i++;
                game.appendChild(rect);
            }
        }
    }
    startGame();
}
/**
 * Blandar brickorna genom att "datorn" gör ett bestämt antal
 * drag. Om man istället slumpar brickornas platser kan spelet
 * bli olösbart vilket går att läsa mer om via länken.
 * 
 * @tutorial https://math.stackexchange.com/questions/754827/does-a-15-puzzle-always-have-a-solution
 * @param tiles Array av objekt med id, x- och y-koordinater för varje bricka
 */
function shuffleTiles(tiles) {
    cpuMove = true;
    var counter = 0;
    setTimeout(function () {
        while (counter < size * 300) {
            cpuClick = Math.floor(Math.random() * rectangles.length);
            moveTile(cpuMove, tiles, cpuClick, Math.round(tiles[cpuClick].x), Math.round(tiles[cpuClick].y));
            counter++;
        }
    }, 1);
}
/**
 * Deklarerar array av objekt, där varje objekt är en bricka med
 * ett id, x-koordinat och y-koordinat. Deklarerar även ett objekt
 * blankPos som förvarar den tomma positionens koordinater.
 * 
 * Ger varje bricka ett onclick-event, här kan man
 * också använda lyssnare istället.
 */
function startGame() {
    tiles = new Array();
    for (var i = 0; i < rectangles.length; i++) {
        id = rectangles[i].innerHTML - 1;
        var xToRound = parseInt(rectangles[i].style.left) / (w / size);
        var yToRound = parseInt(rectangles[i].style.top) / (h / size);
        x = Math.round(xToRound);
        y = Math.round(yToRound);
        tiles[i] = {
            id: id,
            x: x,
            y: y
        }
        blankPos = {
            x: size - 1,
            y: size - 1
        }
    }
    shuffleTiles(tiles);

    for (var i = 0; i < rectangles.length; i++) {
        rectangles[i].onclick = function () {
            if (!isSolved)
                tileClick(this);
        }
    }
}
/**
 * Om användaren klickar på shuffleknappen kallas metoden
 * shuffleTiles på.
 */
shuffleButton.onclick = function () {
    shuffleTiles(tiles);
}
/**
 * Denna knapp syns om pusslet/spelet har klarats och kallar
 * då på setup-funktionen för att starta om spelet.
 */
newGame.onclick = function () {
    setup();
}
/**
 * Kallas på för att kontrollera om pusslet är klarat. Ser först
 * om den blanka platsen är i nedre högra hörnet.
 * Använder nästlade for-loopar för att jämföra varje brickas
 * id med dess x- och y-koordinater
 * 
 * @return {boolean} isSolved true om pusslet är löst, annars false.
 */
function gameSolved() {
    var correct = 0;
    if (blankPos.x === size - 1 && blankPos.y === size - 1) {
        //kolla y för y om x är större än x+1
        for (var i = 0; i < tiles.length; i = i + size) {
            for (var j = 0; j < size; j++) {
                if (i + j < tiles.length) {
                    console.log(tiles[j + i].id, Math.round(tiles[j + i].x + i), Math.round(tiles[j + i].y), Math.round((tiles[j + i].x + i) / size));
                    if (parseInt(tiles[j + i].id) === Math.round(tiles[j + i].x + i) && Math.round(tiles[j + i].y) === parseInt((tiles[j + i].x + i) / size)) {
                        correct++;
                    }
                }
            }
        }
        if (correct === tiles.length) {
            isSolved = true;
            return isSolved;
        } else {
            return isSolved;
        }
    } else {
        return isSolved;
    }
}
/**
 * Kallas vid klick på någon bricka.
 * 
 * @param clicked ger vilken bricka som klickats på
 */
function tileClick(clicked) {
    clickedTile = parseInt(clicked.innerHTML - 1);
    //console.log(clickedTile);
    cpuMove = false;
    moveTile(cpuMove, tiles, clickedTile, Math.round(tiles[clickedTile].x), Math.round(tiles[clickedTile].y));
}
/**
 * 
 * 
 * @param cpuMove om "datorn" eller användaren gjort draget.
 * @param tiles array av objekt, innehåller id, x- och y-koordinat.
 * @param clickedTile vilken bricka som klickats på
 * @param x klickade brickans x-koordinat
 * @param y klickade brickans y-koordinat
 */
function moveTile(cpuMove, tiles, clickedTile, x, y) {
    if (getCellsAround(tiles, clickedTile, x, y, "up") || getCellsAround(tiles, clickedTile, x, y, "down") || getCellsAround(tiles, clickedTile, x, y, "left") || getCellsAround(tiles, clickedTile, x, y, "right")) {
        console.log("Tile moved");
    }
    else {
        console.log("Tile not moved");
    }
    if (!cpuMove) {
        if (gameSolved()) {
            if(win.style.visibility === "hidden") {
                setTimeout(function () {
                    shuffleButton.disabled = true;
                    win.style.visibility = "visible";
                    win.style.opacity = "1";
                }, 500);
            }
            
        }
    }
}
/**
 * Funktion som tar emot olika riktningar och testar dessa.
 * Jämför den klickade brickan med den blanka rutans koordinater.
 * 
 * @param tiles array av objekt, innehåller id, x- och y-koordinat.
 * @param clickedTile vilken bricka som klickats på
 * @param x klickade brickans x-koordinat
 * @param y klickade brickans y-koordinat
 * @param dir ger riktningen som testas när funktionen körs.
 * 
 * @return {boolean} true om brickan är flyttbar, annars false. 
 */
function getCellsAround(tiles, clickedTile, x, y, dir) {
    if (dir === "up") {
        newX = x;
        newY = y - 1;
    }
    else if (dir === "down") {
        newX = x;
        newY = y + 1;
    }
    else if (dir === "left") {
        newX = x - 1;
        newY = y;
    }
    else {
        newX = x + 1;
        newY = y;
    }
    if (newX >= 0 && newY >= 0 && newX < size && newY < size) {
        if (newX === blankPos.x && newY === blankPos.y) {
            rectangles[clickedTile].style.left = newX * (w / size) + "px";
            rectangles[clickedTile].style.top = newY * (h / size) + "px";
            newX = 0;
            newY = 0;
            tiles[clickedTile].x = parseInt(rectangles[clickedTile].style.left) / (w / size);
            tiles[clickedTile].y = parseInt(rectangles[clickedTile].style.top) / (h / size);
            blankPos.x = x;
            blankPos.y = y;
            return true;
        }
    }
    return false;
}