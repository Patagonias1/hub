const MAINFX = document.getElementsByClassName('fxmain')[0]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')

let listchars = []

function newfxchar() {
    let fxchar = document.createElement('span')
    listchars.push(fxchar)
    fxchar.setAttribute('class', 'fxchar')
    fxchar.style.left = Math.floor(Math.random() * 100) + '%'
    fxchar.style.top = Math.floor(Math.random() * window.height) + 'px'
    fxchar.style.animationDelay = Math.floor(Math.random() * -15) + 's'
    fxchar.style.opacity = Math.floor(Math.random() * 90) + 10 + '%'
    fxchar.style.animationDuration = Math.floor(Math.random() * 3) + 13 + 's'
    fxchar.style.transform = 'scale(' + Math.random() * 1.5 + 5 + ')'
    fxchar.innerHTML = innerHTML = CHARS[Math.floor(Math.random() * CHARS.length)]
    MAINFX.appendChild(fxchar)
    return fxchar
}

let amt = window.innerWidth > 400 ? 200 : 35
for (let i = 0; i < amt; i++) {
    newfxchar()
}



setInterval(() => {
    for (let i = 0; i < listchars.length; i++) {
        listchars[i].innerHTML = CHARS[Math.floor(Math.random() * CHARS.length)];
    }
}, 500);
