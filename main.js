// Simple animation observer for scroll reveals
document.addEventListener('DOMContentLoaded', () => {
    
    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.style.background = 'linear-gradient(90deg, #00ff88, #00d4ff)';
            
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // Add scroll reveal animation class
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Timeline Animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });

        // Timeline Scroll Line
        const timelineContainer = document.querySelector('.timeline-container');
        window.addEventListener('scroll', () => {
            if (!timelineContainer) return;
            const scrollY = window.scrollY;
            const containerTop = timelineContainer.offsetTop;
            const containerHeight = timelineContainer.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate how far we've scrolled into the container
            let percentage = ((scrollY + windowHeight / 2) - containerTop) / containerHeight * 100;
            
            // Clamp between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            timelineContainer.style.setProperty('--line-height', `${percentage}%`);
        });
    }

    // Research Page dynamic background fade & zoom
    if (document.body.classList.contains('research-page')) {
        const bgZoom = document.querySelector('.bg-zoom-container');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Fade from 0 to 0.85 over the first 80vh of scrolling
            let opacity = (scrollY / (windowHeight * 0.8)) * 0.85;
            opacity = Math.min(0.85, Math.max(0, opacity));
            document.body.style.setProperty('--bg-opacity', opacity);

            // Smooth zoom effect
            if (bgZoom) {
                // Scales from 1.0 to 1.15 as you scroll down
                const zoomFactor = 1 + (scrollY / (windowHeight * 1.5)) * 0.15;
                bgZoom.style.transform = `scale(${Math.min(1.3, zoomFactor)})`;
            }
        });
    }

    // Mobile Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            });
        });
    }
});
