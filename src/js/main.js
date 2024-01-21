window.addEventListener("DOMContentLoaded", () => {
  //  Prevent jump to top on "#" links
  document.querySelectorAll("a[href='#']").forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });

  //  Mobile Nav
  initMobileMenu();

  //  Homepage
  initReviewsSlider();
  initServicesSlider();
  initContactPopover();
});

function initMobileMenu() {
  const $toggle = document.querySelector("#mobileMenuToggle");
  
  if (!$toggle) return;

  const $icon = $toggle.getElementsByTagName("img");
  const $menu = document.querySelector("#mobileNav");

  const menuIcon = 'img/icons/menu.svg';
  const closeIcon = 'img/icons/close.svg';

  $toggle.addEventListener("click", e => {
    const className = 'hidden';
    if ($menu.classList.contains(className)) {
      $icon[0].setAttribute('src', closeIcon);
      $menu.classList.remove(className)
    } else {
      $icon[0].setAttribute('src', menuIcon);
      $menu.classList.add(className);
    }
  });
}

function initServicesSlider() {  
  const $slider = document.querySelector(".servicesSlider");
  
  if (!$slider) return;
  
  const swiper = new Swiper($slider, {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    navigation: {
      nextEl: ".serviceSliderBtnNext",
      prevEl: ".serviceSliderBtnPrev",
    },  
    autoplay: {
      delay: 5000,
    },
  });   

  const $menuLinks = document.querySelectorAll('.service-slider-menu a');

  $menuLinks.forEach(link => {
    link.addEventListener("click", function() {
      const slideId = this.getAttribute('data-index');
      swiper.slideTo(slideId);
      $menuLinks.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    })
  });

  swiper.on('slideChange', function () {
    $menuLinks.forEach(i => i.classList.remove('active'));
    const $link = document.querySelector(`.service-slider-menu a[data-index="${swiper.realIndex}"]`);
    $link.classList.add('active');
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
      nextEl: "#reviewsSliderNextBtn",
      prevEl: "#reviewsSliderPrevBtn",
    },  
    autoplay: {
      delay: 5000,
    },
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

function initContactPopover() {
  const $hotspots = document.querySelectorAll(".hotspot");
  const $tooltips = document.querySelectorAll(".tooltip");

  if (!$hotspots && !$tooltips) return;
 
  $hotspots.forEach(hotspot => {
    const id = hotspot.getAttribute('data-id')
    const tooltip = document.querySelector(`#${id}`); 

    const popperInstance = Popper.createPopper(hotspot, tooltip, {
      placement: 'top-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 20],
          },
        },
      ],
    });
    
    hotspot.addEventListener('click', function() {
      $tooltips.forEach((el) => el.removeAttribute('data-show'));
      tooltip.setAttribute('data-show', '');
      popperInstance.update();
    });
    
  });

  document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('hotspot')) {
      $tooltips.forEach(el => el.removeAttribute('data-show'));
    }
  });
  
}
