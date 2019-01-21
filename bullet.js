function Bullet(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 50;
    this.direction = "";
    this.r = 5;

}

Bullet.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
}

Bullet.prototype.move = function() {
    if(this.direction === "Right") this.x += 7;
    else this.x -= 7;
};