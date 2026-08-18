// const BUTTONS = document.getElementsByClassName('btn')
const DIV_CON = document.getElementsByClassName('con')[0]
const DIV_OVER = document.getElementsByClassName('over')[0]
const DIV_RULES = document.getElementsByClassName('rules')[0]
const DIV_PICKER = document.getElementsByClassName('picker')[0]
const DIV_SCORES = document.getElementsByClassName('scores')[0]
const BTN_OPTIONS = []
const SFX_GAME = [
    () => { return new Audio('media/') },
    () => { return new Audio('media/sfx_win.wav') },
]
const CV_REL = document.getElementById('relgraph')

const OBJ_REL = [
{
    'id': 1,
    'name': 'Rock',
    'beats': [3, 4, 5, 6, 11, 12, 19, 22], 
    // 'losesTo': [2],
    'colors': ['rgb(66, 62, 60)',
        'rgb(50, 50, 53)',
        'rgb(50, 50, 53)']
},
{
    'id': 2,
    'name': 'Paper',
    'beats': [1, 5, 8, 13, 14, 15, 19], 
    // 'losesTo': [3],
    'colors': ['rgb(132, 129, 120)',
        'rgb(120, 115, 87)',
        'rgb(164, 159, 134)']
},
{
    'id': 3,
    'name': 'Scissors',
    'beats': [2, 6, 7, 9, 15, 16, 19, 22], 
    // 'losesTo': [1],
    'colors': ['rgb(127, 52, 73)',
        'rgb(120, 105, 112)',
        'rgb(142, 74, 87)']
},
{
    'id': 4,
    'name': 'Gum',
    'beats': [2, 3, 6, 9, 14, 15, 16, 20], 
    // 'losesTo': [1],
    'colors': ['rgb(100, 35, 86)',
        'rgb(100, 40, 89)',
        'rgb(194, 89, 175)']
},
{
    'id': 5,
    'name': 'Plane',
    'beats': [3, 4, 7, 9, 11, 12, 13, 14, 19], 
    // 'losesTo': [1],
    'colors': ['rgb(37, 46, 32)',
        'rgb(40, 50, 34)',
        'rgb(71, 114, 88)']
},
{
    'id': 6,
    'name': 'Coughing Baby',
    'beats': [2, 5, 8, 9, 13, 14, 15, 20, 22], 
    // 'losesTo': [0],
    'colors': ['rgb(72, 59, 70)',
        'rgb(79, 67, 78)',
        'rgb(133, 101, 130)']
},
{
    'id': 7,
    'name': 'Hydrogen Bomb',
    'beats': [1, 2, 4, 6, 8, 9, 12, 13, 14, 19], 
    // 'losesTo': [0],
    'colors': ['rgb(26, 26, 63)',
        'rgb(35, 26, 49)',
        'rgb(58, 18, 123)']
},
{
    'id': 8,
    'name': 'Alpha Male',
    'beats': [1, 3, 4, 5, 11, 12, 19, 22], 
    // 'losesTo': [0],
    'colors': ['rgb(101, 74, 55)',
        'rgb(81, 65, 53)',
        'rgb(140, 111, 103)']
},
{
    'id': 9,
    'name': 'Ribbon',
    'beats': [1, 2, 8, 12, 14, 15, 16, 19], 
    // 'losesTo': [0],
    'colors': ['rgb(100, 35, 35)',
        'rgb(100, 40, 40)',
        'rgb(164, 78, 78)']
},
{
    'id': 10,
    'name': 'Neutron Star',
    'beats': [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 16, 17, 18, 19], 
    // 'losesTo': [0],
    'colors': ['rgb(96, 132, 132)',
        'rgb(145, 255, 249)',
        'rgb(14, 131, 133)']
},
{
    'id': 11,
    'name': 'Lead',
    'beats': [2, 4, 5, 6, 7, 9, 10, 12, 13, 16, 20], 
    // 'losesTo': [0],
    'colors': ['rgb(60, 66, 94)',
        'rgb(61, 61, 95)',
        'rgb(66, 66, 128)']
},
{
    'id': 12,
    'name': 'Ice',
    'beats': [2, 3, 4, 6, 10, 12, 13, 20], 
    // 'losesTo': [0],
    'colors': ['rgb(35, 71, 100)',
        'rgb(40, 91, 100)',
        'rgb(83, 135, 145)']
},
{
    'id': 13,
    'name': 'Tower',
    'beats': [1, 3, 4, 7, 8, 9, 14, 15, 19], 
    // 'losesTo': [0],
    'colors': ['rgb(37, 34, 33)',
        'rgb(37, 34, 34)',
        'rgb(72, 57, 57)']
},
{
    'id': 14,
    'name': 'Loud Sound',
    'beats': [1, 3, 8, 11, 12, 15, 16, 19, 20], 
    // 'losesTo': [0],
    'colors': ['rgb(35, 35, 100)',
        'rgb(40, 40, 100)',
        'rgb(82, 19, 124)']
},
{
    'id': 15,
    'name': 'Eureka!',
    'beats': [1, 2, 5, 7, 8, 10, 11, 20], 
    // 'losesTo': [0],
    'colors': ['rgb(109, 96, 68)',
        'rgb(124, 94, 42)',
        'rgb(190, 161, 55)']
},
{
    'id': 16,
    'name': 'Layers',
    'beats': [1, 5, 6, 7, 8, 12, 13, 15, 17], 
    // 'losesTo': [0],
    'colors': ['rgb(49, 49, 61)',
        'rgb(37, 37, 57)',
        'rgb(37, 37, 57)']
},
{
    'id': 17,
    'name': 'Pig',
    'beats': [1, 2, 5, 6, 8, 15, 18, 19, 20, 22], 
    // 'losesTo': [0],
    'colors': ['rgb(88, 58, 80)',
        'rgb(67, 22, 55)',
        'rgb(117, 60, 102)']
},
{
    'id': 18,
    'name': 'Bamboo',
    'beats': [1, 3, 6, 7, 9, 11, 12, 13, 15, 16, 19], 
    // 'losesTo': [0],
    'colors': ['rgb(42, 92, 59)',
        'rgb(14, 78, 62)',
        'rgb(12, 105, 81)']
},
{
    'id': 19,
    'name': 'Yum!',
    'beats': [4, 6, 10, 11, 12, 15, 16, 20, 22], 
    // 'losesTo': [0],
    'colors': ['rgb(124, 73, 41)',
        'rgb(206, 96, 50)',
        'rgb(206, 96, 50)']
},
{
    'id': 20,
    'name': 'Yuck.',
    'beats': [1, 2, 3, 5, 7, 8, 9, 13, 16, 18, 22], 
    // 'losesTo': [0],
    'colors': ['rgb(45, 58, 38)',
        'rgb(22, 58, 22)',
        'rgb(96, 147, 52)']
},
{
    'id': 21,
    'name': 'Primes',
    'beats': [2, 3, 5, 7, 11, 13, 17, 19], 
    // 'losesTo': [0]
    'colors': ['rgb(42, 43, 44)',
        'rgb(63, 73, 86)',
        'rgb(63, 73, 86)']
},
{
    'id': 22,
    'name': 'Nothing',
    'beats': [2, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16], 
    // 'losesTo': [0]
    'colors': ['rgb(38, 38, 45)',
        'rgb(201, 201, 201)',
        'rgb(169, 151, 151)']
}
]

