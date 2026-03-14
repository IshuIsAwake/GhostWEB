// Reveal elements on scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Initial check

// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const body = document.documentElement;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    body.setAttribute('data-theme', 'dark');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
    }
});

// Subtle parallax effect for hero images (if any)
window.addEventListener('scroll', function() {
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        let scrollPosition = window.pageYOffset;
        heroImg.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
    }
});

// Copy to Clipboard Logic
const copyBtn = document.getElementById('copy-button');
const pipCode = document.getElementById('pip-command');

if (copyBtn && pipCode) {
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(pipCode.innerText);
            
            // Success state
            const originalText = copyBtn.innerHTML;
            copyBtn.classList.add('success');
            copyBtn.innerHTML = '<span>Copied!</span>';
            
            setTimeout(() => {
                copyBtn.classList.remove('success');
                copyBtn.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });
}

// Multiple Copy to Clipboard Logic
const allCopyBtns = document.querySelectorAll('.terminal-copy-btn');

allCopyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy-target');
        const codeBlock = document.getElementById(targetId);
        
        if (codeBlock) {
            try {
                await navigator.clipboard.writeText(codeBlock.innerText);
                
                // Success state
                const originalHtml = btn.innerHTML;
                btn.classList.add('success');
                btn.innerHTML = '<span>Copied!</span>';
                
                setTimeout(() => {
                    btn.classList.remove('success');
                    btn.innerHTML = originalHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    });
});
