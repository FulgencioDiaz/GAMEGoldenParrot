class Enemy {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
     
        this.x0 = this.x
        this.x = this.canvasW
       

        this.y = Math.floor(Math.random() * 450)
       

        

        this.img = new Image();
        this.img.src = "/Users/funche/Desktop/Bootcamp/juego/supermario/img/kisspng-bird-flight-bird-flight-bald-eagle-sprite-chameleon-5abc0b51f08c16.9537283715222731059853.png"
        
        this.img.frames = 4;
        this.img.frameIndex = 0;

        this.w = 143;
        this.h = 175;

      
        this.dx = 1; 
        

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
        )

    this.animateImg(frameCounter)


    }

    animateImg(frameCounter) {

        if(frameCounter % 8 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 3) this.img.frameIndex = 0;
    }
    move() {
        this.x -= this.dx;
    }
}


