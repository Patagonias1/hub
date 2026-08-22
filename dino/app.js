const CON = document.getElementsByClassName('con')[0]
const THEMEBUTTONS = document.getElementsByName('themebtn')
let currTheme = 1

// Setup canvas
const CV = document.getElementById('canvas')
const CVFXS = document.getElementsByName('canvasfx')
const CTXFX = [
    CVFXS[0].getContext('2d'),
    CVFXS[1].getContext('2d'),
    CVFXS[2].getContext('2d')
]
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
    CON.style.setProperty('animation', 'shake .2s ease-out forwards 1')
    setTimeout(() => {
        CON.style.removeProperty('animation')
    }, 200);
}



// Setup game
let delta = 0
let score = 0
let highScore = 0
let jumping = false
let speed = 7; //6
let speedIncrease = 0.001;
let died = false
let noclip = false
// let noclip = true
const FLOORHEIGHT = (CV_HEIGHT / 2) + 50
{
    document.addEventListener('keydown', e => {
        if (e.key == ' ') {
            if (died) reset()
            else jumping = true
            // console.log('Jumping');   
        } else if (e.key == 'k') {
            died = true
        } else if (e.key == 'r') {
            reset()
        }
    })
    document.addEventListener('keyup', e => {
        if (e.key == ' ') {
            jumping = false
        }
    })
    CV.addEventListener('mousedown', () => {
        if (died) reset()
        else jumping = true
        console.log('Jumping');
        
    })
    CV.addEventListener('mouseup', () => {
        jumping = false
    })
    CV.addEventListener('touchstart', () => {
        if (died) reset()
        else jumping = true
        console.log('Jumping');
        
    })
    CV.addEventListener('touchend', () => {
        jumping = false
    })
}



// Physics
let gravity = .8;
let jumpHeight = 15
let verticalAccel = 0
let onGround = true
let nextGroundY = FLOORHEIGHT



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
    constructor(w, h, x, y, color, speedMod) {
        this.w = w
        this.h = h
        this.x = CV_WIDTH + x
        this.y = FLOORHEIGHT - y
        this.color = color || 'red'
        this.speedMod = speedMod || 1
        this.sprite = ''
    }
}
// Platform 
class Platform {
    constructor(w, h, x, y, color, speedMod) {
        this.w = w
        this.h = h
        this.x = CV_WIDTH + x
        this.y = FLOORHEIGHT - y
        this.color = color || 'black'
        this.speedMod = speedMod || 1
        this.sprite = ''
    }
}
let enemies = [
    new Enemy(40, 40, 100, 0, 'brown'),
    new Enemy(80, 40, 500, 0, 'darkred'),
    new Enemy(40, 40, 1000, 0, 'brown'),
    new Enemy(80, 40, 1400, 0, 'brown'),
]
enemies = []
let platforms = [
    new Platform(150, 20, 400, 100, 'blue'),
    new Platform(150, 20, 900, 100, 'blue'),
    new Platform(150, 20, 2000, 100, 'blue'),
    new Platform(150, 20, 3000, 100, 'blue'),
    new Platform(150, 20, 3500, 100, 'blue'),
    new Platform(150, 20, 4000, 100, 'blue'),

    new Platform(1000, 20, 0, 100, 'blue'),
    new Platform(300, 20, -400, 100, 'blue'),
]
platforms = []

