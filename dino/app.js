const C = document.getElementById('canvas')

let s = 3;
let g = -3;
let j = false
let a = 0
let ctx = C.getContext('2d')

let dx = 50
let dy = 330
let dw = 40
let dh = 40
let jh = 100
let ot = [
    Math.floor(Math.random() * 800),
    Math.floor(Math.random() * 800),
    Math.floor(Math.random() * 800),
]
let ott = -1
let o = [ 
    
]

document.addEventListener('keydown', e => {
    if (e.key == ' ') {
        j = true      
        a = jh
    }
})
document.addEventListener('keyup', e => {
    if (e.key == ' ') {
        j = false      
    }
})

function draw() {
    ctx.clearRect(0, 0, 900, 600)
    // floor
    ctx.stroke();
    ctx.strokeStyle="black";
    ctx.lineTo(0, dy + dh);
    ctx.lineTo(900, dy + dh);
    ctx.stroke()

    //d
    if (a > 0) {
        a += g 
    }
    ctx.fillStyle="darkblue";
    ctx.fillRect(dx, dy - a, dw, dh);
    

    //o
    ctx.fillStyle="darkred";
    ctx.fillRect(o[0], dy, dw, dh);
    ctx.fillRect(o[1], dy, dw, dh);
    ctx.fillRect(o[2], dy, dw, dh);
    o[0] -= s
    o[1] -= s
    o[2] -= s

    ot--
    if (ot == 0) {
        ot = 100
        ott++
        if (ott > 3) {
            ott = -1
        }
        o[ott] += 800 + (Math.floor(Math.random() * 800))

    }








    window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)




setInterval(() => {
    // console.log('a: ', a);
    console.log('ot: ', ot);
    console.log('ott: ', ott);
    
}, 1000);