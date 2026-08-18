const BOXES = document.getElementsByName('box')
const TURN = document.getElementById('turn')
const SCORES = [document.getElementById('scorea'), document.getElementById('scoreb')]
let turn = 0
let table = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]
let noplay = false
let score = [0, 0]

let botturn = false
let botturnno = null
for (let i = 0; i < BOXES.length; i++) {
    BOXES[i].addEventListener('click', () => {
        if (table[i] == 0) {
            BOXES[i].innerHTML = turn % 2 == 0 ? 'X' : 'O'
            BOXES[i].setAttribute('class', 'box fill')
            table[i] = turn % 2 == 0 ? 1 : 2
            TURN.innerHTML = turn % 2 == 0 ? 'O' : 'X'
            turn++
        }


        if (
            table[0] == 1 && table[1] == 1 && table[2] == 1 ||
            table[3] == 1 && table[4] == 1 && table[5] == 1 ||
            table[6] == 1 && table[7] == 1 && table[8] == 1 ||

            table[0] == 1 && table[3] == 1 && table[6] == 1 ||
            table[1] == 1 && table[4] == 1 && table[7] == 1 ||
            table[2] == 1 && table[5] == 1 && table[8] == 1 ||

            table[0] == 1 && table[4] == 1 && table[8] == 1 ||
            table[2] == 1 && table[4] == 1 && table[6] == 1 

        ) {
            TURN.innerHTML = 'X ganhou!'
            score[0]++
            noplay = true
            setTimeout(() => {
                reset()
            }, 1000);

        } else if ( 
            table[0] == 2 && table[1] == 2 && table[2] == 2 ||
            table[3] == 2 && table[4] == 2 && table[5] == 2 ||
            table[6] == 2 && table[7] == 2 && table[8] == 2 ||

            table[0] == 2 && table[3] == 2 && table[6] == 2 ||
            table[1] == 2 && table[4] == 2 && table[7] == 2 ||
            table[2] == 2 && table[5] == 2 && table[8] == 2 ||

            table[0] == 2 && table[4] == 2 && table[8] == 2 ||
            table[2] == 2 && table[4] == 2 && table[6] == 2 
        ) {
            TURN.innerHTML = 'O ganhou!'
            score[1]++
            noplay = true
            setTimeout(() => {
                reset()
            }, 1000);

        } else if ( 
            table[0] != 0 && table[1] != 0 && table[2] != 0 &&
            table[3] != 0 && table[4] != 0 && table[5] != 0 && 
            table[6] != 0 && table[7] != 0 && table[8] != 0 
        ) {
            TURN.innerHTML = 'Velha'
            noplay = true
            setTimeout(() => {
                reset()
            }, 1000);

        }


        if (turn % 2 != 0 && noplay == false) {
        setTimeout(() => {
                
                let botopts = []
                for (let ii = 0; ii < table.length; ii++) {
                    if (table[ii] == 0) {
                        botopts.push(ii)
                    }
                } 
                console.log(botopts)
                bo = Math.floor(Math.random() * (botopts.length))
                console.log(botopts[bo]);
                
                BOXES[botopts[bo]].click()
            }, 150);
        }
    })
    
}


function reset() {
    SCORES[0].innerHTML = score[0]
    SCORES[1].innerHTML = score[1]
    turn = 0
    botturn = null
    table = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    BOXES.forEach(e => {
        e.innerHTML = ''
        e.setAttribute('class', 'box')
    });
    TURN.innerHTML = 'X'
    noplay = false
}