// const OBJ_REL = [
// {
//     'id': 1,
//     'name': 'Rock',
//     'beats': [3], 
// 'losesTo': [2],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// {
//     'id': 2,
//     'name': 'Paper',
//     'beats': [1], 
// 'losesTo': [3],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// {
//     'id': 3,
//     'name': 'Scissors',
//     'beats': [2], 
// 'losesTo': [1],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// ]

// const OBJ_REL = [
// {
//     'id': 1,
//     'name': 'Rock',
//     'beats': [3, 4], 
// 'losesTo': [2],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// {
//     'id': 2,
//     'name': 'Paper',
//     'beats': [1], 
// 'losesTo': [3, 4],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// {
//     'id': 3,
//     'name': 'Scissors',
//     'beats': [2], 
// 'losesTo': [1],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// {
//     'id': 4,
//     'name': 'Gum',
//     'beats': [2, 3], 
// 'losesTo': [1, 3],
// 'colors': ['rgb(35, 35, 100)',
// 'rgb(40, 40, 100)',
// 'rgb(40, 40, 100)']
// },
// ]
const objOptions = OBJ_REL.length 
// console.error(`Objects: ${objOptions} -> ${((1 / objOptions) * 100).toFixed(1)}% chance per OBJ`)
let language = 0 // EN


