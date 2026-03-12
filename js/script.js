// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notification container or create new one
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    // Set title based on type
    let title = '';
    switch(type) {
        case 'success':
            title = 'Success';
            break;
        case 'error':
            title = 'Error';
            break;
        case 'warning':
            title = 'Warning';
            break;
        default:
            title = 'Information';
    }
    
    notification.innerHTML = `
        <div class="notification-icon">
            ${icon}
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Add click event to close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                    if (container.children.length === 0) {
                        container.remove();
                    }
                }
            }, 300);
        }
    }, duration);
}

// Sticky Navigation Background Change
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chatbot Functions
function openChatbot() {
    const chatbot = document.getElementById('chatbotPopup');
    if (chatbot) {
        chatbot.style.display = 'block';
        chatbot.classList.add('show');
    }
}

function closeChatbot() {
    const chatbot = document.getElementById('chatbotPopup');
    if (chatbot) {
        chatbot.style.display = 'none';
        chatbot.classList.remove('show');
    }
}

function chatbotResponse(type) {
    const chatbotBody = document.querySelector('.chatbot-body');
    let response = '';
    let notificationMessage = '';
    
    switch(type) {
        case 'services':
            response = 'We offer AI Readiness Audit, Lead Generation Automation, AI Chatbots, Digital Avatars, and Workflow Automation. Which service interests you?';
            break;
        case 'pricing':
            response = 'Our pricing starts from $1,999 for AI Chatbots to $4,999 for custom solutions. Would you like a detailed quote?';
            break;
        case 'consultation':
            response = 'Great! I\'ll take you to our contact page to book a free consultation.';
            notificationMessage = 'Redirecting to consultation booking...';
            showNotification(notificationMessage, 'info', 3000);
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 2000);
            break;
        default:
            response = 'How else can I help you today?';
    }
    
    const newMessage = document.createElement('div');
    newMessage.className = 'chatbot-message';
    newMessage.innerHTML = `
        <p><i class="fas fa-robot" style="color: #6366f1; margin-right: 8px;"></i> ${response}</p>
        <div class="chat-options">
            <button onclick="chatbotResponse('services')"><i class="fas fa-cogs"></i> Services</button>
            <button onclick="chatbotResponse('pricing')"><i class="fas fa-tag"></i> Pricing</button>
            <button onclick="chatbotResponse('consultation')"><i class="fas fa-calendar-check"></i> Book</button>
            <button onclick="closeChatbot()"><i class="fas fa-times"></i> Close</button>
        </div>
    `;
    
    chatbotBody.innerHTML = '';
    chatbotBody.appendChild(newMessage);
}

// AI Score Calculator
function calculateAIScore() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    
    if (!q1 || !q2 || !q3) {
        showNotification('Please answer all questions to calculate your AI score!', 'warning');
        return;
    }
    
    const score1 = parseInt(q1.value);
    const score2 = parseInt(q2.value);
    const score3 = parseInt(q3.value);
    
    const totalScore = Math.round((score1 + score2 + score3) / 3);
    
    document.getElementById('scoreValue').textContent = totalScore + '%';
    document.getElementById('scoreBarFill').style.width = totalScore + '%';
    
    let message = '';
    if (totalScore >= 80) {
        message = 'Excellent! Your business is highly AI-ready. Let\'s discuss advanced AI integration!';
    } else if (totalScore >= 60) {
        message = 'Good progress! You\'re on the right track. We can help you optimize further.';
    } else if (totalScore >= 40) {
        message = 'You\'ve started your AI journey. Let\'s accelerate your transformation!';
    } else {
        message = 'Great potential! Let\'s start your AI journey with a comprehensive readiness audit.';
    }
    
    document.getElementById('scoreMessage').textContent = message;
    document.getElementById('scoreResult').style.display = 'block';
    
    showNotification(`Your AI Readiness Score: ${totalScore}%`, 'success');
    
    document.getElementById('scoreResult').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Resource Filtering
function filterResources(category) {
    const cards = document.querySelectorAll('.resource-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    let visibleCount = 0;
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (visibleCount === 0) {
        showNotification(`No resources found in this category`, 'info');
    }
}

// Form Validation
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        removeError(name);
    }
    
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        removeError(email);
    }
    
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else {
        removeError(message);
    }
    
    if (isValid) {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        document.getElementById('contactForm').reset();
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#ef4444';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#ef4444';
    showNotification(message, 'error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.style.borderColor = '#e5e7eb';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter Form
function submitNewsletter(event) {
    event.preventDefault();
    const email = document.querySelector('.newsletter-form input').value;
    
    if (isValidEmail(email)) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        document.querySelector('.newsletter-form').reset();
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Animate on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature, .case-study-card, .resource-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .feature, .case-study-card, .resource-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
}

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', submitNewsletter);
}

// Auto-hide chatbot popup when clicking outside
document.addEventListener('click', (event) => {
    const chatbot = document.getElementById('chatbotPopup');
    const chatButton = document.querySelector('.chat-button');
    
    if (chatbot && chatButton) {
        if (!chatbot.contains(event.target) && !chatButton.contains(event.target)) {
            chatbot.style.display = 'none';
            chatbot.classList.remove('show');
        }
    }
});

// Booking button handler
function bookConsultation() {
    showNotification('Redirecting to booking calendar...', 'info', 3000);
    setTimeout(() => {
        window.location.href = 'contact.html';
    }, 2000);
}

document.querySelectorAll('.booking-placeholder button, .service-cta').forEach(button => {
    if (button) {
        button.addEventListener('click', bookConsultation);
    }
});

// WhatsApp button handler
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Opening WhatsApp chat...', 'success', 2000);
        setTimeout(() => {
            window.open('https://wa.me/2340000000000', '_blank');
        }, 1000);
    });
}

// Initialize resource cards with data attributes
document.addEventListener('DOMContentLoaded', () => {
    const resourceCards = document.querySelectorAll('.resource-card');
    const categories = ['ai-tools', 'guides', 'case-studies', 'ai-tools', 'guides', 'case-studies'];
    
    resourceCards.forEach((card, index) => {
        card.dataset.category = categories[index % categories.length];
    });
    
    // Welcome notification
    setTimeout(() => {
        showNotification('Welcome to DharmaAI! How can we help you today?', 'info', 4000);
    }, 1000);
});

// Handle window resize events
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add touch support detection
document.addEventListener('touchstart', function() {
    document.documentElement.classList.add('touch-device');
}, { passive: true });

// Prevent zoom on double tap for iOS
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Back to top button functionality (if exists)
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form input cleanup
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.type !== 'textarea') {
            e.preventDefault();
        }
    });
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Initialize any tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        
        element.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});