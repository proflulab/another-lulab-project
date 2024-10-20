// Main functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero Background Carousel Functionality
    let heroIndex = 0;
    const heroItems = [
        { type: 'video', src: 'Content/HV/HV1.mp4' },
        { type: 'image', src: 'Content/HV/HV2.jpg' },
        { type: 'image', src: 'Content/HV/HV3.jpg' },
        { type: 'image', src: 'Content/HV/HV4.jpg' }
    ];
    const heroBackground = document.querySelector('.hero-background');
    let imageTimeout;

    function showHeroItem(index) {
        if (imageTimeout) clearTimeout(imageTimeout);
        heroBackground.innerHTML = '';
        const item = heroItems[index];
        if (item.type === 'image') {
            heroBackground.style.backgroundImage = `url(${item.src})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
            imageTimeout = setTimeout(nextHeroItem, 5000);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.autoplay = true;
            video.loop = false;
            video.muted = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.objectPosition = 'center';
            video.addEventListener('ended', nextHeroItem);
            heroBackground.appendChild(video);
        }
    }

    function nextHeroItem() {
        heroIndex = (heroIndex + 1) % heroItems.length;
        showHeroItem(heroIndex);
    }

    showHeroItem(heroIndex);

    // Spacebar to unmute video
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            const video = heroBackground.querySelector('video');
            if (video) video.muted = !video.muted;
        }
    });

    // Language Toggle Functionality
    const languageToggle = document.getElementById('languageToggle');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-zh]');
    let currentLang = 'zh'; // Start with Chinese

    function updateLanguageToggleText() {
        languageToggle.textContent = currentLang === 'zh' ? 'English' : '中文';
    }

    function translateContent() {
        elementsToTranslate.forEach(el => {
            el.classList.add('lang-fade');
            setTimeout(() => {
                el.textContent = el.getAttribute(`data-${currentLang}`);
                el.classList.remove('lang-fade');
            }, 300);
        });
        updateLanguageToggleText();
    }

    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        translateContent();
    });

    // Initial translation to Chinese
    translateContent();

    // Screen Scaling Functionality
    function adjustFontSize() {
        const width = window.innerWidth;
        const baseFontSize = 16;
        let scaleFactor;
        if (width < 480) {
            scaleFactor = 0.8;
        } else if (width < 768) {
            scaleFactor = 0.9;
        } else if (width < 1024) {
            scaleFactor = 1;
        } else {
            scaleFactor = 1.1;
        }
        document.documentElement.style.fontSize = `${baseFontSize * scaleFactor}px`;
    }

    // Dropdown and Minor Banner Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    const minorBanner = document.querySelector('.minor-banner');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            minorBanner.style.top = '0';
            minorBanner.style.opacity = '1';
        });

        dropdown.addEventListener('mouseleave', function() {
            minorBanner.style.top = '-100%';
            minorBanner.style.opacity = '0';
        });
    });

    minorBanner.addEventListener('mouseenter', function() {
        this.style.top = '0';
        this.style.opacity = '1';
    });

    minorBanner.addEventListener('mouseleave', function() {
        this.style.top = '-100%';
        this.style.opacity = '0';
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal functionality
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('modal-overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.querySelector(modalId);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            });
        }
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scrolling
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        modal.focus(); // Set focus to modal

        // Play video if present
        const video = modal.querySelector('video');
        if (video) {
            video.style.display = 'block';
            video.play().catch(e => console.error("Error playing video:", e));
        }
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('role');

        // Pause and hide video if present
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.style.display = 'none';
        }
    }

    // Initial calls
    adjustFontSize();

    // Event listeners
    window.addEventListener('resize', adjustFontSize);
});

// Orientation detection and warning functionality
function detectOrientation() {
    if (window.innerWidth < window.innerHeight) {
        showOrientationWarning();
    } else {
        hideOrientationWarning();
    }
}

function showOrientationWarning() {
    const warning = document.getElementById('orientationWarning');
    if (!warning) {
        const orientationDiv = document.createElement('div');
        orientationDiv.id = 'orientationWarning';
        orientationDiv.innerHTML = '<h1>Please Rotate Your Device</h1>';
        document.body.appendChild(orientationDiv);
    }
}

function hideOrientationWarning() {
    const warning = document.getElementById('orientationWarning');
    if (warning) {
        document.body.removeChild(warning);
    }
}

// Call the orientation detection function after the page loads
detectOrientation();

// Listen for changes in the window size (when the user rotates the device)
window.addEventListener('resize', detectOrientation);