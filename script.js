document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.section__title, .concept__text, .feature-item, .facility-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add CSS for visibility
    const style = document.createElement('style');
    style.textContent = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.header__menu-toggle');
    const headerNav = document.querySelector('.header__nav');

    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            
            // Simple mobile menu toggle logic
            if (headerNav.style.display === 'block') {
                headerNav.style.display = '';
            } else {
                headerNav.style.display = 'block';
                // Inline styles for mobile menu overlay (simplified)
                headerNav.style.position = 'fixed';
                headerNav.style.top = '70px';
                headerNav.style.left = '0';
                headerNav.style.width = '100%';
                headerNav.style.height = 'calc(100vh - 70px)';
                headerNav.style.background = '#fff';
                headerNav.style.padding = '2rem';
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 768 && headerNav.style.display === 'block') {
                    menuToggle.click();
                }
            }
        });
    });
});
