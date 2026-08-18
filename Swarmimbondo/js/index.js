const c = document.getElementById('c');
let tt = 0; // True timer
let t = 0; // Frame timer
const cx = c.getContext('2d');
let swarm = [] 
let speed = 1;
let paused = false;
const hardmode = false;
const difficulty = 1.2

const losediv = document.getElementById('lose')


const lamar = [document.getElementById('lmar1'), document.getElementById('lmar2'), document.getElementById('lmar3'), document.getElementById('lmar4')]
const lamarL = [document.getElementById('lmar1l'), document.getElementById('lmar2l'), document.getElementById('lmar3l'), document.getElementById('lmar4l')]

const poismar = [document.getElementById('pmar1'), document.getElementById('pmar2'), document.getElementById('pmar3'), document.getElementById('pmar4')]
const poismarL = [document.getElementById('pmar1l'), document.getElementById('pmar2l'), document.getElementById('pmar3l'), document.getElementById('pmar4l')]


const swarmars = [lamar, poismar];
const swarmarsL = [lamarL, poismarL];
let left = false; 


const marops = ['lamar', 'poismar'];
let randmar = Math.floor(Math.random() * 2);



class Marimbondo {
    constructor (type) {
        this.mspeed = speed;
        this.randx = Math.floor(Math.random() * 1400);
        this.randy = Math.floor(Math.random() * 650);
        this.x = this.randx;
        this.y = this.randy;

        this.type = type;
        switch (type) {
            case 'lamar': this.sprite = swarmars[0];
                this.spriteL = swarmarsL[0]; break;
            case 'poismar': this.sprite = swarmars[1];
                this.spriteL = swarmarsL[1]; break;
        }
        // cx.beginPath();
        // cx.arc(randx, randy, this.w, Math.PI * 2, true)
        // cx.stroke();
        // cx.fill();
    }
    
};
document.addEventListener('mousemove', lk) 
mx = document.clientX - 50;
my = document.clientY - 50; 

function lk(e) {
    mx = e.clientX - 20;
    my = e.clientY - 35; 
}

document.addEventListener('keypress', (key) => {
    if (key.code == 'KeyP') {
        console.log(paused);
        if (paused) {
            paused = false;
            requestAnimationFrame(repeat);
        } else {
            paused = true;
        }
    }
})   

let samex = false;
let samey = false;

let m1 = new Marimbondo(marops[randmar]);
// let m2 = new Marimbondo(5);
swarm.push(m1)
// swarm.push(m2)

function update() {
    // if (!paused) {
        swarm.forEach(k => {
            if (k.x > mx) {
                k.x -= speed;
                left = false;
                samex = false;
                // console.log(samex); //
            } else if (k.x < mx) {
                k.x += speed;
                left = true;
                samex = false;
                // console.log(samex); //
            } else {
                samex = true;
                left = true;
                // console.log(samex); //
            }

            if (k.y > my) {
                k.y -= speed;
                samey = false;
                // console.log(samey); //
            } else if (k.y < my) {
                k.y += speed;
                samey = false;
                // console.log(samey); //
            } else {
                samey = true; //
                // console.log(samey); //
            }
        });
    
}
mx = 700;
my = 400;
requestAnimationFrame(repeat);


function repeat() {
    if (!paused) {
    if (samex && samey) {
        console.log('Lose');
        losediv.style.zIndex = '5';
        losediv.style.display = 'block';
        losediv.style.animation = 'boing 1s ease-in-out 0ms infinite alternate';
        // console.log(t);
    } 
    else {
        console.log(tt);
    
        update();
        cx.clearRect(0, 0, 1500, 700)

        swarm.forEach(k => {
            if (t == 3) { t = 0; };

            // cx.beginPath(); // Debug
            // cx.moveTo(k.x, k.y);
            // cx.lineTo(mx, my);
            // cx.arc(k.x, k.y, k.w, 0, Math.PI * 2, true);
            // cx.stroke();
            // if (t % 3 == 0) {
            //     if (left) { cx.drawImage(mar1, k.x-10, k.y-20) }
            //     else { cx.drawImage(mar11, k.x-10, k.y-20) }
            // }
            // else {
            //     if (left) { cx.drawImage(mar2, k.x-10, k.y-20) }
            //     else { cx.drawImage(mar22, k.x-10, k.y-20) }
            // }
            // cx.arc(k.x, k.y, k.w, 0, Math.PI * 2, true)

            if (left) {
                cx.drawImage(k.sprite[t], k.x-10, k.y-20, 30, 30);
            }
            else {
                cx.drawImage(k.spriteL[t], k.x-10, k.y-20, 30, 30);
            }
            // cx.stroke();
        requestAnimationFrame(repeat);
        })
    t++;
    tt++;
    if (hardmode) {
        if (tt % 240 == 0) {
            console.log(t);
            speed *= difficulty;
            }
        } 
    }
}

}
