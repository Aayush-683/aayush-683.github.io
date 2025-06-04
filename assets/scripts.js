const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const themeLabel = document.getElementById('theme-label');
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');
const sunRays = [
    document.getElementById('sun-rays-1'),
    document.getElementById('sun-rays-2'),
    document.getElementById('sun-rays-3'),
    document.getElementById('sun-rays-4'),
    document.getElementById('sun-rays-5'),
    document.getElementById('sun-rays-6'),
    document.getElementById('sun-rays-7'),
    document.getElementById('sun-rays-8'),
];
const resumeIframe = document.getElementById('resume-iframe');
const iframeSpinner = document.getElementById('iframe-spinner');

function showSunIcon() {
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
    sunRays.forEach((line) => (line.style.display = 'block'));
}

function showMoonIcon() {
    iconMoon.style.display = 'block';
    iconSun.style.display = 'none';
    sunRays.forEach((line) => (line.style.display = 'none'));
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light');
    themeSwitch.checked = true;
    themeLabel.textContent = 'Light Mode';
    showSunIcon();
} else {
    body.classList.remove('light');
    themeSwitch.checked = false; // Ensure checkbox is unchecked for dark mode
    themeLabel.textContent = 'Dark Mode';
    showMoonIcon();
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
        themeLabel.textContent = 'Light Mode';
        showSunIcon();
    } else {
        body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        themeLabel.textContent = 'Dark Mode';
        showMoonIcon();
    }
});

// Handle iframe loading for spinner
resumeIframe.onload = () => {
    iframeSpinner.style.display = 'none';
    resumeIframe.classList.add('loaded'); // Apply opacity transition
};

// Fallback for immediate iframe content if load event doesn't fire fast enough
// (e.g., if PDF is cached)
setTimeout(() => {
    if (!resumeIframe.classList.contains('loaded')) {
        iframeSpinner.style.display = 'none';
        resumeIframe.classList.add('loaded');
    }
}, 1000); // Wait 1 second, then assume loaded if no event fired