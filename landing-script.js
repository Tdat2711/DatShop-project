/* ============================================
   LANDING PAGE JAVASCRIPT
   Vanilla JS - No dependencies required
   ============================================ */

// ============ DOM ELEMENTS ============
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const ctaBtn = document.getElementById('ctaBtn');

// ============ NAVBAR FUNCTIONALITY ============

/**
 * Handle navbar scroll effect
 * Adds shadow and changes styling when user scrolls down
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**
 * Toggle mobile menu
 */
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

/**
 * Close mobile menu when a link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

/**
 * Smooth scroll for internal links
 * Works with all navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70; // Navbar height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ SCROLL REVEAL WITH INTERSECTION OBSERVER ============

/**
 * Initialize Scroll Reveal Animation
 * Reveals elements when they come into view
 * Uses Intersection Observer API for better performance
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.feature-card, .benefit-item, .pricing-card, .testimonial-card, .feature-tabs'
    );

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                    entry.target.classList.add('active');
                }, index * 100);

                // Stop observing after element is revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ============ TAB FUNCTIONALITY ============

/**
 * Handle tab switching
 * Shows/hides tab content based on button clicked
 */
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ============ FORM VALIDATION ============

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format (Vietnamese format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
function validatePhone(phone) {
    if (!phone) return true; // Optional field
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Show error message for form field
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    input.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

/**
 * Clear error message for form field
 * @param {HTMLElement} input - Input element
 */
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    input.classList.remove('error');
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

/**
 * Handle form submission
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    let isValid = true;

    // Validate Full Name
    if (!fullNameInput.value.trim()) {
        showError(fullNameInput, 'Vui lòng nhập tên của bạn');
        isValid = false;
    } else if (fullNameInput.value.trim().length < 2) {
        showError(fullNameInput, 'Tên phải có ít nhất 2 ký tự');
        isValid = false;
    } else {
        clearError(fullNameInput);
    }

    // Validate Email
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Vui lòng nhập email của bạn');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Email không hợp lệ (vd: example@gmail.com)');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate Phone (optional but if provided must be valid)
    if (phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Số điện thoại không hợp lệ (vd: 0912345678)');
        isValid = false;
    } else {
        clearError(phoneInput);
    }

    // If form is valid, submit
    if (isValid) {
        submitForm({
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim()
        });
    }
});

/**
 * Handle form submission (simulated)
 * @param {Object} data - Form data
 */
function submitForm(data) {
    console.log('Form submitted with data:', data);

    // Show success message
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '✓ Thành công! Kiểm tra email của bạn';
    submitButton.disabled = true;
    submitButton.style.background = 'rgba(16, 185, 129, 0.5)';

    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';

        // Show alert or notification
        showNotification('Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn sớm.', 'success');
    }, 2000);
}

/**
 * Real-time validation on input
 */
document.getElementById('fullName').addEventListener('blur', function() {
    if (!this.value.trim()) {
        showError(this, 'Vui lòng nhập tên của bạn');
    } else if (this.value.trim().length < 2) {
        showError(this, 'Tên phải có ít nhất 2 ký tự');
    } else {
        clearError(this);
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (!this.value.trim()) {
        showError(this, 'Vui lòng nhập email của bạn');
    } else if (!validateEmail(this.value)) {
        showError(this, 'Email không hợp lệ');
    } else {
        clearError(this);
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (this.value.trim() && !validatePhone(this.value)) {
        showError(this, 'Số điện thoại không hợp lệ');
    } else {
        clearError(this);
    }
});

// ============ NOTIFICATION SYSTEM ============

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideInUp 0.4s ease-out;
        z-index: 9999;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Expose to global scope
window.showNotification = showNotification;

// ============ MICRO-INTERACTIONS ============

/**
 * Add hover animation to buttons
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/**
 * Add ripple effect to buttons (click animation)
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            top: ${y - 10}px;
            left: ${x - 10}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============ CTA BUTTON ============

/**
 * Handle main CTA button click
 * Scroll to contact form
 */
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        // CTA button now opens signup modal via onclick handler
        // This is no longer needed but kept for backward compatibility
    });
}

// ============ PAGE LOAD ANIMATIONS ============

/**
 * Initialize animations on page load
 */
window.addEventListener('load', () => {
    // Initialize scroll reveal
    initScrollReveal();

    // Add fade-in animation to header elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 0.8s ease-out 0.1s backwards';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s backwards';
    }
});

// ============ SMOOTH SCROLL BEHAVIOR ============

/**
 * Add scroll animation class to elements when they come into view
 */
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '1'; // Ensure sections are visible
    sectionObserver.observe(section);
});

// ============ KEYBOARD ACCESSIBILITY ============

/**
 * Handle keyboard navigation for tabs
 */
document.querySelectorAll('.tab-btn').forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        let nextButton;

        if (e.key === 'ArrowRight') {
            nextButton = tabButtons[index + 1] || tabButtons[0];
        } else if (e.key === 'ArrowLeft') {
            nextButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
        }

        if (nextButton) {
            e.preventDefault();
            nextButton.focus();
            nextButton.click();
        }
    });
});

// ============ PERFORMANCE OPTIMIZATION ============

/**
 * Debounce function to optimize scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for frequent events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============ FEATURE CARD ANIMATIONS ============

/**
 * Add parallax effect to feature cards on scroll
 */
window.addEventListener('scroll', throttle(() => {
    document.querySelectorAll('.feature-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;

        if (scrollPercent > 0 && scrollPercent < 2) {
            card.style.transform = `translateY(${scrollPercent * 10}px)`;
        }
    });
}, 100));

// ============ INITIALIZATION ============

/**
 * Initialize all scripts on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('ForgetMeNot Landing Page loaded successfully!');

    // Ensure first tab is active by default
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        if (tabPanes.length > 0) {
            tabPanes[0].classList.add('active');
        }
    }

    // Initialize scroll reveal
    initScrollReveal();
});

// ============ UTILITY ANIMATIONS ============

/**
 * Add pulse animation to CTA buttons
 */
const addPulseAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }

        @keyframes slideInUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideOutDown {
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

addPulseAnimation();

// ============ SCROLL PROGRESS INDICATOR (Optional) ============

/**
 * Show scroll progress at top of page
 */
const showScrollProgress = () => {
    const scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', throttle(() => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }, 50));
};

// Uncomment to enable scroll progress indicator
// showScrollProgress();

console.log('✓ All JavaScript modules loaded successfully!');
