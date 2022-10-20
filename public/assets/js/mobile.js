// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarManu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarManu.classList.toggle('is-active')
})