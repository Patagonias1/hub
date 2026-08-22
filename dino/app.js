// Setup canvas
const CV = document.getElementById('canvas')
let ctx = CV.getContext('2d')
ctx.imageSmoothingEnabled = false
const CV_HEIGHT = CV.height
const CV_WIDTH = CV.width
function makeSprite(src) {
    i = new Image()
    i.src = src
    return i 
}
function screenShake() {
    CV.style.setProperty('animation', 'shake .2s ease-out forwards 1')
    setTimeout(() => {
        CV.style.removeProperty('animation')
    }, 200);
}

// Setup game
let delta = 0
let score = 0
let jumping = false
let speed = 6; //6
let speedIncrease = 0.001;
let died = false
let noclip = false
// let noclip = true
const FLOORHEIGHT = (CV_HEIGHT / 2) + 50
{
    document.addEventListener('keydown', e => {
        if (e.key == ' ') {
            jumping = true
            // console.log('Jumping');   
        } else if (e.key == 'k') {
            died = true
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
let nextGroundY



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
        this.y = FLOORHEIGHT - y
        this.color = color || 'red'
        this.speedMod = 1
        this.sprite = ''
    }
}
// Platform 
class Platform {
    constructor(w, h, x, y, color) {
        this.w = w
        this.h = h
        this.x = CV_WIDTH + x
        this.y = FLOORHEIGHT - y
        this.color = color || 'black'
        this.speedMod = 1
        this.sprite = ''
    }
}
let enemies = [
    new Enemy(40, 40, 100, 0, 'brown'),
    new Enemy(80, 40, 500, 0, 'darkred'),
    new Enemy(40, 40, 1000, 0, 'brown'),
    new Enemy(80, 40, 1400, 0, 'brown'),
]
let platforms = [
    new Platform(150, 20, 400, 100, 'blue'),
    new Platform(150, 20, 900, 100, 'blue'),
    new Platform(150, 20, 2000, 100, 'blue'),
    new Platform(150, 20, 3000, 100, 'blue'),
    new Platform(150, 20, 3500, 100, 'blue'),
    new Platform(150, 20, 4000, 100, 'blue'),

    new Platform(1000, 20, 0, 100, 'blue'),
    new Platform(100, 20, -400, 100, 'blue'),
]

let sn = 0
function draw() {
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT)
    ctx.fillStyle="#1a0d2e";
    ctx.font = "20px monospace"
    ctx.fillText('SCORE: ' + score, (CV_WIDTH / 10) * 8.2, CV_HEIGHT / 10)

    // Floor
    ctx.strokeStyle="black";
    ctx.lineTo(0, FLOORHEIGHT);
    ctx.lineTo(CV_WIDTH, FLOORHEIGHT);
    ctx.stroke()
    
    // Speed
    speed += speedIncrease
    

    if (dino.y >= FLOORHEIGHT) nextGroundY = FLOORHEIGHT
    
        if (dino.y > nextGroundY) {
            dino.y = nextGroundY + 1
            onGround = true
            verticalAccel = 0
        } else {
            if (dino.y - (verticalAccel - gravity) > nextGroundY) {
                dino.y = nextGroundY + 1
                onGround = true
                verticalAccel = 0
            } else {
                verticalAccel = verticalAccel - gravity
            }
        }












        // Game over
    if (died) {
        if (speed > 0) {
            speed -= speedIncrease * 200
        } else {
            speedIncrease = 0
            speed = 0;
        }
        ctx.font = "40px monospace"
        ctx.fillText('YOU DIED!', (CV_WIDTH / 4), (CV_HEIGHT / 3) * 2)



    } else {
        delta++
        if (delta % 5 == 0) score ++
        // Player
        if (jumping) {
            if (onGround) {
                verticalAccel = jumpHeight
                onGround = false
                sn = 0
            }
        }
    }
        
        // Draw Dino
        dino.y -= verticalAccel
        // ctx.fillStyle="darkblue";
        ctx.fillStyle="rgba(39, 39, 117, .2)";
        // ctx.fillRect(dino.x, dino.y - dino.h, dino.w, dino.h); // Debug hitbox
        
        // died = true
        if (died) {
            if (delta % 8 == 0) {
                sn++
                if (sn > 3) {
                    sn = 3
                } 
            }
            ctx.drawImage(dino.sprites[2],
                46 * sn, 0, 46, 25,
                dino.x - 46 * .15, dino.y - 25 * 1.4,
                46 * 1.5, 25 * 1.5
            )
        } else {
            if (onGround) {
                // if (score % 4 == 0) {
                    if (Math.round(delta % (4 - speed / 6)) == 0) {
                        sn++
                        if (sn > 3) {
                            sn = 0
                        } 
                    }
                    ctx.drawImage(dino.sprites[0],
                        48 * sn, 0, 48, 40,
                        dino.x - 48 * .2, dino.y - 40 * 1.5,
                        48 * 1.5, 40 * 1.5
                    )
            } else {
                
                if (delta % 8 == 0) {
                    sn++
                    if (sn > 3) {
                        sn = 3
                    } 
                }
                ctx.drawImage(dino.sprites[1],
                    52 * sn, 0, 52, 42,
                    dino.x - 52 * .3, dino.y - 42 * 1.5,
                    52 * 1.5, 42 * 1.5
                )
                
            }
    
        }
        
        
        
        // Draw Enemys
        if (enemies.length !=0) {
            enemies.forEach(e => {
                e.x -= (speed * e.speedMod)
                ctx.fillStyle=e.color;
                ctx.fillRect(e.x, e.y - e.h, e.w, e.h);
                
                if (e.x + (e.w * 1.5) <= -300) {
                    // enemies.shift()
                }
            });
        }
            
        // Draw Platform
        if (platforms.length !=0) {
            platforms.forEach(e => {
                e.x -= (speed * e.speedMod)
                ctx.fillStyle=e.color;
                ctx.fillRect(e.x, e.y - e.h, e.w, e.h);
                
                if (e.x + (e.w * 1.5) <= -300) {
                    // platforms.shift()
                }
            });
        }
    
    
        
        // Hitbox enemy
        if (!died && !noclip) {
            enemies.forEach(e => {
                dlef = dino.x
                drig = dino.x + dino.w
                dbot = dino.y
                dtop = dino.y - dino.h
                
                elef = e.x
                erig = e.x + e.w
                ebot = e.y
                etop = e.y - e.h
                
                if (
                    (drig > elef) && (dlef < erig) &&
                    (dbot > etop) && (dtop < ebot)
                ) {
                    died = true;     
                    screenShake()               
                }
            })
        }
        

        // Platform
        if (!died) {
            platforms.forEach(e => {
                dlef = dino.x
                drig = dino.x + dino.w
                dbot = dino.y
                dtop = dino.y - dino.h
                
                elef = e.x
                erig = e.x + e.w
                ebot = e.y
                etop = e.y - e.h
                
                // if (
                //     (drig > elef) && (dlef < erig) &&
                //     (dbot > etop)
                // ) {
                if ((drig > elef) && (dlef < erig)) {
                    if (dbot == etop) {
                        nextGroundY = etop
                        onGround = true
                        dino.h = etop
                        verticalAccel = 0
                        console.log('on me');
                        
                    }else if (dbot < etop) {
                        nextGroundY = etop
                        console.log('over me');
                    } else {
                        nextGroundY = FLOORHEIGHT
                    }
                } else {
                    nextGroundY = FLOORHEIGHT
                    
                }
            })
        }
        
    
    window.requestAnimationFrame(draw) }
window.requestAnimationFrame(draw)

// setInterval(() => {
    // // Debug
//     // console.log('va: ', verticalAccel);
//     // console.log('g: ', onGround);
// //     // console.log('a: ', a);
// //     console.log('ot: ', ot);
// //     console.log('ott: ', ott);
//     // a = '.'
//     // if (dino.x + dino.w > enemies[0].x) {
//     //     a = '>'
//     // }
//     // if (dino.x < enemies[0].x + enemies[0].w) {
//     //     a = '<'
//     // }
//     // console.log(enemies[0].y - enemies[0].h);
//     // console.log(dino.y);
//     // console.log(enemies[0].y);
//     // console.log(dino.y - dino.h);
//     console.log(dino.x);
//     console.log(enemies[0].x + enemies[0].w);
//     console.log(dino.x + dino.w);
//     console.log(enemies[0].x);
//     // console.log(
//     //     '-> Dino XD:' + (dino.x + dino.w), a + ' Enemy X:' + Math.floor(enemies[0].x));
//     // console.log(
//     //     '-> Dino X:' + dino.x, a + ' Enemy XD:' + (Math.floor(enemies[0].x) + enemies[0].w));
// }, 300);


