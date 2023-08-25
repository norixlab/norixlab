
// document.addEventListener('DOMContentLoaded', () => {
    // Your code here

const gate = document.querySelectorAll('.header__img-gate');
// const gateRight = document.querySelector('.gate-right');
const menu = document.querySelector('.menu__list');
const classesToRemove = ['gate-left', 'gate-right'];

setTimeout(() => {

    gate.forEach((item) => {
        classesToRemove.forEach(className => {
          item.classList.remove(className);
        });
      });
    // Remove animation property from element1
    // gateLeft.classList.remove('gate-left');
    // gateRight.classList.remove('gate-right');
    
    // Change display property of element2 from none to block
    menu.classList.remove('hidden');
  }, 1500);
// });