// Main functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero Background Carousel Functionality
    let heroIndex = 0;
    const heroItems = [
        { type: 'video', src: 'Content/HV/HV1.mp4' },
        { type: 'image', src: 'Content/HV/HV2.png' },
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
            video.autoplay = false;  // Video will be paused initially
            video.loop = false;
            video.muted = false;     // Ensure the video is not muted
            video.volume = 1.0;      // Set the volume to 100% (1.0)
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
    
    // Select the video and the button
    const videoButton = document.querySelector('.video-button');
    const video = document.querySelector('.hero-background video');

    // Add a click event listener to the button
    if (videoButton && video) {
        videoButton.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                videoButton.textContent = '❚❚';
            } else {
                video.pause();
                videoButton.textContent = '►';
            }
        });
    }

    // Language Toggle Functionality
    const languageToggle = document.getElementById('languageToggle');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-zh]');
    let currentLang = 'zh'; // Start with Chinese

    function updateLanguageToggleText() {
        if (languageToggle) {
            languageToggle.textContent = currentLang === 'zh' ? 'English' : '中文';
        }
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

    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            translateContent();
        });
        translateContent(); // Initial translation
    }

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

    if (minorBanner) {
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
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal functionality
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('modal-overlay');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        modal.focus();

        const modalVideo = modal.querySelector('video');
        if (modalVideo) {
            modalVideo.style.display = 'block';
            modalVideo.play().catch(e => console.error("Error playing video:", e));
        }
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('role');

        const modalVideo = modal.querySelector('video');
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.style.display = 'none';
        }
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.getAttribute('data-modal-target'));
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => closeModal(modal));
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => closeModal(modal));
        }
    });

    // Enhanced Hamburger Menu Functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuExpanded = document.querySelector('.menu-expanded');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && menuExpanded) {
        // Toggle menu on hamburger click
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburgerMenu.classList.toggle('active');
            menuExpanded.classList.toggle('active');

            // Toggle visibility and body scroll
            if (menuExpanded.classList.contains('active')) {
                menuExpanded.style.display = 'block';
                document.body.style.overflow = 'hidden';
                if (mainNav) mainNav.style.display = 'none';
            } else {
                menuExpanded.style.display = 'none';
                document.body.style.overflow = '';
                if (mainNav) mainNav.style.display = '';
            }
        });

        // Handle menu item clicks
        menuExpanded.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                menuExpanded.classList.remove('active');
                menuExpanded.style.display = 'none';
                document.body.style.overflow = '';
                if (mainNav) mainNav.style.display = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && 
                !menuExpanded.contains(e.target) && 
                menuExpanded.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                menuExpanded.classList.remove('active');
                menuExpanded.style.display = 'none';
                document.body.style.overflow = '';
                if (mainNav) mainNav.style.display = '';
            }
        });

        // Prevent menu closing when clicking inside
        menuExpanded.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Initial calls
    adjustFontSize();

    // Window event listeners
    window.addEventListener('resize', adjustFontSize);
    window.addEventListener('resize', detectOrientation);
    detectOrientation(); // Initial orientation check
});

