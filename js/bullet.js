class Bullet {
  constructor(x, y, y0, h, ctx) {
    this.x = x;
    this.y = y;
    this.y0 = y0;

    this.playerH = h;

    this.ctx = ctx;

    this.r = 5;

    this.vx = 10;
    this.vy = 1;

    this.gravity = 0.25;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "orange";
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    // Avance pelota
    this.x += this.vx;

    /* // Caida pelota 
        this.vy += this.gravity;
        this.y += this.vy; */

    /*    // Rebote
        if(this.y > this.y0 + this.playerH) {
            this.vy *= -1;
        } */
  }
}
