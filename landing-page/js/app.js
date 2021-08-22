//Funtion: Create Navigation bar dynamically based on the sections
const createNavBar = () => {
  const sections = [...document.querySelectorAll('section')];

  const listElements = sections.map((section) => {
    const li = document.createElement('li');
    li.innerHTML = `<a class='menu__link' scroll-id='${
      section.id
    }'> ${section.getAttribute('data-nav')} </a>`;
    return li;
  });

  const fragment = document.createDocumentFragment();
  for (listElement of listElements) {
    fragment.appendChild(listElement);
  }
  document.getElementById('navbar__list').appendChild(fragment);
};

//Function: scroll to the section based on navigation element clicked on (attribute: scroll-id)
const scrollToSection = (event) => {
  event.preventDefault();
  const ankers = document.getElementsByClassName('active_nav');
  if (ankers[0] !== undefined) {
    ankers[0].classList.remove('active_nav');
  }
  const section_id = event.target.getAttribute('scroll-id');
  if (section_id !== null) {
    document.getElementById(section_id).scrollIntoView({
      behavior: 'smooth',
    });
  }
};

//Helper Function: to check if the html element in the view port for the client or not
const isInViewportHelper = (el) => {
  const bounding = el.getBoundingClientRect();
  let perc = 0.7;
  if (window.innerHeight < 900) {
    perc = 0.5;
  }
  return (
    bounding.bottom * perc <= window.innerHeight &&
    bounding.top >= 0
  );
};

const sections = document.getElementsByTagName('section');
const ankers = document.getElementsByClassName('menu__link');

//Function: make the section & nav element active when it get in the view port of the client
const isInViewport = () => {
  for (let i = 0; i < sections.length; i++) {
    if (isInViewportHelper(sections[i])) {
      sections[i].classList.add('your-active-class');
      ankers[i].classList.add('active_nav');
    } else {
      sections[i].classList.remove('your-active-class');
      ankers[i].classList.remove('active_nav');
    }
  }
};

let timer = null;
//Function: hide|show nav bar when scrolling|not scrolling
const toggleNavbar = () => {
  const nav = document.getElementsByClassName('page__header');
  if (timer !== null) {
    clearTimeout(timer);
    nav[0].classList.add('hide');
  }
  timer = setTimeout(() => {
    nav[0].classList.remove('hide');
  }, 130);
};

//Function: show|hide the top btn
const toggleTopBtn = () => {
  const btn = document.getElementById('toTopBtn');
  if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
};

//Function: scroll to the top of the page
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

//Function: collapse|uncollapse the section content
const collapseContent = (event) => {
  event.preventDefault();
  const btn = event.target;
  const section = btn.parentElement.parentElement.parentElement;
  const content = btn.parentElement.nextElementSibling;
  section.classList.toggle('section-collapse');
  btn.classList.toggle('up');
  btn.classList.toggle('down');
  content.classList.toggle('hide');
};

//Function: add all  the event listners
const addEventListners = () => {
  document
    .getElementById('navbar__list')
    .addEventListener('click', scrollToSection, false);
  window.addEventListener('scroll', isInViewport, false);
  window.addEventListener('scroll', toggleNavbar, false);
  window.addEventListener('scroll', toggleTopBtn, false);
  document.getElementById('toTopBtn').addEventListener('click', toTop, false);
  [...document.getElementsByClassName('collapsible-btn')].forEach((el) => {
    el.addEventListener('click', collapseContent, false);
  });
};

createNavBar();
addEventListners();
