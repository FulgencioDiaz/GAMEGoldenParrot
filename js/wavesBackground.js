//Fondo Olas
class WavesBackground {
  constructor(w, h, ctx) {
    this.ctx = ctx;
    this.w = innerWidth;
    this.h = innerHeight;

    this.img = new Image();
    this.img.src = "assets/img/wavesBG.png";

    this.x = 0;
    this.y = 120;

    // desplazamiento
    this.dx = 15.5;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}
