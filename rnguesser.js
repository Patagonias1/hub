let i = 1  
let m = 0  
let n = 0  

  
const INP = document.getElementById('rnginput')
function s() { 
// function s(t) { 
    t = INP.value
    
    n = Math.floor(Math.random() * t) 

    while (m != n) { 

        m = window.prompt("Adivinhe o número (até " + t + ")") 

        if (m == null) { 

            window.alert("Perdeu!") 

            break; 

        } 

        else if (m > n) { 

            window.alert("É menor que " + m + ". \n(Tentativa " + i + ")") 

        } else if ( m < n) { 

            window.alert("É maior que " + m + ". \n(Tentativa " + i + ")") 

        } 

        i++ 

    } 

    if (m == n) { 

        window.alert("Acertou! (" + n + ") em " + i + " tentativa(s).") 

    } 

    i = 1; 

    m = 0; 

} 

