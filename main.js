window.onload = function(){
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext('2d');

    var arrPlats = [];
    var arrPlayers = [];
    var arrEnemies = [];
    var originalPos = 500;
    var scoreBoard = ScoreBoard;
    var background = new Background(ctx);

    createPlayer();
    createPlayer();
    createObstacle(300);
    drawAll();
    
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
        IntervalId = setInterval(function(){
            ctx.clearRect(0,0,1000,600)
            drawBG();
            drawPlayer();
            drawObstacles();
            drawEnemies();
            drawBullet();
            callCreates()
            clearEnemies();
            scoreBoard.update(ctx);
            
        },1000/60);
    }
    
    function callCreates(){
        var c = 0;
        for(var i = 0; i < arrPlayers.length; i++){
            c += arrPlayers[i].distance;
        }
        if( c%75 == 0){
            createEnemy();
        }
        if(c%330 == 0){
            createObstacle();
            createEnemy();
        } 
    }
    
    setInterval(function(){
        for(var e=0; e < arrEnemies.length; e++){
            if(arrEnemies[e].posX < 940) {
                arrEnemies[e].shoot();
            }
        }
    },2000);

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

    function checkColision(player1){
        if(player1.posX < 0) player1.posX = 0;
        if(player1.posX + player1.width > 1000) player1.posX = 1000 - player1.width;
        for(var o = 0; o < arrPlats.length; o++){

            if(player1.posY + player1.height >= arrPlats[o].posY && (player1.posX + player1.width -5 > arrPlats[o].posX) && (player1.posX + 5 < arrPlats[o].posX + arrPlats[o].width) && (player1.posY + player1.height > arrPlats[o].posY)){
                player1.posY -= 3;
            } 
            if((player1.posX + player1.width > arrPlats[o].posX) && (player1.posX < arrPlats[o].posX + (arrPlats[o].width/2)) && (player1.posY + player1.height > arrPlats[o].posY)){
                player1.posX -= 5;
            } 
            if((player1.posX + player1.width > arrPlats[o].posX) && (player1.posX < arrPlats[o].posX + arrPlats[o].width) && (player1.posY + player1.height > arrPlats[o].posY)){
                player1.posX += 5;
            }
            if((player1.posY < originalPos) && (player1.posX + player1.width < arrPlats[o].posX || player1.posX > arrPlats[o].posX + arrPlats[o].width) && !player1.isJumping){
                player1.posY += 3;
            }
        }
    }

    function clearEnemies(){
        for(var b = 0; b < arrBullets.length; b++){
            for(var e = 0; e < arrEnemies.length; e++){
                if(arrBullets[b].x < arrEnemies[e].posX + arrEnemies[e].width && arrBullets[b].x > arrEnemies[e].posX && arrBullets[b].y > arrEnemies[e].posY && arrBullets[b].y < arrEnemies[e].posY + arrEnemies[e].height){
                    arrEnemies.splice(e,1);
                    arrBullets.splice(b,1);
                    scoreBoard.score++;
                }  
            }
        }
        for(var p = 0; p < arrPlayers.length; p++){
            for(var eb = 0; eb < arrEnBullets.length; eb++){
                if(arrPlayers[p].life > 0 && (arrEnBullets[eb].x < arrPlayers[p].posX + arrPlayers[p].width && arrEnBullets[eb].x > arrPlayers[p].posX && arrEnBullets[eb].y > arrPlayers[p].posY && arrEnBullets[eb].y < arrPlayers[p].posY + arrPlayers[p].height)){
                    arrEnBullets.splice(eb,1);
                    arrPlayers[p].life--
                    arrPlayers[p].imgLife.frameIndex--
                }  
            }
        }
    }
    
    document.onkeydown = function(e){
        switch(e.keyCode){
            case 38:
                if(!arrPlayers[0].isJumping) arrPlayers[0].jump();
                break;
    
            case 39:
                arrPlayers[0].keys.keyRight.status = true
                break;
                
            case 37:
                arrPlayers[0].keys.keyLeft.status = true;
                break;
    
            case 87:
                if(arrPlayers[1] && !arrPlayers[1].isJumping) arrPlayers[1].jump()
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
                arrPlayers[0].shoot();
                break;
            
            case 68:
                arrPlayers[1].keys.keyRight.status = false;
                break;
            
            case 65:
                arrPlayers[1].keys.keyLeft.status = false;
                break;
            
            case 71:    
                arrPlayers[1].shoot();
                break;
        }
    }
}