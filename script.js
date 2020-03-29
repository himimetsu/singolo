window.onload = () => { 
  document.addEventListener('click', selectSection)
  document.addEventListener('click', tabSwitching)
  document.addEventListener('click', createFrame)
  document.addEventListener('click', switched)
  document.addEventListener('transitionend', checkEndAnimated)
  document.addEventListener('scroll', changeSelectSection)
  document.addEventListener('click', closeBurgerMenu)
  document.addEventListener('click', onDisplayPhone)
  callModalWindow()
  mixingContentTabs()
  slider()
  smoothScroll()
  burgerMenu()
}

const selectSection = (e) => {
  if (e.target.parentNode.classList == 'nav__item') {
    const checkItem = document.getElementsByClassName('selectedSection')
    if (checkItem.length > 0) {
      for (let i = 0; i < checkItem.length; i++) {
        checkItem[i].classList.remove('selectedSection')
      }
    }
    e.target.parentNode.classList.add('selectedSection')
  }
}

const tabSwitching = (e) => {
  if (e.target.classList[0] == 'portfolio__tab') {

    const tabSection = document.getElementsByClassName('tab-section')

    const selectedTab = document.getElementsByClassName('portfolio-selected-tab')

    if (selectedTab.length > 0) {
      for (let i = 0; i < selectedTab.length; i++) {selectedTab[i].classList.remove('portfolio-selected-tab')}

      for (let i = 0; i < tabSection.length; i++) {tabSection[i].classList.remove('show')}
    }

    e.target.classList.add('portfolio-selected-tab')

    switch (e.target.classList[1]) {
      case 'first-tab':
        tabSection[0].classList.add('show')
        break;
      case 'second-tab':
        tabSection[1].classList.add('show')
        break;
      case 'third-tab':
        tabSection[2].classList.add('show')
        break;
      case 'fourth-tab':
        tabSection[3].classList.add('show')
        break;
    }
  }
}

const createFrame = (e) => {
  const frame = document.getElementsByClassName('frame')

  const pictures = document.getElementsByTagName('img')

  if (e.target.parentNode.classList[0] == 'portfolio-item__picture') {
    if (frame.length > 0) {
      for (let i = 0; i < pictures.length; i++) {pictures[i].classList.remove('frame')}
    }
    e.target.classList.add('frame')
  }
}

const switched = (e) => {
  switch (e.target.classList[0]) {
    case 'vertical-switched':
      document.getElementsByClassName('ver-display')[0].classList.toggle('hide')
      break;
    case 'horizontal-switched':
      document.getElementsByClassName('hor-display')[0].classList.toggle('hide')
      break;
  }
}

const checkEndAnimated = (e) => {
  console.log(e)
}

const slider = () => {
  const allImages = document.getElementsByTagName('img')
  const prevSlideButton = allImages[1]
  const nextSlideButton = allImages[5]
  const slides = document.getElementsByClassName('slide_single')
  const slider = document.getElementsByClassName('content-slider')

  let current = 0

  prevSlideButton.onclick = () => {
    current--
    if (current < 0) {
      slides[0].classList.add('right')
      setTimeout (() => {
        current = slides.length - 1
        slides[current].classList.remove('right')
        slides[current].classList.remove('left')
      }, 600)
    } else {
      slides[current + 1].classList.add('right')
      slides[current].classList.remove('right')
      slides[current].classList.remove('left')
    }
    ChangeBG()
  }

  nextSlideButton.onclick = () => {
    current++
    if (current > slides.length - 1) {
      slides[slides.length - 1].classList.add('right')
      setTimeout(() => {
        current = 0
        slides[current].classList.remove('right')
        slides[current].classList.remove('left')
      }, 600)
    } else {
      slides[current - 1].classList.add('right')
      slides[current].classList.remove('right')
      slides[current].classList.remove('left')
    }
    ChangeBG()
  }

  const ChangeBG = () => {
    current == 1 ? slider[0].classList.add('blue') : slider[0].classList.remove('blue')
  }
}

