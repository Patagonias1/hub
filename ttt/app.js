const BOXES = document.getElementsByName('box')
const SCORE = document.getElementById('score')
let turn = 0
let table = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

for (let i = 0; i < BOXES.length; i++) {
    BOXES[i].addEventListener('click', () => {
        BOXES[i].innerHTML = turn % 2 == 0 ? 'X' : 'O'
        table[i] = turn % 2 == 0 ? 1 : 2
        SCORE.innerHTML = turn % 2 == 0 ? 'O' : 'X'
        turn++


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
            SCORE.innerHTML = 'X ganhou!'
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
            SCORE.innerHTML = 'O ganhou!'
            setTimeout(() => {
                reset()
            }, 1000);
        } else if ( 
            table[0] != 0 && table[1] != 0 && table[2] != 0 &&
            table[3] != 0 && table[4] != 0 && table[5] != 0 && 
            table[6] != 0 && table[7] != 0 && table[8] != 0 
        ) {
            SCORE.innerHTML = 'Velha'
            setTimeout(() => {
                reset()
            }, 1000);
        }
    })
    
}


function reset() {
    table = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    BOXES.forEach(e => {
        e.innerHTML = ''
    });
    SCORE.innerHTML = 'X'
}