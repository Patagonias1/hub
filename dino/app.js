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
let speed = 3;
let speedIncrease = 0.001;
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
        makeSprite('img/dino_jump.png')
    ]
}


// Enemys 
const ENEMYS = [
    {
        w: 40,
        h: 40,
        x: 150,
        y: FLOORHEIGHT - 40,
        sprite: 'en1'
    },
]


let sn = 0
function draw() {
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT)
    score++
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
    ctx.fillStyle="darkblue";
    // ctx.fillRect(dino.x, dino.y - dino.h, dino.w, dino.h);

    if (onGround) {
        // if (score % 4 == 0) {
        if (Math.floor(score % (4 - speed / 4)) == 0) {
            sn++
            if (sn > 3) {
                sn = 0
            } 
        }
        ctx.drawImage(dino.sprites[0],
            46 * sn, 0, 46, 38, dino.x, dino.y - dino.h, dino.w, dino.h
        )
    } else {
        
        if (score % 8 == 0) {
            sn++
            if (sn > 3) {
                sn = 3
            } 
        }
        ctx.drawImage(dino.sprites[1],
            50 * sn, 0, 50, 40, dino.x, dino.y - dino.h, dino.w, dino.h
        )

    }


    //o
    // ctx.fillStyle="darkred";
    // ctx.fillRect(o[0], dino.y, dino.w, dino.h);
    // ctx.fillRect(o[1], dino.y, dino.w, dino.h);
    // ctx.fillRect(o[2], dino.y, dino.w, dino.h);
    // o[0] -= speed
    // o[1] -= speed
    // o[2] -= speed

    // ot--
    // if (ot == 0) {
    //     ot = 100
    //     ott++
    //     if (ott > 3) {
    //         ott = -1
    //     }
    //     o[ott] += 800 + (Math.floor(Math.random() * 800))

    // }









    window.requestAnimationFrame(draw)}
window.requestAnimationFrame(draw)












setInterval(() => {
    // console.log('va: ', verticalAccel);
    // console.log('g: ', onGround);
//     // console.log('a: ', a);
//     console.log('ot: ', ot);
//     console.log('ott: ', ott);
    
}, 1000);
