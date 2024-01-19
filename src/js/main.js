window.addEventListener("DOMContentLoaded", () => {
  //  Prevent jump to top on "#" links
  document.querySelectorAll("a[href='#']").forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });

  //  Homepage
  initReviewsSlider();
});

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
