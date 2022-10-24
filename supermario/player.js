class Player {

    constructor(w, h, ctx, keys) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
        this.keys = keys;
      
        this.x = this.canvasW * 0.08

        // Posición original
        this.y0 = this.canvasH * 0.5;
        
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "/Users/funche/Desktop/Bootcamp/juego/supermario/img/PngItem_1936084(nuevo).png"
        
        this.img.frames = 9;
        this.img.frameIndex = 0;

        this.w = 143;
        this.h = 175;

        this.bullets = []

        this.vy = 1;
        this.setListeners();    
        
        this.dy = 0;
    }


    setListeners() {
        
        // Vincular las teclas de los controladores de teclado
        document.onkeydown = function(event) {
            
            if (
                event.keyCode === this.keys.TOP_KEY 
                
                ) {
                  this.dy = 3

            }
            else if(
                event.keyCode === this.keys.DOWN_KEY
                ){
                this.dy = -3
            }
            
            else if (

                event.keyCode === this.keys.SPACE
            ) {
                this.shoot()
            }
        }.bind(this)

        document.onkeyup = function(event) {
            
            if (
                event.keyCode === this.keys.TOP_KEY
                
                ) {
                  this.dy = 0

            }
            else if (
                event.keyCode === this.keys.DOWN_KEY

            ) {
                this.dy = 0
            }
            
        }.bind(this)
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

        // Clear bullets
        this.bullets = this.bullets.filter((bullet) => bullet.x < this.canvasW )
        
        this.bullets.forEach((bullet) => {
            bullet.draw();
            bullet.move();
        })

    }

    move() {
        
        // Gravedad del salto
       

       this.y -= this.dy

    }
  
    animateImg(frameCounter) {

        if(frameCounter % 9 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 8) this.img.frameIndex = 0;
    }


    shoot() {
        const bullet = new Bullet(
            this.x + this.w,
            this.y + this.h / 2,
            this.y0,
            this.h,
            this.ctx
        )

        this.bullets.push(bullet)
    }

}