function Background(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = 'images/fondo.png';

    this.x = 0;
    this.y = 0;
    this.dx = 2;
}

Background.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x, this.y, 1600, 700);
    this.ctx.drawImage(this.img, this.x + 1600, this.y, 1600, 700);
};

Background.prototype.move = function() {
    this.x -= this.dx;

    if (this.x < -1600) this.x = 0;
};