const burger = document.querySelector(".header-top__burger");
const mobileMenu = document.querySelector(".header-top__menu-list");

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('menu--active');
  if (mobileMenu.classList.contains('menu--active')) {
    burger.classList.add('burger--active');
  } else {
    burger.classList.remove('burger--active');
  }
  setTimeout(() => {
    burger.classList.remove('burger--active');
  }, 2500)
});
