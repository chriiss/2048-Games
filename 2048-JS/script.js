window.onload = function(){

    var element = document.querySelector("canvas");
    var ctx = element.getContext('2d');

    var playerScoreAffich = document.getElementById("playerScore");
    var gameOver = document.getElementById("gameOver");
    var sizeInput = document.getElementById("size");
    var changeSize = document.getElementById("change-size");

    var playerScore = 0;
    var record = 0;
    var recordBis = document.getElementById("record");
    var taille = 4;
    var width = element.width / taille -7;

    var cellules = [];
    var tailles;
    var keyPress = true;

    var moveRight;
    var moveLeft;
    var moveUp;
    var moveDown;


    startDuGame();

    size.onchange = function() {
        if(sizeInput.value >= 4 && sizeInput.value <= 6) {
            taille = sizeInput.value;
            width = element.width / taille - 6;
            ctx.clearRect(0, 0, 430, 430);
            playerScore = 0;
            startDuGame();
        }
    }
    function cell(row, col) {
        this.value = 0;
        this.x = col * width + 5 * (col + 1);
        this.y = row * width + 5 * (row + 1);
    }

    function createCellules() {
        for (var i = 0; i < taille; i++) {
            cellules[i] = [];
            for (var j = 0; j < taille; j++) {
                cellules[i][j] = new cell(i, j);
            }
        }
    }

    function createCelluleBis(cell) {
        ctx.beginPath();
        ctx.rect(cell.x, cell.y, width, width);

        switch (cell.value){
            case 0 : ctx.fillStyle = "rgb(66, 66, 64)"; break;
            case 2 : ctx.fillStyle = "rgb(246, 215, 100)"; break;
            case 4 : ctx.fillStyle = "rgb(149, 246, 100)"; break;
            case 8 : ctx.fillStyle = "rgb(100, 229, 246)"; break;
            case 16 : ctx.fillStyle = "rgb(140, 100, 246)"; break;
            case 32 : ctx.fillStyle = "rgb(215, 171, 11)"; break;
            case 64 : ctx.fillStyle = "rgb(215, 11, 11)"; break;
            case 128 : ctx.fillStyle = "rgb(43, 145, 251"; break;
            case 256 : ctx.fillStyle = "rgb(235, 150, 235)"; break;
            case 512 : ctx.fillStyle = "rgb(1, 251, 105"; break;
            case 1024 : ctx.fillStyle = "rgb(143, 202, 200)"; break;
            case 2048 : ctx.fillStyle = "rgb(225, 224, 0)"; break;
            case 4096 : ctx.fillStyle = "rgb(152, 103, 229)"; break;
        }

        ctx.fill();

        if(cell.value) {
            tailles = width /2;
            tailleWidth = width/7;
            ctx.font = tailles + "px 'Roboto', sans-serif";
            ctx.fillStyle = 'rgb(66, 66, 64)';
            ctx.textAlign = "center";
            ctx.fillText(cell.value, cell.x + tailles, cell.y + tailles + tailleWidth);
        }
    }
    
    function startDuGame() {  
      createCellules();
      createAllCellules();
      ajoutNewCellule();
      ajoutNewCellule();
      funcStartRecord();
      funcRecord();
    }
    function createAllCellules() {
        for (var i = 0; i < taille; i++) {
            for (var j = 0; j < taille; j++) {
                createCelluleBis(cellules[i][j]);
            }
        }
    }
    function createCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays+1000*60*60*24*365));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } 

    function funcRecord(){
        if(playerScore > record)
        {
            console.log(document.cookie);
            record = playerScore;
            console.log(record);
            createCookie("record", record, 1);
            value = getCookie("record");
             console.log(value);
            console.log(getCookie("record"));
            recordBis.innerHTML = "Meilleur score : " + value;   
        }
    }
    function funcStartRecord()
    {
        var value = getCookie("record");
        record = value;
        recordBis.innerHTML = "Meilleur score : " + value;   
    }

    function ajoutNewCellule() {
      var varAjout = 0;
        for (var i = 0; i < taille; i++) {
            for (var j = 0; j < taille; j++) {
                if (!cellules[i][j].value) {
                    varAjout++;
                }
                else{
                    if(playerScore > record){
                        funcRecord();
                    }
                }
            }
        }
        if(varAjout === 0){
            return;   
        }
        while(true){
            var row = Math.floor(Math.random() * taille);
            var col = Math.floor(Math.random() * taille);
            if(!cellules[row][col].value) {
                cellules[row][col].value = 2 * Math.ceil(Math.random() * 2);
                createAllCellules();
                return true;
            }
        }
    }

    document.onkeydown = function(e) {
        if(keyPress){
            if (e.keyCode == 37) onMoveLeft();
            else if (e.keyCode == 38) onMoveUp();
            else if (e.keyCode == 39) onMoveRight();
            else if (e.keyCode == 40) onMoveDown();
            playerScoreAffich.innerHTML = "Score : " + playerScore;
        }
    }

    function onMoveRight() {
        moveRight = false;
        for (var i = 0; i < taille; i++) {
            for (var j = taille - 2; j >= 0; j--) {
                if (cellules[i][j].value) {
                    var col = j;
                    while (col + 1 < taille) {
                        if (!cellules[i][col + 1].value) {
                            cellules[i][col + 1].value = cellules[i][col].value;
                            cellules[i][col].value = 0;
                            col++;
                            moveRight = true;
                        }
                        else if (cellules[i][col].value == cellules[i][col + 1].value) {
                            cellules[i][col + 1].value *= 2;
                            playerScore +=  cellules[i][col + 1].value;
                            cellules[i][col].value = 0;
                            col++;
                            moveRight = true;
                            break;
                        }
                        else break;
                    }
                }
            }
        }
        if(moveRight === true)
        ajoutNewCellule();        
    }

    function onMoveLeft() {
        moveLeft = false;
        for (var i = 0; i < taille; i++) {
            for (var j = 1; j < taille; j++) {
              if (cellules[i][j].value) {
                    var col = j;
                    while (col - 1 >= 0) {
                        if (!cellules[i][col - 1].value) {
                            cellules[i][col - 1].value = cellules[i][col].value;
                            cellules[i][col].value = 0;
                            col--;
                            moveLeft = true;
                        }
                        else if (cellules[i][col].value == cellules[i][col - 1].value) {
                            cellules[i][col - 1].value *= 2;
                            playerScore +=   cellules[i][col - 1].value;
                            cellules[i][col].value = 0;
                            moveLeft = true;
                            break;
                        }
                        else break;
                    }
                }
            }
        }
        if(moveLeft === true)
        ajoutNewCellule();
    }

    function onMoveUp() {
        moveUp = false;
        for (var j = 0; j < taille; j++) {
            for (var i = 1; i < taille; i++) {
                if (cellules[i][j].value) {
                    var row = i;
                    while (row > 0) {
                        if (!cellules[row - 1][j].value) {
                            cellules[row - 1][j].value = cellules[row][j].value;
                            cellules[row][j].value = 0;
                            row--;
                            moveUp = true;
                        }   
                        else if (cellules[row][j].value == cellules[row - 1][j].value) {
                            cellules[row - 1][j].value *= 2;
                            playerScore +=  cellules[row - 1][j].value;
                            cellules[row][j].value = 0;
                            moveUp = true;
                            break;
                        }
                        else break;
                    }
                }
            }
        }
        if(moveUp === true)
        ajoutNewCellule();
    }

    function onMoveDown() {
        moveDown = false;
        for (var j = 0; j < taille; j++) {
            for (var i = taille - 2; i >= 0; i--) {
                if (cellules[i][j].value) {
                    var row = i;
                    while (row + 1 < taille) {
                        if (!cellules[row + 1][j].value) {
                            cellules[row + 1][j].value = cellules[row][j].value;
                            cellules[row][j].value = 0;
                            row++;
                            moveDown = true;
                        }
                        else if (cellules[row][j].value == cellules[row + 1][j].value) {
                            cellules[row + 1][j].value *= 2;
                            playerScore +=  cellules[row + 1][j].value;
                            cellules[row][j].value = 0;
                            moveDown = true;
                            break;
                        }
                        else break;
                    }
                }
            }
        }
        if(moveDown === true)
        ajoutNewCellule();
    }
    $(function(){
        $("#button").click(function(){
            playerScore = 0;
            $('#playerScore').text("Score : " + playerScore);
            startDuGame();
            if(playerScore > record){
               funcRecord(); 
            }     
        }); 
        $("canvas").hide();
        $("canvas").fadeIn(6000);
        
        $("#left").click(function(){
            onMoveLeft();
            playerScoreAffich.innerHTML = "Score : " + playerScore;
        });
        $("#up").click(function(){
            onMoveUp();
            playerScoreAffich.innerHTML = "Score : " + playerScore;
        });
        $("#right").click(function(){
            onMoveRight();
            playerScoreAffich.innerHTML = "Score : " + playerScore;
        });
         $("#down").click(function(){
            onMoveDown();
            playerScoreAffich.innerHTML = "Score : " + playerScore;
        });

        $("#left").hide();
        $("#left").fadeIn(6000);
        $("#right").hide();
        $("#right").fadeIn(6000);
        $("#up").hide();
        $("#up").fadeIn(6000);
        $("#down").hide();
        $("#down").fadeIn(6000);
    });
}