// Setup canvas
const CV = document.getElementById('canvas')
let ctx = CV.getContext('2d')
const CV_HEIGHT = CV.height
const CV_WIDTH = CV.width
function makeSprite(src) {
    i = new Image()
    i.src = src
    return i 
}

// Setup game
let score = 0
let jumping = false
let speed = 6;
let speedIncrease = 0.001;
let died = false
const FLOORHEIGHT = (CV_HEIGHT / 2) + 50
{
    document.addEventListener('keydown', e => {
        if (e.key == ' ') {
            jumping = true
            console.log('Jumping');
            
        }
    })
    document.addEventListener('keyup', e => {
        if (e.key == ' ') {
            jumping = false
        }
    })
    document.addEventListener('mousedown', () => {
        jumping = true
        console.log('Jumping');
        
    })
    document.addEventListener('mouseup', () => {
        jumping = false
    })
    document.addEventListener('touchstart', () => {
        jumping = true
        console.log('Jumping');
        
    })
    document.addEventListener('touchend', () => {
        jumping = false
    })
}


// Physics
let gravity = .8;
let jumpHeight = 15
let verticalAccel = 0
let onGround = true




// Player
let dino = {
    w: 40,
    h: 40,
    x: 120,
    y: FLOORHEIGHT,
    sprites: [
        makeSprite('img/dino_run.png'),
        makeSprite('img/dino_jump.png'),
        makeSprite('img/dino_dead.png')
    ]
}


// Enemys 
class Enemy {
    constructor(w, h, x, y, color) {
        this.w = w
        this.h = h
        this.x = CV_WIDTH + x
        this.y = FLOORHEIGHT + y
        this.color = color || 'red'
        this.speedMod = 1
        this.sprite = ''
    }
}
let enemies = [
    new Enemy(40, 40, 100, 0, 'brown'),
    new Enemy(80, 40, 0, 0, 'darkred')
]

let sn = 0
function draw() {
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT)
    score++
    ctx.fillStyle="black";
    ctx.font = "20px monospace"
    ctx.fillText('SCORE: ' + score, (CV_WIDTH / 10) * 8.2, CV_HEIGHT / 10)

    // Floor
    ctx.strokeStyle="black";
    ctx.lineTo(0, FLOORHEIGHT);
    ctx.lineTo(CV_WIDTH, FLOORHEIGHT);
    ctx.stroke()

    // Speed
    speed += speedIncrease

    // Player
    if (jumping) {
        if (onGround) {
            verticalAccel = jumpHeight
            onGround = false
            sn = 0
        }
    }
    if (dino.y > FLOORHEIGHT) {
        dino.y = FLOORHEIGHT
        onGround = true
        verticalAccel = 0
    } else {
        if (dino.y - (verticalAccel - gravity) > FLOORHEIGHT) {
            onGround = true
            verticalAccel = 0
        } else {
            verticalAccel = verticalAccel - gravity
        }
    }
    
    // Draw Dino
    dino.y -= verticalAccel
    // ctx.fillStyle="darkblue";
    ctx.fillStyle="rgba(39, 39, 117, .2)";
    ctx.fillRect(dino.x, dino.y - dino.h, dino.w, dino.h);

    // died = true
    if (died) {
        if (score % 8 == 0) {
            sn++
            if (sn > 3) {
                sn = 3
            } 
        }
        ctx.drawImage(dino.sprites[2],
            44 * sn, 0, 44, 20, dino.x, dino.y - 20, dino.w, 20
        )
    } else {

        
        if (onGround) {
            // if (score % 4 == 0) {
                if (Math.floor(score % (4 - speed / 4)) == 0) {
                    sn++
                    if (sn > 3) {
                        sn = 0
                    } 
                }
                ctx.drawImage(dino.sprites[0],
                    46 * sn, 0, 46, 38, dino.x, dino.y - 38, dino.w, 38
                )
            } else {
                
                if (score % 8 == 0) {
                    sn++
                    if (sn > 3) {
                        sn = 3
                    } 
                }
                ctx.drawImage(dino.sprites[1],
                    50 * sn, 0, 50, 40, dino.x, dino.y - 40, dino.w, 40
                )
                
            }
        }
            
            
            
            
            
    enemies.forEach(e => {
        e.x -= speed * e.speedMod
        ctx.fillStyle=e.color;
        ctx.fillRect(e.x, e.y - e.h, e.w, e.h);
    
        if (e.x + (e.w * 1.5) <= 0) {
            enemies.shift()
        }
    });
    




    // Hit
    // c = false
    // enemies.forEach(e => {
        
    //     if (
    //         (dino.x + dino.w) > e.x ||  
    //         dino.x < (e.x + e.w)  
    //     ) {
    //         c = true
    //     }
        
    //     if (
    //         c && e.y < (dino.y - dino.h) || 
    //         c && (e.y + e.h) > dino.y  
    //     ) {
    //         died = true;
    //         console.log('died');     
    //     }
    // });
    




    window.requestAnimationFrame(draw)}
window.requestAnimationFrame(draw)












setInterval(() => {
    // console.log('va: ', verticalAccel);
    // console.log('g: ', onGround);
//     // console.log('a: ', a);
//     console.log('ot: ', ot);
//     console.log('ott: ', ott);
    
        console.log('Enemy x', enemies[0].x, (dino.x + dino.w), + '\n',
            '-', (enemies[0].x + enemies[0].w), dino.x);
}, 1000);