// System Functions
function addScore(player, amount) {
    DIV_SCORES.children[2].innerHTML = bestOf

    DIV_SCORES.children[3].children[0].setAttribute('class', 'player1')
    DIV_SCORES.children[3].children[1].setAttribute('class', 'player2')
    player -= 1
    matchScore[player] += amount

    if (matchScore[player] >= bestOf) {
        matchScore = [0, 0]
        setScore[player]++
        // console.table(setScore)
        if (player == 0) {
            playSound(SFX_GAME[1])
            screenFx(3)
        } else screenFx(4)
        

        if (setScore[0] >= setCap - ((setCap / 100) * 95) || setScore[1] >= setCap - ((setCap / 100) * 95)) {
            console.log((setCap / 100) * 95);
        }


    } else {
        if (matchScore[0] == bestOf - 1) {
        DIV_SCORES.children[3].children[0].setAttribute('class', 'player1' +' shaking')
        } if (matchScore[1] == bestOf - 1) {
        DIV_SCORES.children[3].children[1].setAttribute('class', 'player2' +' shaking')
        }
    }
    // Set
    DIV_SCORES.children[0].children[0].innerHTML = setScore[0]
    DIV_SCORES.children[0].children[1].innerHTML = setScore[1]
    // Match
    DIV_SCORES.children[3].children[0].innerHTML = matchScore[0]
    DIV_SCORES.children[3].children[1].innerHTML = matchScore[1]
}

function resultMatch(cont1, cont2) {
    let cont1Obj = OBJ_REL.find(t => t.id == cont1)
    let cont2Obj = OBJ_REL.find(t => t.id == cont2)

    
    if (cont1Obj.id == cont2Obj.id) {
        screenFx(0)
        DIV_PICKER.children[0].innerHTML = `${cont1Obj.name} <span style="opacity: 60%">x</span> ${cont2Obj.name}, draw!`;
        return undefined
    } else {
        let winnerNo = undefined
        let winnerCont = undefined
        let loserCont = undefined
        
        // console.log('C1 beats:', cont1Obj.beats);
        // console.log('C2 - ID', cont2Obj.id);
        

        if (cont1Obj.beats.find(t => t == cont2Obj.id) != undefined) {
            winnerCont = cont1Obj
            loserCont = cont2Obj
            winnerNo = 1;
            // playSound(SFX_GAME[1])
        } else {
            winnerCont = cont2Obj
            loserCont = cont1Obj
            winnerNo = 2;
        }

        screenFx(winnerNo)
        addScore(winnerNo, 1)
        let plural = winnerCont.name[winnerCont.name.length - 1] == 's' ? ' ' : 's '
        DIV_PICKER.children[0].innerHTML = `${winnerCont.name} <span style="opacity: 60%">beat${plural}</span> ${loserCont.name}!`;
        return winnerCont.id
    }
}

function screenFx(index) {  
    switch (index) {
        case 0:
            // Draw
            document.body.setAttribute("style", 'transition: none; transform: scale(.95); filter: brightness(1.5) contrast(1.1); background-color: rgb(21, 24, 32)');
            setTimeout(() => {
                document.body.setAttribute("style", 'transition: .5s; transform: none; filter: none');
            }, 50);
            break;
        case 1:
            // Win 
            document.body.setAttribute("style", 'transition: none; transform: scale(1.05); filter: brightness(1.5) contrast(1.1); background-color: rgb(9, 81, 39)');
            setTimeout(() => {
                document.body.setAttribute("style", 'transition: .5s; transform: none; filter: none');
            }, 50);
            break;
        case 2:
            // Loss
            document.body.setAttribute("style", 'transition: none; transform: scale(1.05); filter: brightness(1.5) contrast(1.1); background-color: rgb(81, 19, 44)');
            setTimeout(() => {
                document.body.setAttribute("style", 'transition: .5s; transform: none; filter: none');
            }, 50);
            break;
        case 3:
            // Big Win 
            document.body.setAttribute("style", 'transition: none; transform: scale(1.1); filter: brightness(1.8) contrast(1.3); background-color: rgb(9, 81, 39)');
            setTimeout(() => {
                document.body.setAttribute("style", 'transition: .5s ease-in-out; transform: none; filter: none');
            }, 50);
            break;
        case 4:
            // Big Loss
            document.body.setAttribute("style", 'transition: none; transform: scale(1.1); filter: brightness(1.8) contrast(1.3); background-color: rgb(81, 19, 44)');
            setTimeout(() => {
                document.body.setAttribute("style", 'transition: .5s ease-in-out; transform: none; filter: none');
            }, 50);
            break;
    
        default:
            document.body.setAttribute("style", 'transition: 0s; transform: none; filter: none');
            break;
    }
}

