
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

const footerNave=()=>{
    const footer = document.querySelector('footer');
    const itself = document.querySelector('#footerNav');
    const close = document.querySelector('#footerClose');
    itself.style.visibility='hidden';
    itself.style.display='none';
    footer.style.visibility = 'visible';
    footer.style.display = 'block';
    close.style.visibility = 'visible';
    close.style.display = 'block';
}

const footerClosing=()=>{
    const footer = document.querySelector('footer');
    const itself = document.querySelector('#footerClose');
    const open = document.querySelector('#footerNav');

    open.style.visibility = 'visible';
    open.style.display = 'block';
    itself.style.visibility='hidden';
    itself.style.display='none';
    footer.style.visibility = 'hidden';
    footer.style.display = 'none';
}