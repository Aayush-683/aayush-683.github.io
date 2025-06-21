const themeSwitch = document.getElementById('theme-switch'); // Desktop theme switch
const themeLabel = document.getElementById('theme-label');

const themeSwitchMobile = document.getElementById('theme-switch-mobile'); // Mobile theme switch
const themeLabelMobile = document.getElementById('theme-label-mobile');

const resumeIframe = document.getElementById('pdf-container');
const iframeSpinner = document.getElementById('iframe-spinner');

const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light');
        themeSwitch.checked = false;
        themeSwitchMobile.checked = false;
    } else {
        body.classList.remove('light');
        themeSwitch.checked = true;
        themeSwitchMobile.checked = true;
    }
    localStorage.setItem('theme', theme);
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme || 'dark'); // Default to dark if no theme is saved

// Event listeners for theme switches
themeSwitch.addEventListener('change', () => {
    applyTheme(themeSwitch.checked ? 'dark' : 'light');
});

themeSwitchMobile.addEventListener('change', () => {
    applyTheme(themeSwitchMobile.checked ? 'dark' : 'light');
});

// Handle iframe loading for spinner on resume page
if (resumeIframe) {
    resumeIframe.onload = () => {
        iframeSpinner.style.display = 'none';
        resumeIframe.classList.add('loaded'); // Apply opacity transition
    };

    // Fallback for immediate iframe content if load event doesn't fire fast enough
    setTimeout(() => {
        if (!resumeIframe.classList.contains('loaded')) {
            iframeSpinner.style.display = 'none';
            resumeIframe.classList.add('loaded');
        }
    }, 1000);

    // PDF.js setup

    // Ensure PDF.js is loaded
    if (typeof pdfjsLib === 'undefined' || typeof pdfjsViewer === 'undefined') {
        console.error('PDF.js library is not loaded.');
    }

    const pdfUrl = 'https://aayush-683.github.io/assets/resume.pdf';

    const CMAP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/';
    const CMAP_PACKED = true;

    const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED
    });

    loadingTask.promise.then((pdf) => {
        const eventBus = new pdfjsViewer.EventBus();
        const linkService = new pdfjsViewer.PDFLinkService({ eventBus });

        const viewer = new pdfjsViewer.PDFViewer({
            container: document.getElementById('pdf-container'),
            eventBus,
            linkService,
        });

        linkService.setViewer(viewer);
        viewer.setDocument(pdf);

        // Set zoom after document is loaded
        viewer.currentScaleValue = 'page-width';  // or 'page-fit'
    });

}

// Mobile menu toggle functionality
menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
});

// Close mobile menu when clicking inside the menu
mobileNav.addEventListener('click', (event) => {
    if (event.target === mobileNav) {
        body.classList.remove('menu-open');
    }
});