document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    hamburgerMenu.addEventListener('click', function() {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        this.style.display = 'none';
        document.body.style.overflow = 'auto';

    });
});


// Ourstoryのスライド表示ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
window.addEventListener('scroll', () => {
    const storySection = document.querySelector('#story');
    const storyTexts = storySection.querySelectorAll('p');
    const windowHeight = window.innerHeight;

    storyTexts.forEach((text, index) => {
      const rect = text.getBoundingClientRect();
      if (rect.top < windowHeight) {
        text.style.animationDelay = `${index * 0.5}s`;
        text.classList.add('story-animation');
      }
    });
  });


  // スライドイメージーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  document.addEventListener('DOMContentLoaded', function () {
    const glideElement = document.querySelector('.glide');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                glideElement.classList.add('revealed');
                new Glide('.glide', {
                    type: 'carousel',
                    startAt: 0,
                    perView: 1,
                    autoplay: 2000, // 3000ms = 3s でスライドが切り替わる
                }).mount();
                observer.disconnect(); // 一度実体化したら、observerを切断
            }
        });
    });
    observer.observe(glideElement);
});


