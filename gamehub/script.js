document.addEventListener('DOMContentLoaded', () => {

    // Intro Animation Sequence
    const introScreen = document.getElementById('intro-screen');
    const appContainer = document.getElementById('app-container');
    const introText = document.querySelector('.glitch');

    setTimeout(() => {
        // Optional: Change text before entry
        if (introText) introText.setAttribute('data-text', 'READY?');
        if (introText) introText.textContent = 'READY?';
    }, 2000);

    setTimeout(() => {
        introScreen.classList.add('fade-out');
        appContainer.classList.remove('hidden');
        appContainer.classList.add('visible');
    }, 3000);

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to click
            btn.classList.add('active');

            const filter = btn.innerText.toLowerCase();

            gameCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Trigger reflow for animation if needed
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search Logic
    const searchInput = document.getElementById('game-search');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();

            gameCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                if (title.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Retro Loader Logic
    const gameLinks = document.querySelectorAll('a[href^="games/"]');
    const loader = document.getElementById('game-loader');
    const progressBar = document.querySelector('.progress-fill');
    const statusText = document.querySelector('.loading-status');

    // Fix: Force reset loader when page is shown (handles Back button)
    window.addEventListener('pageshow', (event) => {
        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
            progressBar.style.width = '0%';
            statusText.innerText = 'INITIALIZING CARTRIDGE...';
        }
    });

    gameLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;

            // Activate Loader
            loader.classList.add('active');

            // Animation Sequence
            setTimeout(() => {
                progressBar.style.width = '30%';
            }, 100);

            setTimeout(() => {
                progressBar.style.width = '70%';
                statusText.innerText = "ACCESSING MEMORY...";
            }, 800);

            setTimeout(() => {
                progressBar.style.width = '100%';
                statusText.innerText = "LAUNCHING...";
            }, 1500);

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 2000);
        });
    });

    // Dynamic Glitch Text Effect (Optional Polish)
    const originalText = "TECHNOPHILES";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Can implement complex mouseover glitch if requested, 
    // for now sticking to the CSS animation for performance.

    // Help Modal Logic
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeHelp = document.querySelector('.close-modal');

    if (helpBtn && helpModal) {
        helpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            helpModal.classList.remove('hidden');
        });

        closeHelp.addEventListener('click', () => {
            helpModal.classList.add('hidden');
        });

        // Close when clicking outside
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                helpModal.classList.add('hidden');
            }
        });

        // Auto-show if running on file:// protocol
        if (window.location.protocol === 'file:') {
            setTimeout(() => {
                helpModal.classList.remove('hidden');
            }, 1000);
        }
    }

    // Sidebar Navigation Logic
    const navHome = document.getElementById('nav-home');
    const navTrending = document.getElementById('nav-trending');
    const navCategories = document.getElementById('nav-categories');
    const navFavorites = document.getElementById('nav-favorites');

    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault();
            // Reset filters
            filterBtns.forEach(b => b.classList.remove('active'));
            if (filterBtns[0]) filterBtns[0].classList.add('active'); // Set 'All' active

            // Show all games
            gameCards.forEach(card => {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 50);
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Update active state
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            navHome.classList.add('active');
        });
    }

    if (navTrending) {
        navTrending.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to Featured section (2048)
            const featured = document.querySelector('.hero-banner');
            if (featured) {
                featured.scrollIntoView({ behavior: 'smooth' });
            }
            // Update active state
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            navTrending.classList.add('active');
        });
    }

    if (navCategories) {
        navCategories.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to Filters section
            const filters = document.querySelector('.section-header');
            if (filters) {
                filters.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Update active state
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            navCategories.classList.add('active');
        });
    }

    if (navFavorites) {
        navFavorites.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Favorites feature coming soon! (Requires login)");
        });
    }

    // Slideshow Logic
    let slideIndex = 1;
    showSlides(slideIndex);

    // Auto-slide every 5 seconds
    let slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);

    // Expose functions to global scope for HTML onclick attributes
    window.plusSlides = function (n) {
        clearInterval(slideInterval); // Reset timer on manual interaction
        showSlides(slideIndex += n);
        slideInterval = setInterval(() => { plusSlides(1); }, 5000); // Restart timer
    }

    window.currentSlide = function (n) {
        clearInterval(slideInterval);
        showSlides(slideIndex = n);
        slideInterval = setInterval(() => { plusSlides(1); }, 5000);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Ensure flex display for active slide
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "flex";
            slides[slideIndex - 1].classList.add("active");
            if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
        }
    }

    console.log('Technophiles System Online');
});
