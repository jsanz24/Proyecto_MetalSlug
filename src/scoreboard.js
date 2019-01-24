var ScoreBoard = {
    score:0,
    update: function (ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(Math.floor(this.score), 520, 50);
        ctx.fillText("Score: ", 400, 50);
    }
}