const mixingContentTabs = () => {
  const firstTab = document.querySelector('.portfolio__show-case')
  let allPictures = firstTab.getElementsByClassName('portfolio-item__picture')
  allPictures = Array.from(allPictures)

  let portfolios = document.getElementsByClassName('portfolio__show-case')
  portfolios = Array.from(portfolios)

  const mix = (num) => {
    let currentTabItems = portfolios[num].getElementsByClassName('portfolio-item__picture')

    const shuffle = () => {
      let currentIndex = allPictures.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = allPictures[currentIndex];
        allPictures[currentIndex] = allPictures[randomIndex];
        allPictures[randomIndex] = temporaryValue;
      }
      return allPictures;
    }

    shuffle(allPictures)

    if (currentTabItems.length) {
      for (let i = allPictures.length - 1; i > -1; i--) { currentTabItems[i].remove() }

      for (let i = 0; i < allPictures.length; i++) {
        portfolios[num].appendChild(allPictures[i])
      }
    } else {
      for (let i = 0; i < allPictures.length; i++) {
        portfolios[num].appendChild(allPictures[i])
      }
    }
  }

  let tabs = document.getElementsByClassName('portfolio__tab')
  tabs = Array.from(tabs)

  tabs.map((item) => {
    item.onclick = (e) => {
      switch (e.target.classList[1]) {
        case 'first-tab':
          mix(0)
          break;
        case 'second-tab':
          mix(1)
          break;
        case 'third-tab':
          mix(2)
          break;
        case 'fourth-tab':
          mix(3)
          break;
      }
    }
  })
}

const changeSelectSection = () => {
  let topHeader = document.getElementsByClassName('header')[0].offsetHeight
  let topServices = document.getElementsByClassName('our-services')[0].offsetTop
  let topSlider = document.getElementsByClassName('content-slider')[0].offsetHeight
  let topPortfolio = document.getElementsByClassName('portfolio')[0].offsetTop
  let topAbout = document.getElementsByClassName('about-us')[0].offsetTop
  let topGet = document.getElementsByClassName('getQuote')[0].offsetTop

  let currentPos
  let scrollY = window.pageYOffset

  if (scrollY < topSlider - 1) {
    currentPos = 'home'
  } else if (scrollY > topServices - topHeader - 1 && scrollY < topPortfolio - topHeader - 2) {
    currentPos = 'services'
  } else if (scrollY > topPortfolio - topHeader - 1 && scrollY < topAbout - topHeader) {
    currentPos = 'portfolio'
  } else if (scrollY > topPortfolio && scrollY < topGet - 95) {
    currentPos = 'about'
  } else if (scrollY > topGet - 95) {
    currentPos = 'contact'
  }

  let allLinksNavbar = document.getElementsByClassName('nav__item')
  allLinksNavbar = Array.from(allLinksNavbar)

  const changeNavbar = (num) => {
    const selectedSection = document.getElementsByClassName('selectedSection')
    if (selectedSection.length > 0) {
      for (let i = 0; i < selectedSection.length; i++) {
        selectedSection[i].classList.remove('selectedSection')
      }
    }
    allLinksNavbar[num].classList.add('selectedSection')
  }

  switch (currentPos) {
    case 'home':
      changeNavbar(0)
      break;
    case 'services':
      changeNavbar(1)
      break;
    case 'portfolio':
      changeNavbar(2)
      break;
    case 'about':
      changeNavbar(3)
      break;
    case 'contact':
      changeNavbar(4)
      break;
  }
}

