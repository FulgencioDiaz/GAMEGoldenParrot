const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60,
    keys: {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        RIGHT_KEY: 39,
        LEFT_KEY: 37,
        SPACE: 32,

    },

    init: function () {
        console.log("Cargado")
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext("2d");
        
        ScoreBoard.init(this.ctx);

        this.start()
    },

    start: function() {
        console.log("Empezando juego")
       

        this.reset();
        
        
        // Loop del juego

        this.interval = setInterval(() => {

            // frameCounter es el mecanismo para programar acciones periodicas por ejemplo cada 50 frame genera un obtaculo o cada 6 frame cambia el skin del personaje
            this.frameCounter++;

            

            if(this.frameCounter > 1000) {
                this.frameCounter = 0;
            }

            // Cada 50 frame genera un obtaculo
            if(this.frameCounter % 300 === 0) {
                //this.generateObstacle()
            this.genarateEnemyAguilucho()
                
            }
            if(this.frameCounter % 200 === 0) {
               
                this.generateDinerito()
            }

            console.log(this.monedero)
            if (this.monedero > 1) {
                this.barco.dx = 0
            } else if(this.monedero == 0){

                this.barco.dx = 0.5
            }
            

            
             
             
             if ( this.player.x + (this.player.w * 0.8) >= this.barco.x &&
             this.player.x + (this.player.w * 0.3) <= this.barco.x + this.barco.w  &&
             this.player.y + (this.player.h * 0.6) >= this.barco.y &&
             this.player.y + (this.player.h * 0.4) <= this.barco.y + this.barco.h)
             {
                this.monedero = 0
             
         
                console.log("CONTADOR 0")
             }
           /*   if(this.monedero == 0 && this.barco.x <= canvas.width / 3  )
            {
            
            } */
              
            
             
            
          
             
            this.moveAll();
            this.drawAll();

            
            if(this.isDinerito()) {
               
                
                this.monedero++;
            }

            if(this.isEnemiguito()) {
              
              this.gameOver();
            }

            if (this.isImpactito()) {
              
            } else {
               
            }

            this.clearObstacles()
            this.clearEnemyAguiluchos()
            this.clearDinerito()


        }, 1000 / this.fps)
     
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.barco = new Barco(this.canvas.width, this.canvas.height, this.ctx)
        this.backgroundMoon = new BackgroundMoon(this.canvas.width, this.canvas.height, this.ctx)
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys)

       
        
        this.monedero = 0;
        this.cofre = 0;
        this.obstacles = [];
        this.enemyAguiluchos = [];
        this.dineritos = [];
        this.scoreBoard = ScoreBoard;
        this.frameCounter = 0
        
        
       
    },

    moveAll: function() {
        this.background.move()
        this.barco.move()
        this.backgroundMoon.move()
        this.player.move()
       

        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })
        this.dineritos.forEach(dinerito => {
            dinerito.move()
        })

        this.enemyAguiluchos.forEach(aguilucho => {
            aguilucho.move()
        })
    },

    drawAll: function() {
    
        this.background.draw()
        this.backgroundMoon.draw()
        this.barco.draw()
        this.player.draw(this.frameCounter)
      
        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })
        this.dineritos.forEach(dinerito => {
            dinerito.draw(this.frameCounter)
        })
        this.enemyAguiluchos.forEach(aguilucho => {
            aguilucho.draw(this.frameCounter)
        })

        this.drawScore();
    },

    stop: function() {
        clearInterval(this.interval)
    },

    generateObstacle: function() {
        this.obstacles.push(
            new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx)
        )
    },
    generateDinerito: function() {
        this.dineritos.push(
            new Dinerito(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    genarateEnemyAguilucho: function() {
        this.enemyAguiluchos.push(
            new Enemy(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    

    clearObstacles: function() {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x >= 0)
    },
    clearDinerito: function() {
        this.dineritos = this.dineritos.filter((dinerito) => dinerito.x >= 0)
    },

    clearEnemyAguiluchos: function() {
        this.enemyAguiluchos = this.enemyAguiluchos.filter((aguilucho) => aguilucho.x >= 0)
    },

   

    isDinerito: function() {
        return this.dineritos.some((dineritoSome) => {
            const result = (
            this.player.x + (this.player.w * 0.8) >= dineritoSome.x &&
            this.player.x + (this.player.w * 0.3) <= dineritoSome.x + dineritoSome.w  &&
            this.player.y + (this.player.h * 0.6) >= dineritoSome.y &&
            this.player.y + (this.player.h * 0.4) <= dineritoSome.y + dineritoSome.h)

            if (result) {
                this.dineritos = this.dineritos.filter((dineritoFilter) => {return dineritoFilter !== dineritoSome})
            }

            return result
        })
    },
    isEnemiguito: function() {
        return this.enemyAguiluchos.some((enemySome) => {
            return (
            this.player.x + (this.player.w / 1.8) >= enemySome.x &&
            this.player.x + (this.player.w * 0.3) <= enemySome.x + enemySome.w  &&
            this.player.y + (this.player.h - 145) >= enemySome.y &&
            this.player.y + (this.player.h) <= enemySome.y + enemySome.h)
   
        })
    },

    isImpactito: function() {

        return this.player.bullets.some(bullet => {  
            return this.enemyAguiluchos.some(aguilucho => {
        
                let resultado = (
                    bullet.x + bullet.r >= aguilucho.x &&
                    bullet.x - bullet.r <= aguilucho.x + aguilucho.w  &&
                    bullet.y + bullet.r >= aguilucho.y &&
                    bullet.y - bullet.r <= aguilucho.y + aguilucho.h)
        
                if(resultado) {

                    this.player.bullets = this.player.bullets.filter(b => b !== bullet)
                    this.enemyAguiluchos = this.enemyAguiluchos.filter(a => a !== aguilucho)
                  
                }

                return resultado
        
         })
        })

    },

    


    gameOver: function() {
        console.log("game OV")
        this.stop();

        if(confirm("GAME OVER. JUEGAS DE NUEVO?")) {
            this.reset();
            this.start();
        }
    }, 
   

    drawScore: function() {
        this.scoreBoard.update(this.monedero)
    }

}



