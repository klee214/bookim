// const regVal = ()=>{
//     clearSignup();
//     return signupVal()
// }

// function clearSignup() {
    
//     const email = document.querySelector('#regemail')
//     const first = document.querySelector('#fname')
//     const last = document.querySelector('#lname')
//     const pass = document.querySelector('#regpassword')

//     email.setAttribute('style','background-color: whitesmoke; border-color: grey;')
//     first.setAttribute('style','background-color: whitesmoke; border-color: grey;')
//     last.setAttribute('style','background-color: whitesmoke; border-color: grey;')
//     pass.setAttribute('style','background-color: whitesmoke;border-color: grey;')

//     document.querySelector("#errMess").innerHTML = "";
//  }

//  const signupVal = ()=>{
//     const emailVal = document.registerForm.regemail.value.trim()
//     const fname = document.registerForm.fname.value.trim()
//     const lname = document.registerForm.lname.value.trim()
//     const password = document.registerForm.regpassword.value.trim()

//     const email = document.querySelector('#regemail')
//     const first = document.querySelector('#fname')
//     const last = document.querySelector('#lname')
//     const pass = document.querySelector('#regpassword')

//     const emailFomr = /[a-z0-9].*[@].*[.].*[a-z]/i
//     const nameForm = /[^0-9\`\~\!\@\#\$\%\^\&\*\(\)\_\-\|\+\=\{\}\[\]\:\'\;\"\<\,\.\>\/\?\\]/
//     const passForm = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*?"

//     if(!emailFomr.test(emailVal) || emailVal.length == 0 ){
//         email.setAttribute('style','background-color: rgba(255, 96, 96, 0.1); border-color: rgba(228, 62, 62, 0.8);')
//     }

//     if(!nameForm.test(fname) || fname.length == 0){
//         first.setAttribute('style','background-color: rgba(255, 96, 96, 0.1); border-color: rgba(228, 62, 62, 0.8);')
//     }

//     if(!nameForm.test(lname) || lname.length == 0){
//         last.setAttribute('style','background-color: rgba(255, 96, 96, 0.1); border-color: rgba(228, 62, 62, 0.8);')
//     }

//     let count = 0;
//     if(!password.length==0){
//         for(let i = 0; i < passForm.length; i++){
//             if(password.indexOf(passForm[i]) != -1){
//                 break;
//             }else{
//                 count++;
//             }
//         }

//         if(count > 0){
//             pass.setAttribute('style','background-color: rgba(255, 96, 96, 0.1); border-color: rgba(228, 62, 62, 0.8);')
//         }

//     }else{
//         pass.setAttribute('style','background-color: rgba(255, 96, 96, 0.1); border-color: rgba(228, 62, 62, 0.8);')
//     }
//  }