var arrBullets = [];

function Player(ctx){
    this.ctx= ctx;
    this.posX= 150;
    this.posY= 500;
    this.width= 40;
    this.height= 70;
    this.life= 3;
    this.pJump= 0;
    this.cJumps= 0;
    this.jumpsMax= 1;
    this.isJumping= false;
    this.fall= false;
    this.distance= 1;
    this.direction = "Right";
    this.vy = 0.5;

    this.img = new Image();
    this.img.src = "images/Marco.png";
    this.img.frames = 8;
    this.img.frameIndex = 0;
    
    this.imgLife = new Image();
    this.imgLife.src = "images/barrasDeVida.png";
    this.imgLife.frames = 3;
    this.imgLife.frameIndex = 2;
    
    this.walkCount = 1;
    this.keys = {
        keyUp:{key:38,status:false},
        keyLeft:{key:37,status:false},
        keyRight:{key:39,status:false},
        keyShoot:{key:99,status:false}
    }
}

Player.prototype.playerControles = function(){
    this.keys = {
        keyUp:{key:87,status:false},
        keyLeft:{key:65,status:false},
        keyRight:{key:68,status:false},
        keyShoot:{key:71,status:false}
    }
    this.img.src = "images/Tarma.png";
    this.img.frames = 9;
}

Player.prototype.animated = function(){
    if(this.walkCount % 6 == 0){
        this.walkCount = 1;
        this.img.frameIndex += 1;
    } 
    if(this.img.frameIndex > this.img.frames-1) this.img.frameIndex = 0;    
}

Player.prototype.drawLife = function(){
    this.ctx.drawImage(
        this.imgLife,
        0,
        this.imgLife.frameIndex * Math.floor(this.imgLife.height / this.imgLife.frames),
        this.imgLife.width, 
        Math.floor(this.imgLife.height / this.imgLife.frames),
        this.posX, 
        this.posY, 
        70, 
        20
    );
}

Player.prototype.draw = function(){
    this.animated();
    this.drawLife();
        //if(this.keys[i].keyUp.status) this.jump();
        if(this.keys.keyLeft.status) this.moveLeft();
        if(this.keys.keyRight.status) this.moveRight();
        //if(this.keys[i].keyShoot.status) this.shoot();
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        Math.floor(this.img.width / this.img.frames),
        this.img.height, 
        this.posX, 
        this.posY, 
        this.width, 
        this.height
    );
}

Player.prototype.moveLeft = function(){
    this.walkCount++;
    this.posX -=5;
    this.direction = "Left";
    this.distance +=1;
};

Player.prototype.moveRight= function(){
    this.walkCount++;
    this.posX +=5;
    this.direction = "Right";
    this.distance += 1;
};

Player.prototype.jump= function(){
    this.isJumping = true;
    var gravity = 0.2;
    var intervalId = setInterval(() => {
        if(this.pJump < 38 && !this.fall) {
            this.posY -= 3; 
            this.pJump++; 
        }
        else if(this.pJump === 38 && !this.fall) this.fall = true;
        else if(this.posY <= 500 && this.fall){
            this.vy += gravity;
            this.posY += 3 + this.vy;
        }
        else{
            this.pJump = 0;
            this.vy = 0.5;
            this.cJumps = 0;
            this.fall = false;
            this.isJumping = false;
            clearInterval(intervalId)
        }
    },1000/60);
};

Player.prototype.shoot = function(){
    var bullet = new Bullet(this.ctx);
    if(this.direction === "Right") bullet.x = this.posX + this.width;
    else bullet.x = this.posX;
    bullet.y = this.posY + 35;
    bullet.direction = this.direction;
    arrBullets.push(bullet);
    bullet.draw();
}