function rngGoer() {
    let rngShot = 0;
    setScore = [0, 0]
    matchScore = [0, 0]
    intGoer = setInterval(() => {
        if (setScore[0] >= setCap || setScore[1] >= setCap) {
            clearInterval(intGoer)
            let w = setScore[0] >= setCap ? '<span style="color: rgb(19, 181, 87)">Green</span>' : '<span style="color: rgb(203, 46, 109)">Red</span>'
            DIV_OVER.innerHTML = `<h1>${w} wins!</h1>`
            DIV_OVER.setAttribute('style', 'opacity: 100%; pointer-events: all')
        } else
        BTN_OPTIONS[Math.floor(Math.random() * objOptions)].click()
        
    }, 5);
}

// Setup
let c1 = 0
let c2 = 0
let matchScore = [0, 0]
let setScore = [0, 0]
let bestOf = 3;

let elemCap = 10
elemCap = 0
let elemCounter = objOptions - elemCap
let spoiler = false
for (let i = 0; i < elemCounter; i++) {
    let btn = document.createElement('button')
    btn.setAttribute('class', 'btn') 
    if (spoiler) {
        if (i >= 3) {       
            btn.setAttribute('style', `color: black; border-image: linear-gradient(to bottom, black, black 90%) 1; 
                background-image: linear-gradient(0deg, black, black 100%);
                filter: drop-shadow(0px 0px 10px black);`) 
                
                setTimeout(() => {
                    btn.setAttribute('style', `
                        color: white;
                        border-image: linear-gradient(to bottom, white, ${OBJ_REL[i].colors[1]} 90%) 1; 
                        background-image: linear-gradient(0deg, rgb(20, 20, 50), ${OBJ_REL[i].colors[0]} 100%);
                        filter: drop-shadow(0px 0px 10px ${OBJ_REL[i].colors[0]});  
                        `) 
                    }, 2000);
        } else {
            btn.setAttribute('style', `
                border-image: linear-gradient(to bottom, white, ${OBJ_REL[i].colors[1]} 90%) 1; 
                background-image: linear-gradient(0deg, rgb(20, 20, 50), ${OBJ_REL[i].colors[0]} 100%);
                filter: drop-shadow(0px 0px 10px ${OBJ_REL[i].colors[0]});  
                `) 
            }
    } else {
        btn.setAttribute('style', `
            border-image: linear-gradient(to bottom, white, ${OBJ_REL[i].colors[1]} 90%) 1; 
            background-image: linear-gradient(0deg, rgb(20, 20, 50), ${OBJ_REL[i].colors[0]} 100%);
            filter: drop-shadow(0px 0px 10px ${OBJ_REL[i].colors[0]});  
            `) 
    }
    
    btn.innerHTML = OBJ_REL[i].name

    btn.addEventListener('click', () => {
        let enChoice = Math.floor(Math.random() * objOptions) + 1
        // let enChoice = 2
        // console.log('Choice:     ' + OBJ_REL[i].name, OBJ_REL[i].id)
        // console.log('Enm Choice: ' + OBJ_REL[enChoice - 1].name, OBJ_REL[enChoice - 1].id)

        
        let winner = resultMatch(OBJ_REL[i].id, enChoice)
        if (isFinite(winner)) {
            console.warn(OBJ_REL.find(t => t.id == winner).name)
        } else {
            console.warn('! Draw !')
        }
        // console.table(matchScore)
    })
    BTN_OPTIONS.push(btn)
    let newCon = document.createElement("div")
    let newId = document.createElement("div")
    newId.setAttribute("style", 'display: inline; opacity: 60%')
    newId.setAttribute("class", 'idbtns')
    newId.innerHTML = OBJ_REL[i].id
    newCon.appendChild(newId)
    newCon.appendChild(btn)

    // DIV_PICKER.children[2].innerHTML += `<span style="display: inline; opacity: 60%">${OBJ_REL[i].id}</span>`
    // DIV_PICKER.children[2].appendChild(btn)
    DIV_PICKER.children[2].appendChild(newCon)
}

let setCap = 100
let setCapFinals = (setCap / 100) * 95;
let intGoer = 0


