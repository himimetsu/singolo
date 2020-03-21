window.onload = () => {
  console.log('Загрузка завершена!')
  document.addEventListener('click', selectSection)
  document.addEventListener('click', tabSwitching)
  document.addEventListener('click', createFrame)
  document.addEventListener('click', switched)
}

selectSection = (e) => {
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

tabSwitching = (e) => {
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

createFrame = (e) => {
  const frame = document.getElementsByClassName('frame')

  const pictures = document.getElementsByTagName('img')

  if (e.target.parentNode.classList[0] == 'portfolio-item__picture') {

    if (frame.length > 0) {
      for (let i = 0; i < pictures.length; i++) {pictures[i].classList.remove('frame')}
    }

    e.target.classList.add('frame')
  }
}

switched = (e) => {
  switch (e.target.classList[0]) {
    case 'vertical-switched':
      document.getElementsByClassName('ver-display')[0].classList.toggle('hide')
      break;
    case 'horizontal-switched':
      document.getElementsByClassName('hor-display')[0].classList.toggle('hide')
      break;
  }
}