class Barco {
    constructor(w, h, ctx) {
        this.ctx = ctx;
        this.w = w/2 ;
        this.h = h/2;

        this.img = new Image();
        this.img.src = "/Users/funche/Desktop/Bootcamp/juego/supermario/img/pngwing.com (1).png"

        this.x = canvas.width;
        this.y = 300;
        this.monedero = 0;
        
        // desplazamiento
        this.dx = 1.5;
    }
    
    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )

    }

    move() {
        this.x -= this.dx
        /* 
        if (this.monedero > 1) {
            this.barco.move()


            console.log("APARECE BARCO") */
        }
        
        
       // if( this.x < -this.w) this.x = 0;
    }


    
