document.addEventListener('DOMContentLoaded', function () {
    function detectOrientation() {
        if (window.innerWidth < window.innerHeight) {
            showOrientationWarning();
        } else {
            hideOrientationWarning();
        }
    }

    function showOrientationWarning() {
        let warning = document.getElementById('orientationWarning');
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'orientationWarning';
            warning.innerHTML = '<h1>Please Rotate Your Device</h1>';
            document.body.appendChild(warning);
        }
    }

    function hideOrientationWarning() {
        const warning = document.getElementById('orientationWarning');
        if (warning) {
            warning.remove();
        }
    }

    detectOrientation();
    window.addEventListener('resize', detectOrientation);
});