let enemySpawnTimer = 0
let spriteNumber = 0
function draw() {
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT)
    ctx.fillStyle="#1a0d2e";
    ctx.font = "20px monospace"
    ctx.fillText('SCORE: ' + score, (CV_WIDTH / 10.5) * 8.2, CV_HEIGHT / 10)
    if (highScore > 0) {
        ctx.fillText('HIGH SCORE: ' + highScore, (CV_WIDTH / 10.5) * 8.2, CV_HEIGHT / 6)
    }

    // Floor
    ctx.fillStyle = '#3a4a66'
    ctx.fillRect(0, FLOORHEIGHT, CV_WIDTH, CV_HEIGHT / 2)
    ctx.strokeStyle="black";
    ctx.lineTo(0, FLOORHEIGHT);
    ctx.lineTo(CV_WIDTH, FLOORHEIGHT);
    ctx.stroke()
    
    // Speed
    speed += speedIncrease
    enemySpawnTimer++
    

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
        if (score > highScore) highScore = score

        ctx.font = "40px monospace"
        ctx.fillStyle = 'lightblue'
        ctx.fillText('YOU DIED!', (CV_WIDTH / 4), (CV_HEIGHT / 3) * 2)
        ctx.font = "20px monospace"
        ctx.fillStyle = '#3a4a66'
        ctx.fillText('Click to restart', (CV_WIDTH / 4), (CV_HEIGHT / 3) * 1)



    } else {
        delta++
        if (delta % 5 == 0) score ++
        // Player
        if (jumping) {
            if (onGround) {
                verticalAccel = jumpHeight
                onGround = false
                spriteNumber = 0
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
                spriteNumber++
                if (spriteNumber > 3) {
                    spriteNumber = 3
                } 
            }
            ctx.drawImage(dino.sprites[2],
                46 * spriteNumber, 0, 46, 25,
                dino.x - 46 * .15, dino.y - 25 * 1.4,
                46 * 1.5, 25 * 1.5
            )
        } else {
            if (onGround) {
                    // if (Math.round(delta % (4 - speed / 6)) == 0) {
                    if (delta % 4 - (Math.round(speed / 10)) == 0) {
                        spriteNumber++
                        if (spriteNumber > 3) {
                            spriteNumber = 0
                        } 
                    }
                    ctx.drawImage(dino.sprites[0],
                        48 * spriteNumber, 0, 48, 40,
                        dino.x - 48 * .2, dino.y - 40 * 1.5,
                        48 * 1.5, 40 * 1.5
                    )
            } else {
                
                if (delta % 8 == 0) {
                    spriteNumber++
                    if (spriteNumber > 3) {
                        spriteNumber = 3
                    } 
                }
                ctx.drawImage(dino.sprites[1],
                    52 * spriteNumber, 0, 52, 42,
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
                if (e.x + (e.w * 1.5) <= -300) {
                    // platforms.shift()

                } else {
                    e.x -= (speed * e.speedMod)
                    ctx.fillStyle=e.color;
                    ctx.fillRect(e.x, e.y - e.h, e.w, e.h);
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
        
        // ENEMY
        if (enemySpawnTimer % 70 == 0) {
            rngX = Math.floor(Math.random() * 150 + 100);
            enemies.push(new Enemy(40, 40, rngX, 0, '#92537f'))
            if (Math.floor(Math.random() * 7) == 6) {
                enemies.push(new Enemy(40, 80, rngX + ((rngX % 2 == 0) ? 80 : -80), 0, '#7f4c89'))
            }
        }


        // BG
        if (enemySpawnTimer % 100 == 0) {
            rngX = Math.floor(Math.random() * 350);
            platforms.push(new Platform(200, 20, rngX, 
                (Math.floor(Math.random() * 50)) + 200, 'lightblue', .5))
            if (Math.floor(Math.random() * 5) == 4) {
                platforms.push(new Platform(150, 20, rngX + 1, 
                Math.floor(Math.random() * 100) + 250, '#749ca1', .5))
            }
        }
        // BG
        if (enemySpawnTimer % 20 == 0) {
            rngX = Math.floor(Math.random() * 350);
            platforms.push(new Platform(300, 300, rngX, 
                (Math.floor(Math.random() * 150)) - 500, '#749ca1', 1.2))
            if (Math.floor(Math.random() * 3) == 2) {
                platforms.push(new Platform(300, 300, rngX + 100, 
                Math.floor(Math.random() * 200) - 520, '#5a8093', 1.5))
            }
        }









        // // Platform
        // if (!died) {
        //     platforms.forEach(e => {
        //         dlef = dino.x
        //         drig = dino.x + dino.w
        //         dbot = dino.y
        //         dtop = dino.y - dino.h
                
        //         elef = e.x
        //         erig = e.x + e.w
        //         ebot = e.y
        //         etop = e.y - e.h
                
        //         // if (
        //         //     (drig > elef) && (dlef < erig) &&
        //         //     (dbot > etop)
        //         // ) {
        //         if ((drig > elef) && (dlef < erig)) {
        //             if (dbot == etop) {
        //                 nextGroundY = etop
        //                 onGround = true
        //                 dino.h = etop
        //                 verticalAccel = 0
        //                 // console.log('on me');
                        
        //             }else if (dbot < etop) {
        //                 nextGroundY = etop
        //                 // console.log('over me');
        //             } else {
        //                 nextGroundY = FLOORHEIGHT
        //             }
        //         } else {
        //             nextGroundY = FLOORHEIGHT
                    
        //         }
        //     })
        // }







    CTXFX.forEach(c => {
        if (delta % 3 == 0) {
            c.clearRect(0, 0, CV_WIDTH, CV_HEIGHT)
        }
        c.drawImage(CV, 0, 0)
    });
    
    frameReq = window.requestAnimationFrame(draw) }
frameReq = window.requestAnimationFrame(draw)





function reset() {
    cancelAnimationFrame(frameReq)
    delta = 0
    score = 0
    jumping = false
    speed = 6; 
    speedIncrease = 0.001;
    died = false
    noclip = false

    dino = {
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

    gravity = .8;
    jumpHeight = 15
    verticalAccel = 0
    onGround = true
    nextGroundY = FLOORHEIGHT

    // enemies = [
    //     new Enemy(40, 40, 100, 0, 'brown'),
    //     new Enemy(80, 40, 500, 0, 'darkred'),
    //     new Enemy(40, 40, 1000, 0, 'brown'),
    //     new Enemy(80, 40, 1400, 0, 'brown'),
    // ]
    enemies = []
    platforms = [
        new Platform(150, 20, 400, 100, 'blue'),
        new Platform(150, 20, 900, 100, 'blue'),
        new Platform(150, 20, 2000, 100, 'blue'),
        new Platform(150, 20, 3000, 100, 'blue'),
        new Platform(150, 20, 3500, 100, 'blue'),
        new Platform(150, 20, 4000, 100, 'blue'),

        new Platform(1000, 20, 0, 100, 'blue'),
        new Platform(300, 20, -400, 100, 'blue'),
    ]
    platforms = []

    frameReq = window.requestAnimationFrame(draw)
}


for (let i = 0; i < THEMEBUTTONS.length; i++) {
    
    THEMEBUTTONS[i].addEventListener('click', () => {
        a = document.getElementsByClassName('fxcon')
        switch (i) {
            case 0:
                // CVFXS.forEach(c => {  
                //     c.style.setProperty('opacity', '0%')
                //     document.getElementsByClassName('fxcon no')[0].style.setProperty('opacity', '0%')
                // });
                for (let i = 0; i < a.length; i++) {
                    a[i].style.setProperty('opacity', '0%')
                    a[i].style.setProperty('mix-blend-mode', 'normal')
                }
            break;
            

            case 1:
                for (let i = 0; i < a.length; i++) {
                    a[i].style.setProperty('opacity', '50%')
                    a[i].style.setProperty('mix-blend-mode', 'soft-light')
                }
                document.getElementsByClassName('fxcon no')[0].style.setProperty('opacity', '100%')
                document.getElementsByClassName('fxcon no')[0].style.setProperty('mix-blend-mode', 'screen')
                break;
                

            case 2:
                for (let i = 0; i < a.length; i++) {
                    a[i].style.setProperty('opacity', '80%')
                    a[i].style.setProperty('mix-blend-mode', 'overlay')
                }
                document.getElementsByClassName('fxcon no')[0].style.setProperty('opacity', '100%')
                document.getElementsByClassName('fxcon no')[0].style.setProperty('mix-blend-mode', 'screen')
            break;



            // ...
            
            default:
                break;
        }
        for (let ii = 0; ii < THEMEBUTTONS.length; ii++) {
            THEMEBUTTONS[ii].removeAttribute('class')
        }
        THEMEBUTTONS[i].setAttribute('class', 'activetheme')
    }) 
}
THEMEBUTTONS[currTheme].click()

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


