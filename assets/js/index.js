let openLanguage = document.querySelector('header .language');
let languageBg = document.querySelector('.language-bg');
let main = document.querySelector('main .middle');
let mainBg = document.querySelector('main .main_bgc');
let burger = document.querySelector('header .burger');
let mobileHeader = document.querySelector('.mobile-header-item');
let mobileHeaderMenu = document.querySelector('.mobile-header-menu');
let mobileHeaderLang = document.querySelector('.mobile-header-language');
let searchInp = document.querySelector('.form-search-input');
let searchLists = document.querySelectorAll('.search .search-list');
let noMatches = document.querySelector('.no-matches');
let filterItem = document.getElementById("myUL");

openLanguage.addEventListener('click', () => {
    languageBg.classList.toggle('hidden');
});

main.addEventListener('click', () => {
    languageBg.classList.add('hidden');
});
mainBg.addEventListener('click', () => {
    languageBg.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target == languageBg) {
        languageBg.classList.add('hidden');
    }
})

burger.addEventListener('click', () => {
    burger.classList.toggle('rotateBurger');
    mobileHeader.classList.toggle('openMobileHeader')
});

mobileHeaderLang.addEventListener('click', () => {
    mobileHeaderLang.children[1].classList.toggle = 'hidden';
    mobileHeaderLang.children[1].style.display = 'block';
    mobileHeaderMenu.children[1].style.display = 'none';
});

mobileHeaderMenu.addEventListener('click', () => {
    mobileHeaderLang.children[1].style.display = 'none';
    mobileHeaderMenu.children[1].style.display = 'block';
});
// End menu mobile


// Start Filter search

function myFunction() {
  let input, filter, filterList, filterLists, i, txtValue, clear;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  filterList = filterItem.getElementsByTagName("li");
  filterLists = document.querySelectorAll(".filters");
  clear = document.querySelector('.clear-filter');
  clear.classList.remove('hidden');
  if(input.value.length >= 3) {
    for (i = 0; i < filterList.length; i++) {
      list = filterList[i];
      txtValue = list.textContent || list.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        list.style.display = "flex";
      } else {
        list.style.display = "none";
        
      }
  }
  noMatches.classList.remove('hidden');
  filterItem.classList.remove('hidden');
  }else {
    for (i = 0; i < filterList.length; i++) {
      list = filterList[i];
      list.style.display = "none";
  }
  noMatches.classList.add('hidden')
  }

  filterLists.forEach(elem => {
    elem.addEventListener('click', () => {
      input.value = elem.textContent
      filterItem.classList.add('hidden')
      noMatches.classList.add('hidden')
    })
  });

  clear.addEventListener('click', () => {
    filterItem.classList.add('hidden');
    noMatches.classList.add('hidden');
    input.value = '';
    clear.classList.add('hidden')
  });

  if(input.value == '') {
    clear.classList.add('hidden');
  }
}

// End Filter search

// Start Form
let form = document.getElementById('form');
let userName = document.getElementById('userName');
let userPhone = document.getElementById('userPhone');
let userEmail = document.getElementById('userEmail');
let message = document.getElementById('message');
let submitBtn = document.getElementById('submitForm')


submitBtn.addEventListener('click', () => {
  checkInputs()

  let successName = userName.parentElement.classList;
  let successEmail = userEmail.parentElement.classList;
  let successPass = userPhone.parentElement.classList;
  let successMessage = message.parentElement.classList;

  if(successName == 'success' && successEmail == 'success' && successPass == 'success' && successMessage == 'success') {
    submitBtn.type = 'submit'
  }
});

function checkInputs() {
  const userNameValue = userName.value.trim();
  const userEmailValue = userEmail.value.trim();
  const userPhoneValue = userPhone.value.trim();
  const messageValue = message.value.trim();


  if(userNameValue === '' || userNameValue.length <= 2) {
    setErrorFor(userName, "Enter your name")
  } else {
    setSuccesFor(userName)
    userName.parentElement.classList.add('success')
  }

  if(userEmailValue === '') {
    setErrorFor(userEmail, "Enter your email")
  }
  else if(!isEmail(userEmailValue)) {
    setErrorFor(userEmail, 'Invalid email')
  }
  else {
    setSuccesFor(userEmail)
    userEmail.parentElement.classList.add('success')
  }

  if(userPhoneValue === '' || userPhoneValue.length < 4) {
    setErrorFor(userPhone, "Enter your number")
  } else {
    setSuccesFor(userPhone)
    userPhone.parentElement.classList.add('success')
  }
  
  if(messageValue === '') {
    setErrorFor(message, "Leave your review")
  }
  else if(messageValue.length < 20) {
    setErrorFor(message, "enter at least 20 characters")
  }
  else {
    setSuccesFor(message)
    message.parentElement.classList.add('success')
  }
}

function setErrorFor(input, message) {
let small = input.parentElement.parentElement.children[1]

    input.classList.add('inputError');

    small.innerText = message
}

function setSuccesFor(input) {
let small = input.parentElement.parentElement.children[1]
    // input.classList.remove('inputError');
    // input.classList.add('inputSucces');
    small.innerText = ''
} 

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// End Form


// Start carousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    nav:true,
    dots:false,
    touchDrag: true,
    mouseDrag:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
    })
    
    let next = document.querySelector('.owl-next');
    let prev = document.querySelector('.owl-prev');  
    
    function abs() {
        prev.classList.add('btnHide')
    }
    
    abs()
    
    next.addEventListener('click', () => {
        prev.classList.remove('btnHide')
    })





    