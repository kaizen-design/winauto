window.addEventListener("DOMContentLoaded", () => {
  //  Prevent jump to top on "#" links
  document.querySelectorAll("a[href='#']").forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });

  //  Mobile Nav
  initMobileMenu();
  initModals();
  handleCallbackForm();
  initSmoothScroll();

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
    /* navigation: {
      nextEl: ".serviceSliderBtnNext",
      prevEl: ".serviceSliderBtnPrev",
    },  */ 
    /* autoplay: {
      delay: 5000,
    }, */
  });  
  
  const $servicesSliders = document.querySelectorAll(".serviceGallerySlider");

  if ($servicesSliders) {
    $servicesSliders.forEach((slider) => {
      const servicesSlider = new Swiper(slider, {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: { crossFade: true },
        loop: true,
        navigation: {
          nextEl: slider.parentNode.querySelector('.serviceSliderBtnNext'),
          prevEl: slider.parentNode.querySelector('.serviceSliderBtnPrev'),
        },  
        /* autoplay: {
          delay: 5000,
        }, */
      });  
    })
  }

  

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

function initModals() {
  var openmodal = document.querySelectorAll('.modal-open')
  for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function(event){
    event.preventDefault()
    toggleModal()
    })
  }
  
  const overlay = document.querySelector('.modal-overlay')
  overlay.addEventListener('click', toggleModal)
  
  var closemodal = document.querySelectorAll('.modal-close')
  for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
  }
  
  document.onkeydown = function(evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
    isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
    toggleModal()
    }
  };
  
  
  function toggleModal () {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
  }
}

function handleCallbackForm() {
  const $form = document.querySelector('.callback-form');

  if (!$form) return;

  $form.addEventListener('submit', e => {
    e.preventDefault();

    const $btn = $form.querySelector('button[type="submit"]');
    const $formFieldset = $form.closest('.form-fieldset');
    const $resultFieldset = $formFieldset.nextElementSibling;
  
    $btn.setAttribute('disabled', true);
    $btn.textContent = 'Отправка...'

    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    })
    .then(() => {
      $formFieldset.classList.add('hidden');
      $resultFieldset.classList.remove('hidden');
    })
    .finally(() => {
          
    });
  })
}

function initSmoothScroll($el = document) {
  $el.querySelectorAll('.smoothScroll').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const href = this.getAttribute("href"), 
            el = document.querySelector(href); 
      try {
        el.scrollIntoView({ block: "start", behavior: "smooth" });
      } catch (e) {
        console.error(`Element with the ${href} ID not found`)
      }  
    });
  });
}