var arrBullets = [];

function Player(ctx){
    this.ctx= ctx;
    this.posX= 150;
    this.posY= 500;
    this.width= 30;
    this.height= 70;
    this.life= 3;
    this.ki= 0;
    this.pJump= 0;
    this.cJumps= 0;
    this.jumpsMax= 1;
    this.isJumping= false;
    this.fall= false;
    this.distance= 1;
    this.direction = "Right";
    
    this.ataqueNormal= function(){

    },
    this.ataqueTocho= function(){
        this.ki = 0;
    },
    this.cargarKi= function(){
        this.ki++
    }
}
Player.prototype.moveLeft = function(){
    this.posX -=5
    this.direction = "Left"
    this.distance +=1;
};
Player.prototype.moveRight= function(){
    this.posX +=5
    this.direction = "Right"
    this.distance += 1;
};
Player.prototype.jump= function(){
    this.isJumping = true;
    var intervalId = setInterval(() => {
        if(this.pJump < 38 && !this.fall) {
            this.posY -= 3; 
            this.pJump++; 
        }
        else if(this.pJump === 38 && !this.fall) this.fall = true;
        else if(this.pJump > 0 && this.fall) {
            this.pJump--;
            this.posY += 3;
        }
        else{
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
    bullet.y = this.posY + 20;
    bullet.direction = this.direction;
    arrBullets.push(bullet);
    bullet.draw();
}




