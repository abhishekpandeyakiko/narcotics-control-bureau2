document.addEventListener("DOMContentLoaded", function () {
  // --- Ticker Play/Pause Logic (For element in index.html) ---
  const playBtnWrapper = document.querySelector('.kb-announce-play');
  const tickerContent = document.querySelector('.kb-ticker-content');

  if (playBtnWrapper && tickerContent) {
    const icon = playBtnWrapper.querySelector('i');

    // Auto-run is default in CSS. We want the button to show "Pause" initially if we assume it's running.
    // However, the HTML hardcodes 'fa-circle-play'. 
    if (icon.classList.contains('fa-circle-play')) {
      icon.classList.remove('fa-circle-play');
      icon.classList.add('fa-circle-pause');
    }

    playBtnWrapper.addEventListener('click', function () {
      // Toggle the 'paused' class on the content
      tickerContent.classList.toggle('paused');

      // Update Icon
      if (tickerContent.classList.contains('paused')) {
        // Wrapper is Paused -> Show Play Icon
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-circle-play');
      } else {
        // Wrapper is Running -> Show Pause Icon
        icon.classList.remove('fa-circle-play');
        icon.classList.add('fa-circle-pause');
      }
    });
  }

  // Load Header
  fetch("components/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Highlight active link based on current URL
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll('.kb-nav .nav-link');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Theme Toggle Logic
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Check saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
          } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
          }
        });
      }

      // Header Ticker Play/Pause Logic
      const headerPlayBtn = document.getElementById('tickerPlayBtn');
      const headerTicker = document.getElementById('headerTickerContent');

      if (headerPlayBtn && headerTicker) {
        const icon = headerPlayBtn.querySelector('i');

        headerPlayBtn.addEventListener('click', () => {
          headerTicker.classList.toggle('paused');

          if (headerTicker.classList.contains('paused')) {
            // Paused -> Show Play Icon
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
            headerPlayBtn.setAttribute('title', 'Play');
          } else {
            // Running -> Show Pause Icon
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');
            headerPlayBtn.setAttribute('title', 'Pause');
          }
        });
      }
    })
    .catch(err => console.error("Error loading header:", err));

  // Load Footer
  fetch("components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));

  // --- Updates Section Slider Logic ---
  const sliderContainer = document.querySelector('.kb-slider-container');
  const prevBtn = document.querySelector('.kb-slider-prev');
  const nextBtn = document.querySelector('.kb-slider-next');

  if (sliderContainer && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      const item = sliderContainer.querySelector('.kb-slide-item');
      if (item) {
        const itemWidth = item.offsetWidth;
        const gap = 20; // Matches CSS gap
        sliderContainer.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', () => {
      const item = sliderContainer.querySelector('.kb-slide-item');
      if (item) {
        const itemWidth = item.offsetWidth;
        const gap = 20; // Matches CSS gap
        sliderContainer.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
      }
    });
  }
});
