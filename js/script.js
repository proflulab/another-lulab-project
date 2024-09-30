// JavaScript to handle the hero background carousel, language toggle, etc.
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
});
