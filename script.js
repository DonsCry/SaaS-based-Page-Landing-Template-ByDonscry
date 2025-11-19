// ============== DOM Elements ==============
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTop = document.getElementById('scrollTop');
const body = document.body;

// ============== Theme Toggle ==============
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
};

const updateThemeIcon = (isDark) => {
    if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

// ============== Mobile Menu ==============
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============== Scroll to Top Button ==============
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============== Smooth Scroll for Navigation ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const elementPosition = target.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============== Intersection Observer for Animations ==============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.dataset.animation = 'fadeIn 0.6s ease forwards';
    observer.observe(section);
});

// ============== Testimonials Slider ==============
const initTestimonialsSlider = () => {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || slides.length === 0) return;

    let currentIndex = 0;
    
    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const goToNext = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const goToPrev = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    };

    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);

    // Auto-slide every 5 seconds
    setInterval(goToNext, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrev();
    });
};

// ============== Form Validation ==============
const initFormValidation = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            showNotification('Pesan berhasil dikirim! Kami akan segera membalas.', 'success');
            form.reset();
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
        } else {
            showNotification('Silakan isi semua field dengan benar.', 'error');
        }
    });
};

const validateInput = (input) => {
    const value = input.value.trim();
    
    if (!value) {
        input.style.borderColor = '#ef4444';
        return false;
    }

    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.style.borderColor = '#ef4444';
            return false;
        }
    }

    input.style.borderColor = '#10b981';
    return true;
};

const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// ============== Pricing Modal ==============
const initPricingButtons = () => {
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = btn.parentElement.querySelector('h3').textContent;
            const price = btn.parentElement.querySelector('.price').textContent;
            showNotification(`${planName} dipilih. Lanjutkan ke checkout? ${price}`, 'info');
        });
    });
};

// ============== Hero CTA Buttons ==============
const initHeroButtons = () => {
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    
    heroBtns[0].addEventListener('click', () => {
        showNotification('Proses signup dimulai...', 'info');
        // Simulate scroll to pricing
        document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
    });

    heroBtns[1].addEventListener('click', () => {
        document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
    });
};

// ============== Parallax Effect ==============
const initParallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    });
};

// ============== Navbar Active Link ==============
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
};

// ============== Counting Animation ==============
const initCountingAnimation = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    const incrementCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };

        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                incrementCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
};

// ============== Ripple Effect ==============
const addRippleEffect = (btn) => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
};

// ============== Initialize All ==============
const init = () => {
    console.log('🚀 Initializing TechFlow...');
    
    initTheme();
    initTestimonialsSlider();
    initFormValidation();
    initPricingButtons();
    initHeroButtons();
    initParallax();
    updateActiveLink();
    initCountingAnimation();

    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        addRippleEffect(btn);
    });

    console.log('✅ TechFlow initialized successfully!');
};

// ============== Start on DOM Ready ==============
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============== Custom Animation for ripple ==============
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============== Keyboard Shortcuts ==============
document.addEventListener('keydown', (e) => {
    // Alt + T untuk toggle theme
    if (e.altKey && e.key === 't') {
        themeToggle.click();
    }
    
    // Alt + H untuk scroll to home
    if (e.altKey && e.key === 'h') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============== Performance Monitoring ==============
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);
});

// ============== Console Message ==============
console.log(
    '%cTechFlow Platform',
    'font-size: 20px; font-weight: bold; color: #6366f1;'
);
console.log(
    '%cModern. Fast. Powerful.',
    'font-size: 14px; color: #8b5cf6;'
);