DIV_RULES.children[0].innerHTML = `First to ${setCap}!`
DIV_RULES.children[1].innerHTML = `At a Best of ${bestOf}!`
DIV_OVER.addEventListener('click', () => {
    DIV_OVER.setAttribute('style', 'opacity: 0%; pointer-events: none')
    // rngGoer()
    
}) 

// Debug
function logElemFormatted(upto) {
    for (let i = 1; i <= upto; i++) {
        let currElem = OBJ_REL[i-1]
        console.log(i + ' - ' + currElem.name)
        let beating = '- '
        for (let ii = 0; ii <= currElem.beats.length - 1; ii++) {
            
            beating += (OBJ_REL[currElem.beats[ii] - 1].name)
            if (ii < currElem.beats.length - 1) beating += ', '
        }    
        console.log(beating)
        console.log('')
    }
}
// logElemFormatted(elemCounter)
function logAllElemInfo(upto) {
    console.log('Total elements: ' + objOptions);
    let tgtEf = (22 / 100)
    let tgtBt = (22 / 100)
    console.log('Balanced effectiveness: ' + tgtEf + '% - ' + tgtBt + '/' + objOptions);
    

    for (let i = 1; i <= upto; i++) {
        
        let currElem = OBJ_REL[i-1]
        console.log(i + ' - ' + currElem.name)

        console.log(
            '- Beats ' + currElem.beats.length + ' elements;\n' +
            '- Beaten by ' + (objOptions - 1 - currElem.beats.length) + ' elements;\n' +
            '- Effectiveness: ' + ((objOptions / 100) * currElem.beats.length) + '% - ' + currElem.beats.length + '/' + objOptions 
        )
        console.log('')
    }
}
// logAllElemInfo(4)
function logOneElemInfo(id) {       
    let currElem = OBJ_REL[id - 1]
    console.log(currElem.name + ' (' + ((objOptions / 100) * currElem.beats.length) + '% effectiveness): ')

    let beating = '- Beats: '
    let beated = '- Beaten by: '
    for (let ii = 0; ii <= currElem.beats.length - 1; ii++) {
        beating += (OBJ_REL[currElem.beats[ii] - 1].name)
        if (ii < currElem.beats.length - 1) beating += ', '
    }    
    console.log(beating)
    
    for (let j = 0; j <= objOptions - 1; j++) {
        let currElemCheck = OBJ_REL[j]

        // if (!(currElemCheck.id in currElem.beats) && j + 1 != currElem.id) console.log('-',currElemCheck.name)
        for (let jj = 0; jj < currElem.beats.length; jj++) {

            if (currElemCheck.beats[jj] == currElem.id
                && currElemCheck.beats[jj] != currElem.id - 1) {

                beated += currElemCheck.name + ', '
                if (jj < currElem.beats.length - 1) beated 
                // break
            } 
        }
        
        // beated += (OBJ_REL[currElem.beats[ii] - 1].name)
        // if (ii < currElem.beats.length - 1) beated += ', '
    }    
    beated = beated.slice(0, beated.length - 2)
    console.log(beated)


    console.log('')
}
logOneElemInfo(Math.floor(Math.random() * (objOptions - 1)) + 1)




CV_REL.width    = 1000
CV_REL.height   = 1000
const ctx = CV_REL.getContext('2d')

let circlesAmt = elemCounter
// circlesAmt = 4
let circleBigR = (CV_REL.width / 2) * .975
let circlesR = (circleBigR / (circlesAmt ** (16 / circlesAmt)
))

let circlesPos = [(CV_REL.width) / 2, (CV_REL.height ) / 2]

/**
// function animate() {
//     ctx.clearRect(0, 0, CV_REL.width, CV_REL.height)
//     circlesPos[0] += -pivot * Math.sin(angle)
//     circlesPos[1] += -pivot * Math.cos(angle)
//     angle -= .1
//     ctx.fillStyle = 'black'
//     ctx.strokeStyle = 'green'
//     ctx.lineWidth = 2
//     ctx.beginPath()
//     ctx.arc(circlesPos[0], circlesPos[1], circlesR, 0, Math.PI * 2)
//     ctx.closePath()
//     ctx.fill()
//     ctx.stroke()
//     ctx.beginPath()
//     ctx.strokeStyle = 'gray'
//     ctx.arc(CV_REL.width / 2, CV_REL.height / 2, circleBigR, 0, Math.PI * 2)
//     ctx.closePath()
//     ctx.stroke()
//     requestAnimationFrame(animate)
// }
// animate()
// circlesPos[0] = (circleBigR * 2 - CV_REL.width)
// circlesPos[0] = CV_REL.width + (circleBigR * 2 - CV_REL.width) - circlesR
// circlesPos[0] = (CV_REL.width - (circleBigR * 2)) 
// circlesPos[0] = (CV_REL.width - (circleBigR * 2)) + circlesR * .85
// circlesPos[0] = (CV_REL.width - (circleBigR * 2)) + circlesR * .85
// console.log(circlesPos);
**/
ctx.beginPath()
ctx.strokeStyle = 'gray'
// ctx.arc(CV_REL.width / 2, CV_REL.height / 2, circleBigR, 0, Math.PI * 2)
ctx.closePath()
ctx.stroke()
ctx.save()

