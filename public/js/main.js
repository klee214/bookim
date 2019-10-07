
const closing = ()=>{
    const logIn = document.querySelector('#logIn'); 
    const pop = document.querySelector('#popup'); 
    logIn.style.display = 'none';
    logIn.style.visibility = 'hidden';
    pop.style.display = 'none';
    pop.style.visibility = 'hidden';
}

const log = ()=>{
    const logIn = document.querySelector('#logIn');
    const pop = document.querySelector('#popup'); 
    logIn.style.visibility = 'visible';
    logIn.style.display = 'block';
    pop.style.visibility = 'visible';
    pop.style.display = 'block';
}
