window.onload = function(){

    document.getElementById("btn").onclick = function(){
        game(1)
        document.getElementById("btn").hidden =true;
        document.getElementById("btn2").hidden =true;
    };
    document.getElementById("btn2").onclick = function(){
        game(2)
        document.getElementById("btn").hidden =true;
        document.getElementById("btn2").hidden =true;
    };

    function game(num){
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext('2d');

    var arrPlats = [];
    var arrPlayers = [];
    var arrEnemies = [];
    var originalPos = 500;
    var scoreBoard = ScoreBoard;
    var background = new Background(ctx);
    var oneill = false;
    var gameEnded = false;

    var bso = new Audio("audio/bso.mp3");
    var lose = new Audio("audio/youlose.mp3");
    var firehole = new Audio("audio/firehole.mp3");
    var heavymg = new Audio("audio/heavymg.mp3");
    var boss = new Audio("audio/boss.mp3");
    var cLose = 0;


    createPlayer();
    if(num == 2) createPlayer();
    //createObstacle(300);
    drawAll();
    
    bso.play();

    function drawBG(){
        background.draw();
    }

    function drawPlayer(){
        for(var i = 0; i < arrPlayers.length; i++){
            checkColision(arrPlayers[i]);
            if(arrPlayers[i].posX > 600 && arrPlayers[i].life > 0){
                for(var j = 0; j < arrPlats.length; j++){
                    arrPlats[j].posX -= 2;
                }
                for(var k = 0; k < arrEnemies.length; k++){
                    arrEnemies[k].posX -= 2;
                    arrEnemies[k].walkCount++;
                }
                if(oneill){
                    oneill.posX -= 2;
                    oneill.walkCount++;
                } 
                background.move();
            }
            if(arrPlayers[i].life > 0) arrPlayers[i].draw()
        }
    }
    
    function drawBullet(){
        for(var b = 0; b < arrBullets.length; b++){
            arrBullets[b].draw();
            arrBullets[b].move();
        }
        for(var e = 0; e < arrEnBullets.length; e++){
            arrEnBullets[e].draw();
            arrEnBullets[e].move();
        }
    }

    function drawObstacles(){
        for(var i = 0; i < arrPlats.length; i++){
            arrPlats[i].draw();
        }
    }

    function drawEnemies(){
        for(var i = 0; i < arrEnemies.length; i++){
            arrEnemies[i].draw();
        }
    }

    function drawAll(){
        var IntervalId = setInterval(function(){
            ctx.clearRect(0,0,1000,600)
            drawBG();
            drawPlayer();
            drawObstacles();
            drawEnemies();
            drawBullet();
            if(oneill && !gameEnded) oneill.draw();
            checkEndGame(IntervalId);
            callCreates();
            clearEnemies();
            scoreBoard.update(ctx);
            
        },1000/60);
    }
    
    function callCreates(){
        if(!oneill){
            var c = 0;
            for(var i = 0; i < arrPlayers.length; i++){
                c += arrPlayers[i].distance;
            }
            if( c%75 == 0){
                createEnemy();
            }
            // if(c%330 == 0){
            //     createObstacle();
            //     createEnemy();
            // } 
        }
    }
    
    var intervalShoot = setInterval(function(){
        if(!gameEnded){

            for(var e=0; e < arrEnemies.length; e++){
                if(arrEnemies[e].posX < 940) {
                    arrEnemies[e].shoot();
                }
            }
            if(oneill && oneill.life > 0 && oneill.posX < 850) oneill.shoot();
        }
    },2000);
    //Sonidos de fondo aleatorios
    var intSounds = setInterval(function(){
        var random = Math.floor(Math.random()*2);
        if(random == 1) firehole.play();
        else heavymg.play();
    },15000);

    function createObstacle(posX){
        var platform = new Platform(ctx, posX);
        arrPlats.push(platform);
    }

    function createPlayer(){
        var player = new Player(ctx);
        if(arrPlayers.length == 1) player.playerControles();
        arrPlayers.push(player)
    }
    function createEnemy(){
        var enemy = new Enemy(ctx);
        arrEnemies.push(enemy)
    }
    function createOneill(){
        boss.play();
        oneill = new BigBoss(ctx);
    }

    function checkColision(player){
        if(player.posX < 0) player.posX = 0;
        if(player.posX + player.width > 1000) player.posX = 1000 - player.width;
        for(var o = 0; o < arrPlats.length; o++){

            if(player.posY + player.height >= arrPlats[o].posY && (player.posX + player.width -5 > arrPlats[o].posX) && (player.posX + 5 < arrPlats[o].posX + arrPlats[o].width) && (player.posY + player.height > arrPlats[o].posY)){
                player.posY -= 3;
            } 
            if((player.posX + player.width > arrPlats[o].posX) && (player.posX < arrPlats[o].posX + (arrPlats[o].width/2)) && (player.posY + player.height > arrPlats[o].posY)){
                player.posX -= 5;
            } 
            if((player.posX + player.width > arrPlats[o].posX) && (player.posX < arrPlats[o].posX + arrPlats[o].width) && (player.posY + player.height > arrPlats[o].posY)){
                player.posX += 5;
            }
            if((player.posY < originalPos) && (player.posX + player.width < arrPlats[o].posX || player.posX > arrPlats[o].posX + arrPlats[o].width) && !player.isJumping){
                player.posY += 3;
            }
        }
        if(player.posX + player.width > oneill.posX+50 && player.posX < oneill.posX + oneill.width && player.posY + player.height > oneill.posY && player.posY < player.posY + player.height){
           if(player.life > 0)player.life--; 
        }
    }

    function clearEnemies(){
        for(var b = 0; b < arrBullets.length; b++){ 
            if(arrBullets[b].x > 1000 || arrBullets[b].x < 0) arrBullets.splice(b,1);
            for(var e = 0; e < arrEnemies.length; e++){
                if(arrBullets.length > 0 && arrBullets[b].x < arrEnemies[e].posX + arrEnemies[e].width && arrBullets[b].x > arrEnemies[e].posX && arrBullets[b].y > arrEnemies[e].posY && arrBullets[b].y < arrEnemies[e].posY + arrEnemies[e].height){
                    if(arrEnemies.length > 0) arrEnemies.splice(e,1);
                    if(arrBullets.length > 0) arrBullets.splice(b,1);
                    scoreBoard.score++;
                    if(scoreBoard.score == 75) createOneill();
                }  
            }
        }
        for(var p = 0; p < arrPlayers.length; p++){
            for(var eb = 0; eb < arrEnBullets.length; eb++){
                if(arrPlayers[p].life > 0 && (arrEnBullets[eb].x < arrPlayers[p].posX + arrPlayers[p].width && arrEnBullets[eb].x > arrPlayers[p].posX && arrEnBullets[eb].y > arrPlayers[p].posY && arrEnBullets[eb].y < arrPlayers[p].posY + arrPlayers[p].height)){
                    if(arrEnBullets.length > 0) arrEnBullets.splice(eb,1);
                    arrPlayers[p].life--
                    arrPlayers[p].imgLife.frameIndex--
                }
                if(arrEnBullets.length > 0 && (arrEnBullets[eb].x > 1000 || arrEnBullets[eb].x < 0)) arrEnBullets.splice(eb,1);
            }
        }
        for(var b = 0; b < arrBullets.length; b++){
            if(arrBullets[b].x < oneill.posX + oneill.width && arrBullets[b].x > oneill.posX + 50 && arrBullets[b].y < oneill.posY + oneill.height && arrBullets[b].y > oneill.posY){
                if(arrBullets.length > 0) arrBullets.splice(b,1);
                if(oneill && oneill.life > 0) oneill.life--; 
            } 
        }

    }

    function checkEndGame(intId){
        var total = arrPlayers.reduce(function(ac,player){
            return ac += player.life;
        },0);  
        if(total == 0) endGame(intId);
        if(oneill && oneill.life == 0) endGame(intId);
    }
    function endGame(intId){
        //clearInterval(intId)
        clearInterval(intervalShoot)
        clearInterval(intSounds)
        gameEnded = true;
        bso.pause();
        ctx.clearRect(0,0,1000,600)
        var imgEnd = new Image();
        imgEnd.src = "images/gameOver.png";
        ctx.drawImage(imgEnd, 0, 0, 1000, 600);
        if(cLose <= 1) lose.play();
        cLose++
    }
    
    document.onkeydown = function(e){
        switch(e.keyCode){
            case 38:
                if(!arrPlayers[0].isJumping && arrPlayers[0].life > 0) arrPlayers[0].jump();
                break;
    
            case 39:
                arrPlayers[0].keys.keyRight.status = true
                break;
                
            case 37:
                arrPlayers[0].keys.keyLeft.status = true;
                break;
    
            case 87:
                if(arrPlayers[1] && !arrPlayers[1].isJumping && arrPlayers[1].life > 0) arrPlayers[1].jump()
                break;
            
            case 68:
                arrPlayers[1].keys.keyRight.status = true;
                break;
            
            case 65:
                arrPlayers[1].keys.keyLeft.status = true;
                break;
        }
    }
    document.onkeyup = function(e){
        
        switch(e.keyCode){
            case 39:
                arrPlayers[0].keys.keyRight.status = false;
                break;
            
            case 37:
                arrPlayers[0].keys.keyLeft.status = false;
                break;
            
            case 99:    
                if(arrPlayers[0].life > 0) arrPlayers[0].shoot();
                break;
            
            case 68:
                arrPlayers[1].keys.keyRight.status = false;
                break;
            
            case 65:
                arrPlayers[1].keys.keyLeft.status = false;
                break;
            
            case 71:    
                if(arrPlayers[1].life > 0) arrPlayers[1].shoot();
                break;
        }
    }
    }
}