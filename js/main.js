document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initNavigation();
    initSearchForm();
    initContactForm();
    initSmoothScrolling();
    initAnimations();
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    const locationSelect = document.getElementById('location');
    const dateInput = document.getElementById('date');
    const participantsSelect = document.getElementById('participants');
    const searchButton = document.querySelector('.btn-search');
    
    if (searchForm && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const location = locationSelect.value;
            const date = dateInput.value;
            const participants = participantsSelect.value;
            
            if (!location || !date || !participants) {
                showNotification('Пожалуйста, заполните все поля формы', 'error');
                return;
            }
            
            showNotification('Поиск программ...', 'info');
            
            setTimeout(() => {
                showNotification('Найдено 5 программ для вас!', 'success');
            }, 2000);
        });
    }
}

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showNotification('Пожалуйста, заполните все поля формы', 'error');
                return;
            }
            
            showNotification('Сообщение отправляется...', 'info');
            
            setTimeout(() => {
                showNotification('Сообщение успешно отправлено!', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-item, .destination-card, .about-content');
    animatedElements.forEach(el => observer.observe(el));
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.location) {
        errors.push('Выберите локацию для тура');
    }
    
    if (!formData.date) {
        errors.push('Укажите дату тура');
    }
    
    if (!formData.participants) {
        errors.push('Укажите количество участников');
    }
    
    return errors;
}

const RoomTibetApp = {
    init: initApp,
    showNotification: showNotification,
    validateForm: validateForm
};

window.RoomTibetApp = RoomTibetApp;
