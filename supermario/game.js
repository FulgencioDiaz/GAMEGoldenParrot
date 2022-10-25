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

            this.score += 0.01;

            if(this.frameCounter > 1000) {
                this.frameCounter = 0;
            }

            // Cada 50 frame genera un obtaculo
            if(this.frameCounter % 300 === 0) {
                this.generateObstacle()
                this.genarateEnemyAguilucho()
                this.generateDinerito()
            }

            this.moveAll();
            this.drawAll();

            this.clearObstacles()
            this.clearEnemyAguiluchos()
            this.clearDinerito()

            if(this.isCollision()) {
                this.gameOver();
            }

        }, 1000 / this.fps)

    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys)
        // this.enemy = new Enemy(this.canvas.width, this.canvas.height, this.ctx)
       
        // this.scoreBoard = ScoreBoard
        this.score = 0;
        this.obstacles = [];
        this.enemyAguiluchos = [];
        this.dinerito = [];
        this.scoreBoard = ScoreBoard;
        this.frameCounter = 0
    },

    moveAll: function() {
        this.background.move()
        this.player.move()
        //this.enemy.move()

        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })
        this.dinerito.forEach(dinerito => {
            dinerito.move()
        })

        this.enemyAguiluchos.forEach(aguilucho => {
            aguilucho.move()
        })
    },

    drawAll: function() {
    
        this.background.draw()
        this.player.draw(this.frameCounter)
      
        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })
        this.dinerito.forEach(dinerito => {
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
        this.dinerito.push(
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
        this.dinerito = this.dinerito.filter((dinerito) => dinerito.x >= 0)
    },

    clearEnemyAguiluchos: function() {
        this.enemyAguiluchos = this.enemyAguiluchos.filter((aguilucho) => aguilucho.x >= 0)
    },

    isCollision: function() {
        console.log("hol<colisi")
        return this.obstacles.some(obstacle => {
            return (this.player.x + this.player.w >= obstacle.x &&
            this.player.x < obstacle.x + obstacle.w &&
            this.player.y + (this.player.h - 20) >= obstacle.y)
        })
    },

    isDinerito: function() {
        console.log("DINERO!")
        return this.dinerito.some(dinerito => {
            return (this.player.x + this.player.w >= dinerito.x &&
            this.player.x < dinerito.x + dinerito.w &&
            this.player.y + (this.player.h - 20) >= dinerito.y)
        })

    },

  /*   gameOver: function() {
        console.log("game OV")
        this.stop();

        if(confirm("GAME OVER. JUEGAS DE NUEVO?")) {
            this.reset();
            this.start();
        }
    }, */

    drawScore: function() {
        this.scoreBoard.update(this.score)
    }

}