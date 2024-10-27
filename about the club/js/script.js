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

// Collapsible sections using event delegation
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('section-header')) {
        event.target.classList.toggle('active');
    }
});
