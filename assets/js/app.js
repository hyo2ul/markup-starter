(function () {
  var mySwiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });

  AOS.init({
    once: true
  });
})();
