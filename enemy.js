var arrEnBullets = [];

function Enemy(ctx){
    this.ctx = ctx;
    this.posX = 1200;
    this.posY = 500;
    this.width = 30;
    this.height = 70;
    this.img = new Image();
    this.img.src = "images/Soldado.png";
    this.img.frames = 6;
    this.img.frameIndex = 0;
    this.walkCount = 1;
    this.direction = "Left"
}
Enemy.prototype.draw = function(){
    this.animated();
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        Math.floor(this.img.width / this.img.frames),
        this.img.height, 
        this.posX, 
        this.posY, 
        this.width, 
        this.height);
}
Enemy.prototype.animated = function(){
    if(this.walkCount % 6 == 0){
        this.walkCount = 1;
        this.img.frameIndex += 1;
    } 
    if(this.img.frameIndex > 5) this.img.frameIndex = 0;
}

Enemy.prototype.shoot = function(){
    var bullet = new Bullet(this.ctx);
    bullet.x = this.posX;
    bullet.y = this.posY + 35;
    bullet.direction = this.direction;
    arrEnBullets.push(bullet);
    bullet.draw();
}