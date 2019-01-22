function Platform(ctx){
    this.ctx = ctx;
    this.posX = 300;
    this.posY = 520;
    this.width = 100;
    this.height = 70;
    this.img = new Image();
    this.img.src = "images/caja.png";
}
Platform.prototype.draw = function(){
    this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
}   