circlesPos = [0, 0]
circlesPos[1] -= circleBigR - circlesR
ctx.font = circlesR / 3 + 'px monospace'
ctx.fillStyle = 'white'
ctx.strokeStyle = 'black'
ctx.textBaseline = 'middle'

ctx.translate(CV_REL.width / 2, CV_REL.height / 2)
for (let i = 0; i < circlesAmt; i++) {
    cvArrows(i)
    cvBalls(i)
}
// Download Chart
// console.log(CV_REL.toDataURL('logo/png'));


function cvBalls(i) {
    ctx.fillStyle = OBJ_REL[i].colors[2]
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(circlesPos[0], circlesPos[1], circlesR, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    ctx.save()
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.translate(-(CV_REL.width / 2), -(CV_REL.height / 2))
    ctx.translate(((
        CV_REL.width / 2)),
        circlesR + (CV_REL.width - circleBigR * 2) - 10)
        
    for (let ii = 1; ii <= i; ii++) {
        ctx.rotate(-(Math.PI / circlesAmt * 2))
    }
    // ctx.strokeText(OBJ_REL[i].name,
        // circlesPos[0] - ctx.measureText(OBJ_REL[i].name).width / 2,
        // circlesPos[1], circlesR * 1.8)
        // - ctx.measureText(OBJ_REL[i].name).width / 2, 0, circlesR * 1.8)
    ctx.fillText(OBJ_REL[i].name,
        // circlesPos[0] - ctx.measureText(OBJ_REL[i].name).width / 2,
        // circlesPos[1], circlesR * 1.8)
        - ctx.measureText(OBJ_REL[i].name).width / 2, 0)
    
    ctx.font = circlesR / 4 + 'px monospace'
    ctx.fillStyle = 'white'
    ctx.fillText(OBJ_REL[i].id,
        - ctx.measureText(OBJ_REL[i].id).width / 2, - circlesR / 3)
    ctx.restore()
    ctx.rotate(Math.PI / circlesAmt * 2)
}

function cvArrows(i) {
    
    let beats = OBJ_REL[i].beats.slice(0, circlesAmt - 1)
    let startBallXY = [circlesPos[0], circlesPos[1]]
    ctx.strokeStyle = OBJ_REL[i].colors[2]
    // ctx.strokeStyle = 'gray'
    ctx.lineWidth = 4
    ctx.shadowColor = 2
    ctx.shadowColor = 'black'
    ctx.beginPath()
    
    
    for (let ii = 0; ii < beats.length; ii++) {
        ctx.moveTo(startBallXY[0], startBallXY[1] + circlesR)
        ctx.save()
        let idDiff =  OBJ_REL[i].id - beats[ii]
        if (i == 22) {
            console.log(idDiff)
        }

        let turnBack = idDiff < 1 ? true : false
        if (turnBack) {
            idDiff *= -1

            for (let iii = 0; iii < idDiff; iii++) {
                ctx.rotate(-(Math.PI / circlesAmt * 2))
                // ctx.rotate(Math.PI / circlesAmt * 2)  
            }    

        } else {
            for (let iii = 0; iii <= idDiff; iii++) {
                ctx.rotate(Math.PI / circlesAmt * 2)
                // ctx.rotate(-(Math.PI / circlesAmt * 2))  
            }    
        }

        ctx.lineTo(startBallXY[0], startBallXY[1] + circlesR)
        ctx.arc(startBallXY[0], startBallXY[1] + circlesR, circlesR / 14, 0, Math.PI * 2)

        ctx.restore()        
    }
    ctx.stroke()
    ctx.closePath()    
}

function playSound(sound) {
    sound().play()
}