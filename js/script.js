// JavaScript to handle the hero background carousel, language toggle, and screen scaling
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

    languageToggle.addEventListener('click', function() {
        const currentLang = languageToggle.getAttribute('data-current-lang') || 'en';
        const newLang = currentLang === 'en' ? 'zh' : 'en';

        elementsToTranslate.forEach(el => {
            el.classList.add('lang-fade');
            setTimeout(() => {
                el.textContent = el.getAttribute(`data-${newLang}`);
                el.classList.remove('lang-fade');
            }, 300);
        });

        languageToggle.setAttribute('data-current-lang', newLang);
        languageToggle.textContent = newLang === 'en' ? 'English' : '简体中文';
    });

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

    // Initial call and event listener for resize
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
});
