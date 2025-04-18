var swiper = new Swiper(".hero-slider", {
    centeredSlides: false,
    loop: true,
    initialSlide: 0,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    breakpoints: {
      0: {
        spaceBetween: 0,
      },
      768: {
        spaceBetween: 0,
      },
    },
  });

  var swiper = new Swiper(".process-slider", {
    slidesPerView: 1,
    centeredSlides: false,
    loop: true,
    initialSlide: 0,
    speed: 800,
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: true,
    // },
    pagination: {
      el: ".process-nos",
      clickable: true,
      renderBullet: function (index, className) {
        var bulletNames = ["1. Assessment", "2. IT Training", "3. Resume Building","4. Interview Preparation","5. Placement", "6. Success" ];
        return (
          '<span class="' + className + '">' + bulletNames[index] + "</span>"
        );
      },
    },
    breakpoints: {
      0: {
        spaceBetween: 20,
      },
      768: {
        spaceBetween: 20,
      },
    },
  });



  document.addEventListener("DOMContentLoaded", function () {
    const tabTitles = document.querySelectorAll(".pxl-item--title");
    const tabContents = document.querySelectorAll(".tabs-content-item");

    tabTitles.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            // Remove active class from all tabs and contents
            tabTitles.forEach(t => t.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            // Add active class to clicked tab and corresponding content
            tab.classList.add("active");
            tabContents[index].classList.add("active");
        });
    });
});

var swiper = new Swiper(".client-reviews", {
  speed: 800,
 navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const headerSideMenu = document.querySelector(".header-side-menu");
  const sideMenuWrapper = document.querySelector(".side-menu-wrapper");
  const sideMenuOverlay = document.querySelector(".side-menu-overlay");
  const sideMenuContent = document.querySelector(".side-menu-content");
  const sideMenuToggler = document.querySelector(".side-menu-toggler");
  const body = document.body;

  if (headerSideMenu && sideMenuWrapper && sideMenuOverlay && sideMenuContent && sideMenuToggler) {
      headerSideMenu.addEventListener("click", function () {
          sideMenuWrapper.classList.add("expanded");
          sideMenuOverlay.classList.add("expanded");
          sideMenuContent.classList.add("expanded");
          body.classList.add("locked");
      });

      sideMenuToggler.addEventListener("click", function () {
          sideMenuWrapper.classList.remove("expanded");
          sideMenuOverlay.classList.remove("expanded");
          sideMenuContent.classList.remove("expanded");
          body.classList.remove("locked");
      });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const headerMenu = document.querySelector(".header-menu-collaps");
  const mobileWrapper = document.querySelector(".mobile-nav-wrapper");
  const mobileClose = document.querySelector(".mobile-nav-close");
  const body = document.body;

  if (headerMenu && mobileClose) {
      headerMenu.addEventListener("click", function () {
        mobileWrapper.classList.add("expanded");
        body.classList.add("locked");
      });

      mobileClose.addEventListener("click", function () {
        mobileWrapper.classList.remove("expanded");
          body.classList.remove("locked");
      });
  }
});

// window.onload = function () {
//   setTimeout(function () {
//       jQuery(".preloader").addClass("loaded");
//       jQuery(".preloader").delay(600).fadeOut();
//   }, 1200);
// };

var swiper = new Swiper(".partner-slider", {
  loop:true,
  speed: 800,
  autoplay: {
    delay: 1000,
    disableOnInteraction: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    479:{
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});

var swiper = new Swiper(".how-it .slider-container ", {
  loop:true,
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 30,
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});