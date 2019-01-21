window.onload = function(){
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext('2d');

    var arrPlats = [];
    var arrPlayers = [];
    var arrEnemies = [];
    var originalPos = 500;
    var background = new Background(ctx);

    createPlayer();
    createObstacle();
    drawAll();
    
    function drawBG(){
        background.draw();
    }

    function drawPlayer(){
        for(var i = 0; i < arrPlayers.length; i++){
            var goku = new Image();
            goku.src = "images/goku.png";
            checkColision(arrPlayers[i]);
            if(arrPlayers[i].posX > 600){
                for(var j = 0; j < arrPlats.length; j++){
                    arrPlats[j].posX -= 2;
                }
                for(var k = 0; k < arrEnemies.length; k++){
                    arrEnemies[k].posX -= 2;
                }
                background.move();
            } 
            if(keyState.keyLeft) arrPlayers[i].moveLeft();
            if(keyState.keyRight) arrPlayers[i].moveRight();
            ctx.drawImage(goku, arrPlayers[i].posX, arrPlayers[i].posY, arrPlayers[i].width, arrPlayers[i].height);
        }
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
                }  
            }
        }
    }

    function drawBullet(){
        for(var b = 0; b < arrBullets.length; b++){
            arrBullets[b].draw();
            arrBullets[b].move();
        }
    }

    function drawObstacles(){
        var obstacleImg = new Image();
        obstacleImg.src = "images/caja.png";
        for(var i = 0; i < arrPlats.length; i++){
            ctx.drawImage(obstacleImg, arrPlats[i].posX, arrPlats[i].posY, arrPlats[i].width, arrPlats[i].height);
        }
    }

    function drawEnemies(){
        var enemyImg = new Image();
        enemyImg.src = "images/goku.png";
        for(var i = 0; i < arrEnemies.length; i++){
            ctx.drawImage(enemyImg, arrEnemies[i].posX, arrEnemies[i].posY, arrEnemies[i].width, arrEnemies[i].height);
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
            clearEnemies();
            
        },1000/60);
    }
    
    setInterval(function(){
        var c = 0;
        for(var i = 0; i < arrPlayers.length; i++){
            c += arrPlayers[i].distance;
        }
        if( c%75 == 0){
            //createObstacle();
            createEnemy();

        }
    },1000/60);



    function createObstacle(){
        var platform = new Platform();
        arrPlats.push(platform);
    }
    function createPlayer(){
        var player = new Player(ctx);
        arrPlayers.push(player)
    }
    function createEnemy(){
        var enemy = new Enemy();
        arrEnemies.push(enemy)
    }

    
    
    
    document.onkeypress = function(e){
        switch(e.keyCode){
            case 38:
                if(!arrPlayers[0].isJumping) arrPlayers[0].jump();
                break;

            case 39:
                keyState.keyRight = true;
                break;
                
            case 37:
                keyState.keyLeft = true;
                break;
                // case 65:
                //     player2.moveLeft();
                //     break;
                // case 87:
                //     if(!player2.isJumping) player2.jump();
                //     break;
                // case 68:
                //     player2.moveRight();
                //     break;
        }
    }
    document.onkeyup = function(e){
        
        switch(e.keyCode){
            case 39:
            keyState.keyRight = false;
            break;
            
            case 37:
                keyState.keyLeft = false;
                break;
            
            case 32:    
                arrPlayers[0].shoot();
                break;
        }
    }
}