function BigBoss(ctx){
    this.ctx= ctx;
    this.posX = 1000;
    this.posY = 460;
    this.width = 120;
    this.height = 110;
    this.life = 50;
    this.img = new Image();
    this.img.src = "images/Oneill.png";
    this.img.frames = 10;
    this.img.frameIndex = 9;
    this.walkCount = 1;
    this.direction = "Left";
    this.oneillShout = new Audio("audio/siuu.mp3");
}
BigBoss.prototype.shoot = function(){
    var bullet = new Bullet(this.ctx,10);
    bullet.x = this.posX;
    bullet.y = this.posY + 55;
    bullet.direction = "Left";
    arrEnBullets.push(bullet);
    this.oneillShout.play();
    bullet.draw();
}
BigBoss.prototype.draw = function(){
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
BigBoss.prototype.animated = function(){
    if(this.walkCount % 6 == 0){
        this.walkCount = 1;
        this.img.frameIndex -= 1;
    } 
    if(this.img.frameIndex < 0) this.img.frameIndex = 9;
}