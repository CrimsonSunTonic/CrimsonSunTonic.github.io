/**
 * Footer Enhancements
 * Adds interactivity and dynamic features to the footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Auto-update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Back to top functionality
    const backToTopLink = document.querySelector('.footer-bottom-links a');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }

    // Add parallax effect to footer accent on scroll
    const footerAccentTop = document.querySelector('.footer-accent-top');
    if (footerAccentTop) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxStrength = 0.5;
            footerAccentTop.style.backgroundPosition = (scrollPosition * parallaxStrength) + 'px 0';
        });
    }

    // Animate footer sections on scroll into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe footer sections
    document.querySelectorAll('.footer-section-left, .footer-section-center, .footer-section-right').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
