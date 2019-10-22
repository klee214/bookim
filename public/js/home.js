let guestClickCount = 0;
let myFunctionCount = 0;

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
    if(adult != 0 || child != 0){
        if(adult <= 5 && child <= 5){
            guestNo.value = "Adult(s): " + adult + ", Child(ren): " + child; 
        }else{
            guestNo.value = "No more than 5 each!";
        }
    }
    else
        guestNo.value = "At least one person!"
}
const myFunction = ()=> {
  document.getElementById("myDropdown").classList.toggle("show");
  const dropbtn = document.querySelector('.dropbtn')

  myFunctionCount++
  
  if(myFunctionCount % 2 == 1 ){
    dropbtn.style.backgroundColor = "rgb(216, 207, 207)";
  }else{
    dropbtn.style.backgroundColor = "white"
  }
}

const filterFunction = () => {
  let input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "block";
    } else {
      a[i].style.display = "none";
    }
  }
}


