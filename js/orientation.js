// Orientation detection and warning functionality
document.addEventListener('DOMContentLoaded', function () {
    // Function to detect the orientation of the device
    function detectOrientation() {
        if (window.innerWidth < window.innerHeight) {
            showOrientationWarning();
        } else {
            hideOrientationWarning();
        }
    }

    // Function to show the orientation warning
    function showOrientationWarning() {
        const warning = document.getElementById('orientationWarning');
        if (!warning) {
            const orientationDiv = document.createElement('div');
            orientationDiv.id = 'orientationWarning';
            orientationDiv.innerHTML = '<h1>Please Rotate Your Device</h1>';
            document.body.appendChild(orientationDiv);
        }
    }

    // Function to hide the orientation warning
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
});