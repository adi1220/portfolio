document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation to turn hamburger into X could go here
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll Fade Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .hero-content');
    
    sections.forEach(section => {
        section.classList.add('fade-up'); // Initial class logic in CSS (optional) or handled here
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
        observer.observe(section);
    });

    // Add visible class styling dynamically or in CSS
    document.addEventListener('scroll', () => {
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if(rect.top < window.innerHeight - 100) {
                sec.style.opacity = 1;
                sec.style.transform = 'translateY(0)';
            }
        });
    });
});
