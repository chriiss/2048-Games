const element = document.querySelector("canvas");
const ctx = element.getContext('2d');

const playerScoreText = document.querySelector(".player-score");
const gameOver = document.querySelector(".game-over");
const sizeInput = document.querySelector(".size");
const changeSize = document.querySelector(".change-size");
const recordBis = document.querySelector(".player-record");
const newGame = document.querySelector('.btn-new-game');

let playerScore = 0;
let record = 0;
let size = 4;
let width = element.width / size - 7;

let cellArray = [];
let keyPress = true;

let sizes;
let moveRight;
let moveLeft;
let moveUp;
let moveDown;


startGame();

sizeInput.onchange = () => {
    if (sizeInput.value >= 4 && sizeInput.value <= 6) {
        size = sizeInput.value;
        width = element.width / size - 6;
        ctx.clearRect(0, 0, 430, 430);
        playerScore = 0;
        startGame();
    }
}

function cell(row, col) {
    this.value = 0;
    this.x = col * width + 5 * (col + 1);
    this.y = row * width + 5 * (row + 1);
}

function createCell() {
    for (let i = 0; i < size; i++) {
        cellArray[i] = [];
        for (let j = 0; j < size; j++) {
            cellArray[i][j] = new cell(i, j);
        }
    }
}

function createCellBis(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);

    switch (cell.value) {
        case 0:
            ctx.fillStyle = "rgb(66, 66, 64)";
            break;
        case 2:
            ctx.fillStyle = "rgb(246, 215, 100)";
            break;
        case 4:
            ctx.fillStyle = "rgb(149, 246, 100)";
            break;
        case 8:
            ctx.fillStyle = "rgb(100, 229, 246)";
            break;
        case 16:
            ctx.fillStyle = "rgb(140, 100, 246)";
            break;
        case 32:
            ctx.fillStyle = "rgb(215, 171, 11)";
            break;
        case 64:
            ctx.fillStyle = "rgb(215, 11, 11)";
            break;
        case 128:
            ctx.fillStyle = "rgb(43, 145, 251";
            break;
        case 256:
            ctx.fillStyle = "rgb(235, 150, 235)";
            break;
        case 512:
            ctx.fillStyle = "rgb(1, 251, 105";
            break;
        case 1024:
            ctx.fillStyle = "rgb(143, 202, 200)";
            break;
        case 2048:
            ctx.fillStyle = "rgb(225, 224, 0)";
            break;
        case 4096:
            ctx.fillStyle = "rgb(152, 103, 229)";
            break;
    }

    ctx.fill();

    if (cell.value) {
        sizes = width / 2;
        sizeWidth = width / 7;
        ctx.font = sizes + "px 'Roboto', sans-serif";
        ctx.fillStyle = 'rgb(66, 66, 64)';
        ctx.textAlign = "center";
        ctx.fillText(cell.value, cell.x + sizes, cell.y + sizes + sizeWidth);
    }
}

function createAllCell() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            createCellBis(cellArray[i][j]);
        }
    }
}

function startGame() {
    createCell();
    createAllCell();
    addNewCell();
    addNewCell();
    startRecord();
    funcRecord();
}

function createCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays + 1000 * 60 * 60 * 24 * 365));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function funcRecord() {
    if (playerScore > record) {
        record = playerScore;
        createCookie("record", record, 1);
        value = getCookie("record");
        recordBis.innerHTML = "Meilleur score : " + value;
    }
}

function startRecord() {
    let value = getCookie("record");
    record = value;
    recordBis.innerHTML = "Meilleur score : " + value;
}

function addNewCell() {
    let add = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!cellArray[i][j].value) {
                add++;
            } else {
                if (playerScore > record) {
                    funcRecord();
                }
            }
        }
    }
    if (add === 0) return;

    while (true) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        if (!cellArray[row][col].value) {
            cellArray[row][col].value = 2 * Math.ceil(Math.random() * 2);
            createAllCell();
            return true;
        }
    }
}

document.onkeydown = (e) => {
    if (keyPress) {
        if (e.keyCode == 37) onMoveLeft();
        else if (e.keyCode == 38) onMoveUp();
        else if (e.keyCode == 39) onMoveRight();
        else if (e.keyCode == 40) onMoveDown();
        playerScoreText.innerHTML = "Score : " + playerScore;
    }
}

