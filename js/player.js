class Player {
  constructor(w, h, ctx, keys) {
    this.ctx = ctx;

    this.canvasW = w;
    this.canvasH = h;

    this.keys = keys;

    this.x0 = this.x;
    this.x = this.canvasW * 0.08;

    // Posición original
    this.y0 = this.canvasH * 0.5;

    this.y = this.y0;

    this.img = new Image();
    this.img.src = "assets/img/parrot.png";

    this.img.frames = 9;
    this.img.frameIndex = 0;

    this.w = 143;
    this.h = 175;

    this.bullets = [];

    this.vy = 1;
    this.setListeners();

    this.dy = 0;

    this.nx = 0;
  }

  setListeners() {
    // Vincular las teclas de los controladores de teclado
    document.onkeydown = function (event) {
      if (event.keyCode === this.keys.TOP_KEY) {
        this.dy = -6;
      } else if (event.keyCode === this.keys.DOWN_KEY) {
        this.dy = 6;
      } else if (event.keyCode === this.keys.RIGHT_KEY) {
        this.nx = 6;
      } else if (event.keyCode === this.keys.LEFT_KEY) {
        this.nx = -6;
      } else if (event.keyCode === this.keys.SPACE) {
        this.shoot();
      }
    }.bind(this);

    document.onkeyup = function (event) {
      if (event.keyCode === this.keys.TOP_KEY) {
        this.dy = 0;
      } else if (event.keyCode === this.keys.DOWN_KEY) {
        this.dy = 0;
      } else if (event.keyCode === this.keys.RIGHT_KEY) {
        this.nx = 0;
      } else if (event.keyCode === this.keys.LEFT_KEY) {
        this.nx = 0;
      }
    }.bind(this);
  }

  draw(frameCounter) {
    this.ctx.drawImage(
      // Cambiando imagen del personaje
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animateImg(frameCounter);

    // Clear bullets
    this.bullets = this.bullets.filter((bullet) => bullet.x < this.canvasW);

    this.bullets.forEach((bullet) => {
      bullet.draw();
      bullet.move();
    });
  }

  move() {
    if (
      (this.x + this.w <= this.canvasW && this.x >= 0) ||
      (this.x + this.w >= this.canvasW && this.nx <= 0) ||
      (this.x <= 0 && this.nx > 0)
    ) {
      this.x += this.nx;
    }

    if (
      (this.y + this.h <= this.canvasH && this.y >= -70) ||
      (this.y + this.h >= this.canvasH && this.dy <= 0) ||
      (this.y <= 0 && this.dy > 0)
    ) {
      this.y += this.dy;
    }
  }

  animateImg(frameCounter) {
    if (frameCounter % 9 === 0) {
      this.img.frameIndex++;
    }

    if (this.img.frameIndex > 8) this.img.frameIndex = 0;
  }

  shoot() {
    const bullet = new Bullet(
      this.x + this.w,
      this.y + this.h / 2,
      this.y0,
      this.h,
      this.ctx
    );

    this.bullets.push(bullet);
  }
}
