class Dinerito {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
     
        this.x0 = this.x
        this.x = this.canvasW
       

        this.y = Math.floor(Math.random() * 100)
    

        this.img = new Image();
        this.img.src = "img/kindpng_1278454.png"
        
        this.img.frames = 6;
        this.img.frameIndex = 0;

        this.w = 23;
        this.h = 25;

      
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

        if(this.img.frameIndex > 5) this.img.frameIndex = 0;
    }
    move() {
        this.x -= this.dx;
    }
}