function onMoveRight() {
    moveRight = false;
    for (let i = 0; i < size; i++) {
        for (let j = size - 2; j >= 0; j--) {
            if (cellArray[i][j].value) {
                let col = j;
                while (col + 1 < size) {
                    if (!cellArray[i][col + 1].value) {
                        cellArray[i][col + 1].value = cellArray[i][col].value;
                        cellArray[i][col].value = 0;
                        col++;
                        moveRight = true;
                    } else if (cellArray[i][col].value == cellArray[i][col + 1].value) {
                        cellArray[i][col + 1].value *= 2;
                        playerScore += cellArray[i][col + 1].value;
                        cellArray[i][col].value = 0;
                        col++;
                        moveRight = true;
                        break;
                    } else break;
                }
            }
        }
    }
    if (moveRight === true) addNewCell();
}

function onMoveLeft() {
    moveLeft = false;
    for (let i = 0; i < size; i++) {
        for (let j = 1; j < size; j++) {
            if (cellArray[i][j].value) {
                let col = j;
                while (col - 1 >= 0) {
                    if (!cellArray[i][col - 1].value) {
                        cellArray[i][col - 1].value = cellArray[i][col].value;
                        cellArray[i][col].value = 0;
                        col--;
                        moveLeft = true;
                    } else if (cellArray[i][col].value == cellArray[i][col - 1].value) {
                        cellArray[i][col - 1].value *= 2;
                        playerScore += cellArray[i][col - 1].value;
                        cellArray[i][col].value = 0;
                        moveLeft = true;
                        break;
                    } else break;
                }
            }
        }
    }
    if (moveLeft === true)
        addNewCell();
}

function onMoveUp() {
    moveUp = false;
    for (let j = 0; j < size; j++) {
        for (let i = 1; i < size; i++) {
            if (cellArray[i][j].value) {
                let row = i;
                while (row > 0) {
                    if (!cellArray[row - 1][j].value) {
                        cellArray[row - 1][j].value = cellArray[row][j].value;
                        cellArray[row][j].value = 0;
                        row--;
                        moveUp = true;
                    } else if (cellArray[row][j].value == cellArray[row - 1][j].value) {
                        cellArray[row - 1][j].value *= 2;
                        playerScore += cellArray[row - 1][j].value;
                        cellArray[row][j].value = 0;
                        moveUp = true;
                        break;
                    } else break;
                }
            }
        }
    }
    if (moveUp === true)
        addNewCell();
}

function onMoveDown() {
    moveDown = false;
    for (let j = 0; j < size; j++) {
        for (let i = size - 2; i >= 0; i--) {
            if (cellArray[i][j].value) {
                let row = i;
                while (row + 1 < size) {
                    if (!cellArray[row + 1][j].value) {
                        cellArray[row + 1][j].value = cellArray[row][j].value;
                        cellArray[row][j].value = 0;
                        row++;
                        moveDown = true;
                    } else if (cellArray[row][j].value == cellArray[row + 1][j].value) {
                        cellArray[row + 1][j].value *= 2;
                        playerScore += cellArray[row + 1][j].value;
                        cellArray[row][j].value = 0;
                        moveDown = true;
                        break;
                    } else break;
                }
            }
        }
    }
    if (moveDown === true)
        addNewCell();
}

function arrowDir() {
    document.querySelector(".dir-left").addEventListener("click", () => {
        onMoveLeft();
        playerScoreText.innerHTML = "Score : " + playerScore;
    });
    document.querySelector(".dir-up").addEventListener("click", () => {
        onMoveUp();
        playerScoreText.innerHTML = "Score : " + playerScore;
    });
    document.querySelector(".dir-right").addEventListener("click", () => {
        onMoveRight();
        playerScoreText.innerHTML = "Score : " + playerScore;
    });
    document.querySelector(".dir-down").addEventListener("click", () => {
        onMoveDown();
        playerScoreText.innerHTML = "Score : " + playerScore;
    });
}

arrowDir();

newGame.addEventListener("click", () => {
    playerScore = 0;
    playerScoreText.innerHTML = "Score: " + playerScore;
    startGame();
    if (playerScore > record) funcRecord();
})