const callModalWindow = () => {
  const sendFormButton = document.getElementsByClassName('send-info__button')
  const formContact = document.getElementsByClassName('send-info-forms')
  const modalWindow = document.getElementsByClassName('modal')
  const modal = document.getElementsByClassName('modal')

  let currentText, currentForm
  let arrData = [[], [], ['Subject: '], ['Description: ']]

  const dataInput = (e) => {
    currentText = e.data
    currentForm = e.target.placeholder

    switch (currentForm) {
      case 'Name (Required)':
        arrData[0].push(currentText)
        break;
      case 'Email (Required)':
        arrData[1].push(currentText)
        break;
      case 'Subject':
        arrData[2].push(currentText)
        break;
      case 'Describe your project in detail...':
        arrData[3].push(currentText)
        break;
    }
  }

  formContact[0].addEventListener('input', dataInput)

  sendFormButton[0].onclick = (e) => {
    e.target.blur()
    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    modal[0].appendChild(modalContent)

    const modalContentTemp = document.getElementsByClassName('modal-content')

    tempSubject = arrData[2].join('').trim()
    tempDescribe = arrData[3].join('').trim()

    if (tempSubject.length == 8) {
      arrData[2] = ['N', 'o', ' ', 's', 'u', 'b', 'j', 'e', 'c', 't']
    }

    if (tempDescribe.length == 12) {
      arrData[3] = ['N', 'o', ' ', 'd', 'e', 's', 'c', 'r', 'i', 'p', 't', 'i', 'o', 'n']
    }

    const send = document.createElement('p')
    send.classList.add('modal-info__send')
    const sendText = document.createTextNode('The letter was sent')
    send.appendChild(sendText)

    const subject = document.createElement('p')
    subject.classList.add('modal-info__subject')
    const subjectText = document.createTextNode(arrData[2].join(''))
    subject.appendChild(subjectText)

    const describe = document.createElement('p')
    describe.classList.add('modal-info__describe')
    const describeText = document.createTextNode(arrData[3].join(''))
    describe.appendChild(describeText)

    const modalButton = document.createElement('button')
    modalButton.classList.add('modal-button')
    const modalButtonName = document.createTextNode('Ok')
    modalButton.appendChild(modalButtonName)

    const modalButtonClick = document.getElementsByClassName('modal-button')

    modalContentTemp[0].appendChild(send)
    modalContentTemp[0].appendChild(subject)
    modalContentTemp[0].appendChild(describe)
    modalContentTemp[0].appendChild(modalButton)

    modalWindow[0].classList.remove('hide')

    modalButtonClick[0].onclick = () => {
      modalWindow[0].classList.add('hide')
      arrData = [[], [], ['Subject: '], ['Description: ']]
      modalContentTemp[0].remove()
      let allForms = document.getElementsByClassName('send-info__form')
      allForms = Array.from(allForms)
      allForms.map((item) => {item.value = ''})
    }
  }
}

const smoothScroll = () => {
  let toHome = document.getElementsByClassName('content-slider')[0].offsetTop
  let toServices = document.getElementsByClassName('our-services')[0].offsetTop
  let toPortfolio = document.getElementsByClassName('portfolio')[0].offsetTop
  let toAbout = document.getElementsByClassName('about-us')[0].offsetTop
  let toContact = document.getElementsByClassName('getQuote')[0].offsetTop
  let navLinks = document.getElementsByClassName('nav__item')

  navLinks = Array.from(navLinks)
  navLinks.map((item) => {
    item.onclick = (e) => {
      switch (e.target.parentNode.innerText.trim()) {
        case 'HOME':
          window.scrollTo({
            top: toHome,
            behavior: 'smooth'
          })
          break;
        case 'SERVICES':
          window.scrollTo({
            top: toServices,
            behavior: 'smooth'
          })
          break;
        case 'PORTFOLIO':
          window.scrollTo({
            top: toPortfolio,
            behavior: 'smooth'
          })
          break;
        case 'ABOUT':
          window.scrollTo({
            top: toAbout,
            behavior: 'smooth'
          })
          break;
        case 'CONTACT':
          window.scrollTo({
            top: toContact,
            behavior: 'smooth'
          })
          break;
      }
    }
  })
}

const burgerMenu = () => {
  const burgerMenu = document.getElementsByClassName('burger-list-menu')[0]
  const burgerButton = document.getElementsByClassName('burger-icon')[0]
  burgerButton.onclick = () => {
    burgerButton.classList.toggle('openBurger')
    burgerMenu.classList.toggle('hide')
  }
}

const closeBurgerMenu = (e) => {
  const burgerMenu = document.getElementsByClassName('burger-list-menu')[0]
  const button = document.getElementsByClassName('burger-icon')[0]
  let target = e.target.parentNode.parentNode.parentNode.parentNode.classList
  if (target == 'burger-list-menu') {
    burgerMenu.classList.add('hide')
    button.classList.remove('openBurger')
  }
}

const onDisplayPhone = (e) => {
  const verPhone = document.getElementsByTagName('img')[2]
  const horPhone = document.getElementsByTagName('img')[3]
  const middlePhone = document.getElementsByClassName('touch-middle')[0]

  const blackPhoneVer = document.getElementsByClassName('ver-phone-black')[0]
  const blackPhoneHor = document.getElementsByClassName('hor-phone-black')[0]
  const middleBlack = document.getElementsByClassName('middle-phone-black')[0]

  console.log(e.target)

  verPhone.onclick = () => {
    blackPhoneVer.classList.toggle('hide')
  }

  horPhone.onclick = () => {
    blackPhoneHor.classList.toggle('hide')
  }

  middlePhone.onclick = () => {
    middleBlack.classList.toggle('hide')
  }
}