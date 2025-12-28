// -------------------------
// Плавный скролл по якорям
// -------------------------
document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// -------------------------
// Мобильное меню (бургер)
// -------------------------
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    if (getComputedStyle(navLinks).display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}
window.toggleMenu = toggleMenu; // нужно, чтобы вызывалось из HTML

// -------------------------
// Анимация секций при скролле
// -------------------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ------------------------------------
// Тень и плавное скрытие/показ хедера
// ------------------------------------
let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;

    const currentY = window.pageYOffset || document.documentElement.scrollTop;

    // Тень при скролле
    if (currentY > 80) {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }

    // Плавное скрытие/показ через translateY
    if (currentY > lastScrollY && currentY > 80) {
        // Скролл вниз — прячем шапку
        header.style.transform = 'translateY(-100%)';
    } else {
        // Скролл вверх или почти вверху — показываем
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentY <= 0 ? 0 : currentY;
});

// -------------------------
// Форма брони столика
// -------------------------
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('orderName').value.trim();
        const phone = document.getElementById('orderPhone').value.trim();
        const date = document.getElementById('orderDate').value;
        const time = document.getElementById('orderTime').value;
        const people = document.getElementById('orderPeople').value;
        const extra = document.getElementById('orderExtra').value.trim();

        if (!name || !phone || !date || !time || !people) {
            showMessage('orderMessage', 'Пожалуйста, заполните все обязательные поля.', 'error');
            return;
        }

        // Простая проверка телефона
        if (!/^\+?[\d\s\-()]{10,}$/.test(phone)) {
            showMessage('orderMessage', 'Введите корректный номер телефона.', 'error');
            return;
        }

        const bookingData = {
            name,
            phone,
            date,
            time,
            people,
            extra,
            timestamp: new Date().toLocaleString()
        };

        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        showMessage(
            'orderMessage',
            `Бронь на ${date} в ${time} для ${people} чел. оформлена, ${name}!`,
            'success'
        );

        this.reset();
    });
}

// -------------------------
// Контактная форма
// -------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            showMessage('contactMessageResult', 'Пожалуйста, заполните все поля.', 'error');
            return;
        }

        if (name.length < 2) {
            showMessage('contactMessageResult', 'Имя должно содержать минимум 2 символа.', 'error');
            return;
        }

        if (message.length < 10) {
            showMessage('contactMessageResult', 'Сообщение должно содержать минимум 10 символов.', 'error');
            return;
        }

        const contactData = {
            name,
            email,
            message,
            timestamp: new Date().toLocaleString()
        };

        const messages = JSON.parse(localStorage.getItem('contacts') || '[]');
        messages.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(messages));

        showMessage('contactMessageResult', `Спасибо, ${name}! Сообщение отправлено.`, 'success');

        this.reset();
    });
}

// -------------------------
// Универсальная функция сообщений
// -------------------------
function showMessage(elementId, text, type) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = text;
    el.className = `form-message ${type}`;
    el.style.display = 'block';
    setTimeout(() => {
        el.style.display = 'none';
    }, 5000);
}
