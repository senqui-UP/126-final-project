
/*const swiper1 = new Swiper(".swiper1", {  
  loop: true,
    navigation: {
      nextEl: ".swiper1 .swiper-button-next",
      prevEl: ".swiper1 .swiper-button-prev",
    },
    pagination: {
      el: ".swiper1 .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
  }});

const swiper2 = new Swiper(".swiper2", {
    loop: true,
    navigation: {
      nextEl: ".swiper2 .swiper-button-next",
      prevEl: ".swiper2 .swiper-button-prev",
    },
    pagination: {
      el: ".swiper2 .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
  }});

const swiper3 = new Swiper(".swiper3", {
    loop: true,
    navigation: {
      nextEl: ".swiper3 .swiper-button-next",
      prevEl: ".swiper3 .swiper-button-prev",
    },
    pagination: {
      el: ".swiper3 .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
  }});

const swiper4 = new Swiper(".swiper4", {
    loop: true,
    navigation: {
      nextEl: ".swiper4 .swiper-button-next",
      prevEl: ".swiper4 .swiper-button-prev",
    },
    pagination: {
      el: ".swiper4 .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
  }});
*/

  const track = document.querySelector('.swiper-wrapper');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const cards = document.querySelectorAll('.swiper-slide card');
  const pagination = document.querySelector('.pagination');

  const cardWidth = cards[0].offsetWidth + 20; // 250px card + 20px gap
  const cardsPerView = Math.floor(track.offsetWidth / cardWidth);
  const totalPages = Math.ceil(cards.length / cardsPerView);

  // Generate pagination dots
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    pagination.appendChild(dot);
  }

  const dots = document.querySelectorAll('.carousel-dot');

  function updateActiveDot(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  let currentIndex = 0;

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalPages - 1) {
      currentIndex++;
      track.scrollBy({ left: track.offsetWidth, behavior: 'smooth' });
      updateActiveDot(currentIndex);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.scrollBy({ left: -track.offsetWidth, behavior: 'smooth' });
      updateActiveDot(currentIndex);
    }
  });

  // Click on pagination dot
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      currentIndex = index;
      track.scrollTo({ left: index * track.offsetWidth, behavior: 'smooth' });
      updateActiveDot(currentIndex);
    });
  });
