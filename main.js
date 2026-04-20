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

    // Research Page dynamic background fade
    if (document.body.classList.contains('research-page')) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            // Fade from 0 to 0.85 over the first 80vh of scrolling
            let opacity = (scrollY / (windowHeight * 0.8)) * 0.85;
            opacity = Math.min(0.85, Math.max(0, opacity));
            document.body.style.setProperty('--bg-opacity', opacity);
        });
    }
});
