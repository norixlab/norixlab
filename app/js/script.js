
    
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
    menu.classList.remove('hidden');
  }, 1500);
// });