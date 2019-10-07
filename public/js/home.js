let guestClickCount = 0;

const guestButton = ()=>{
    if(guestClickCount % 2 != 1){
        const guestDrop = document.querySelector('#guestDrop');
        const guest = document.querySelector('#guest');
        guest.style.backgroundColor =  'rgb(228, 222, 222)';
        guestDrop.style.display = 'block';
        guestDrop.style.visibility = 'visible';
    }
    else{
        const guestDrop = document.querySelector('#guestDrop');
        const guest = document.querySelector('#guest');
        guest.style.backgroundColor = 'white';
        guestDrop.style.display = 'none';
        guestDrop.style.visibility = 'hidden';
        

        guestNoChange();
    }
    guestClickCount++;  
}

const guestNoChange = ()=>{
    const adult = document.home.adultNo.value;
    const child = document.home.childNo.value;
    let guestNo = document.querySelector('#guest');
    if(adult != 0 || child != 0)
        guestNo.value = "Adult(s): " + adult + ", Child(ren): " + child; 
    else
        guestNo.value = "At least one person!"
}


