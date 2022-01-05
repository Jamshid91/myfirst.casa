let openLanguage = document.querySelector('header .language');
let languageBg = document.querySelector('.language-bg');
let main = document.querySelector('main .middle');
let mainBg = document.querySelector('main .main_bgc');
let burger = document.querySelector('header .burger');
let mobileHeader = document.querySelector('.mobile-header-item');
let mobileHeaderMenu = document.querySelector('.mobile-header-menu');
let mobileHeaderLang = document.querySelector('.mobile-header-language');
let next = document.querySelector('.carousel-wrapper .next');
let prev = document.querySelector('.carousel-wrapper .prev');
let searchInp = document.querySelector('.form-search-input');
let clickedLists = document.querySelectorAll('.search-item li');
let searchLists = document.querySelectorAll('.search .search-list');
let noMatches = document.querySelector('.no-matches');
let carouselLists = document.querySelectorAll('.carousel-list');

openLanguage.addEventListener('click', () => {
    languageBg.classList.toggle('hidden');
});

main.addEventListener('click', () => {
    languageBg.classList.add('hidden');
    noMatches.classList.add('hidden');
    searchInp.classList.remove('rounded-b-none');
    searchLists.forEach(elem => {
        let elemPar = elem.parentElement.parentElement.parentElement
        elemPar.classList.add('hidden');
    });
});
mainBg.addEventListener('click', () => {
    languageBg.classList.add('hidden');
    noMatches.classList.add('hidden');
    searchInp.classList.remove('rounded-b-none');
    searchLists.forEach(elem => {
        let elemPar = elem.parentElement.parentElement.parentElement
        elemPar.classList.add('hidden');
    });
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

    searchInp.addEventListener('input', () => {
        searchInp.classList.add('rounded-b-none');
        let val = searchInp.value.trim();
        if(val != '') {
            searchLists.forEach(elem => {
                let elemPar = elem.parentElement.parentElement.parentElement

                if(elem.textContent.search(val) == -1) {
                    elemPar.classList.add('hidden');
                    elem.innerHTML = elem.innerText;
                } else {
                    elemPar.classList.remove('hidden');
                    let str = elem.innerText;
                    elem.innerHTML = insertMark(str, elem.textContent.search(val), val.length)
                    
                    noMatches.classList.remove('hidden')
                }

                elemPar.addEventListener('click', () => {
                    searchInp.value = elem.innerText;
                    searchLists.forEach(elem1 => {
                        let elemPar1 = elem1.parentElement.parentElement.parentElement
                        elemPar1.classList.add('hidden');
                    })
                })
            });
        } else {
            searchLists.forEach(elem => {
                let elemPar = elem.parentElement.parentElement.parentElement
                elemPar.classList.add('hidden');
                elem.innerHTML = elem.innerText;
            });
            searchInp.classList.remove('rounded-b-none');
        }

        if(searchInp.value == '') {
            noMatches.classList.add('hidden');
            searchInp.classList.remove('rounded-b-none');
        }
    });

    function insertMark(string,pos,len) {
        return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len)
    } 

// End Filter search


// Start Carouel
class Carouel {
    constructor({
        main, 
        wrap, 
        next, 
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.carousels = document.querySelector(wrap).children;
        this.position = position;
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.carousels.length - this.slidesToShow
        }
        this.responsive = responsive;
    }

    init() {
        this.addMyClass();
        this.addStyle();
        if(this.next && this.prev) {
            this.controlSlider();
        }

        if(this.responsive) {
            this.responseInit();
        }
    }

     addMyClass() {
         this.main.classList.add('main');
         this.wrap.classList.add('wrap');
        for(const item of this.carousels) {
            item.classList.add('my-carousel-list')
        }
    }

    addStyle() {
        let style = document.getElementById('carousel-style');
            style = document.createElement('style');
            style.id = 'carousel-style';

        style.textContent = `
            .main {
                
            }

            .wrap {
                display: flex;
                transition: transform .5s;
                will-change: transform;
            }

            .my-carousel-list {
                flex: 0 0 ${this.options.widthSlide}%;
            }
        `;
        document.head.appendChild(style);
    }

    controlSlider() {
        this.next.addEventListener('click', this.nextSlider.bind(this));
        this.prev.addEventListener('click', this.prevSlider.bind(this));
    }


    nextSlider() {
        prev.style.display = 'flex'
        if(this.options.infinity || this.options.position < this.options.maxPosition) {
        ++this.options.position
        if(this.options.position >= this.options.maxPosition) {
            // this.options.position = 0
            next.style.display = 'none'
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    prevSlider() {
        next.style.display = 'flex'
        if(this.options.infinity || this.options.position > 0) {
        --this.options.position
        if(this.options.position <= 0) {
            // this.options.position = this.options.maxPosition
            prev.style.display = 'none'
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allRespone = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allRespone);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;

            if(widthWindow < maxResponse) {
                for(let i = 0; i < allRespone.length; i++) {
                    if(widthWindow < allRespone[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    } 
                }
            } 
            else {
                this.slidesToShow = slidesToShowDefault
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        }

        checkResponse();

        window.addEventListener('resize', checkResponse)
    }
}

const carousel = new Carouel({
    main: '.carousel-wrapper',
    wrap: '.carousel-item',
    next: '.next',
    prev: '.prev',
    slidesToShow: 3,
    infinity: true,
    responsive: [
        // {
        // breakpoint: 1024,
        // slidesToShow: 3
        // },
        {
        breakpoint: 769,
        slidesToShow: 2
        },
        {
        breakpoint: 576,
        slidesToShow: 1
        }
]
});
carousel.init();

if (window.matchMedia("(max-width: 576px)").matches) {
    carouselLists.forEach(card => {
        card.style.maxWidth = '300px'
    });
}
// End Carousel

// Start Form
let form = document.getElementById('form');
let userName = document.getElementById('userName');
let userPhone = document.getElementById('userPhone');
let userEmail = document.getElementById('userEmail');
let message = document.getElementById('message');
let submitBtn = document.getElementById('submitForm')


submitBtn.addEventListener('click', () => {
  checkInputs()

  let successName = userName.parentElement.children[1].classList;
  let successEmail = userEmail.parentElement.children[1].classList;
  let successPass = userPhone.parentElement.children[1].classList;
  let successMessage = message.parentElement.children[1].classList;

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
    userName.parentElement.children[1].classList.add('success')
  }

  if(userEmailValue === '') {
    setErrorFor(userEmail, "Enter your email")
  }
  else if(!isEmail(userEmailValue)) {
    setErrorFor(userEmail, 'Invalid email')
  }
  else {
    setSuccesFor(userEmail)
    userEmail.parentElement.children[1].classList.add('success')
  }

  if(userPhoneValue === '' || userPhoneValue.length < 4) {
    setErrorFor(userPhone, "Enter your number")
  } else {
    setSuccesFor(userPhone)
    userPhone.parentElement.children[1].classList.add('success')
  }
  
  if(messageValue === '') {
    setErrorFor(message, "Leave your review")
  }
  else if(messageValue.length < 20) {
    setErrorFor(message, "enter at least 20 characters")
  }
  else {
    setSuccesFor(message)
    message.parentElement.children[1].classList.add('success')
  }
}

function setErrorFor(input, message) {
let small = input.parentElement.children[1]

    input.classList.add('inputError');

    small.innerText = message
}

function setSuccesFor(input) {
let small = input.parentElement.children[1]
    input.classList.remove('inputError');
    input.classList.add('inputSucces');

    small.innerText = ''

} 

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// End Form
