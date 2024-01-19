//libraries like jquery etc
window.addEventListener("DOMContentLoaded", () => {
  //  Prevent jump to top on "#" links
  document.querySelectorAll("a[href='#']").forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });

  //  Mobile Nav
  initMobileMenu();

  //  Homepage
  initReviewsSlider();
});

function initMobileMenu() {
  const $toggle = document.querySelector("#mobileMenuToggle");
  
  if (!$toggle) return;

  const $icon = $toggle.getElementsByTagName("img");
  const $menu = document.querySelector("#mobileNav");

  const menuIcon = 'img/icons/menu.svg';
  const closeIcon = 'img/icons/close.svg';

  $toggle.addEventListener("click", e => {
    const className = '-translate-y-full';
    if ($menu.classList.contains(className)) {
      $icon[0].setAttribute('src', closeIcon);
      $menu.classList.remove('-translate-y-full')
    } else {
      $icon[0].setAttribute('src', menuIcon);
      $menu.classList.add('-translate-y-full');
    }
  });
}

function initReviewsSlider() {  
  const $slider = document.querySelector(".reviewsSlider");
  
  if (!$slider) return;
  
  const swiper = new Swiper($slider, {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },  
    /* autoplay: {
      delay: 5000,
    }, */
    breakpoints: {      
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3        
      },
    }
  });    
}
