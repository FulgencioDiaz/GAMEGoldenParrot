class Obstacle {
    constructor(w, playerY, playerH, ctx) {
        this.ctx = ctx;
        this.w = 15;
        this.h = this.w * 3

        this.dx = 10;

        this.x = w;
        this.y = playerY + playerH - this.h - 5;
        
        console.log(playerY);
        console.log(this.y);

    }

    draw() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move() {
        this.x -= this.dx;
    }
}