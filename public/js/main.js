
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

const formVal = ()=>{
    clearerrors();
    return loginVal()
}

function clearerrors() {
    const email =document.querySelector('#email')
    email.setAttribute('style','background-color: white; border-color: grey;')
    const password =document.querySelector('#password')
    password.setAttribute('style','background-color: white;border-color: grey;')

    document.querySelector("#emailError").innerHTML = "";
    document.querySelector("#passError").innerHTML = "";
 }

const loginVal = ()=>{
    const emailVal = document.log_id.email.value.trim();
    const passVal = document.log_id.password.value.trim();
    let count = 0

    const emailFomr = /[a-zA-Z0-9].*[@].*[.].*[a-z]/
    if(!emailFomr.test(emailVal)){
        const emailError = document.querySelector('#emailError')
        const email =document.querySelector('#email')
        email.setAttribute('style','background-color: rgba(255, 96, 96, 0.1); border-color: rgba(228, 62, 62, 0.8);')
        emailError.innerHTML = "<p style='color: red;'>invalid email! (eg. abc@def.xyz)</p>"
        count++
    }

    if(passVal.length == 0){
        const passError = document.querySelector('#passError')
        const password =document.querySelector('#password')
        password.setAttribute('style','background-color: rgba(255, 96, 96, 0.1);border-color: rgba(228, 62, 62, 0.8);')
        passError.innerHTML = "<p style='color: red;'>password is required!</p>"
        count++
    }

    if(count > 0){
        return false
    }
    return true
}