// Preloader and Entry Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const topBar = document.querySelector('.top-bar');

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                if (header) header.classList.add('loaded');
                if (nav) nav.classList.add('loaded');
                if (topBar) topBar.classList.add('loaded');
            }, 400);
        }, 1800);
    } else {
        if (nav) nav.classList.add('loaded');
        if (topBar) topBar.classList.add('loaded');
    }
});

// Reveal elements on scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// Dark Mode Toggle — Light is the default
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const root = document.documentElement;

// Only apply dark if explicitly saved — light is default
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'block';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (darkIcon) darkIcon.style.display = 'block';
            if (lightIcon) lightIcon.style.display = 'none';
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (darkIcon) darkIcon.style.display = 'none';
            if (lightIcon) lightIcon.style.display = 'block';
        }
    });
}

// Copy to Clipboard — all terminal copy buttons
const allCopyBtns = document.querySelectorAll('.terminal-copy-btn');
allCopyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy-target');
        const codeBlock = document.getElementById(targetId);
        if (codeBlock) {
            try {
                await navigator.clipboard.writeText(codeBlock.innerText);
                const originalHtml = btn.innerHTML;
                btn.classList.add('success');
                btn.innerHTML = '<span>Copied!</span>';
                setTimeout(() => {
                    btn.classList.remove('success');
                    btn.innerHTML = originalHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    });
});

// TOC Scrollspy — highlight active section in left nav
function updateTOC() {
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('nav [data-toc]');
    if (!sections.length || !navLinks.length) return;

    let current = '';
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < 200) {
            current = section.getAttribute('data-section');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('toc-active');
        if (link.getAttribute('data-toc') === current) {
            link.classList.add('toc-active');
        }
    });
}
window.addEventListener('scroll', updateTOC);
updateTOC();
