'use strict';

function startGame() {
    const difficulty = prompt('Выберите диапазон чисел:\n1 - от 1 до 10 (легко)\n2 - от 1 до 50 (средне)\n3 - от 1 до 100 (сложно)');
    if (difficulty === null) {
        alert('Вы отменили игру!');
        return;
    }
    let min, max;
    if (difficulty === '1') { min = 1; max = 10; }
    else if (difficulty === '2') { min = 1; max = 50; }
    else if (difficulty === '3') { min = 1; max = 100; }
    else { alert('Ошибка! Введите 1, 2 или 3.'); startGame(); return; }
    const secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let attempts = 5;
    let guessed = false;
    while (attempts > 0 && !guessed) {
        const userInput = prompt(`Угадайте число от ${min} до ${max}. Осталось попыток: ${attempts}`);
        if (userInput === null) { alert('Вы отменили игру!'); return; }
        const userNumber = parseInt(userInput, 10);
        if (isNaN(userNumber) || userNumber < min || userNumber > max || userInput !== String(userNumber)) {
            alert(`Ошибка! Введите целое число от ${min} до ${max}.`);
            continue;
        }
        attempts--;
        if (userNumber === secretNumber) {
            alert(`Поздравляем! Вы угадали число ${secretNumber}! Вы победили!`);
            guessed = true;
        } else if (userNumber < secretNumber) {
            alert(`Введенное число МЕНЬШЕ загаданного. Осталось попыток: ${attempts}`);
        } else if (userNumber > secretNumber) {
            alert(`Введенное число БОЛЬШЕ загаданного. Осталось попыток: ${attempts}`);
        }
    }
    if (!guessed && attempts === 0) {
        alert(`Игра окончена! Загаданное число было: ${secretNumber}`);
        const playAgain = confirm('Хотите сыграть еще раз?');
        if (playAgain) { startGame(); }
        else { alert('Спасибо за игру!'); }
    } else if (guessed) {
        const playAgain = confirm('Хотите сыграть еще раз?');
        if (playAgain) { startGame(); }
        else { alert('Спасибо за игру!'); }
    }
}

// Валидация формы заказа такси

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    if (!productForm) return;
    const Name = document.getElementById('name');
    const Email = document.getElementById('email');
    const Phone = document.getElementById('phone');
    const Product = document.getElementById('product');
    const Quantity = document.getElementById('quantity');
    const productResult = document.getElementById('productResult');
    const productSubmit = document.getElementById('productSubmit');

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        let valid = true;
        if (!Name.value.trim().match(/^[А-Яа-яЁёA-Za-z]{2,30}$/)) {
            showError('nameError', 'Имя должно состоять только из букв от 2 до 30 символов'); valid = false;
        }
        if (!Email.value.includes('@') || !Email.value.includes('.')) {
            showError('emailError', 'Введите корректный e-mail'); valid = false;
        }
        const phoneDigits = Phone.value.replace(/\D/g, '');
        if (phoneDigits.length !== 11 || phoneDigits[0] !== '8') {
            showError('phoneError', 'Введите телефон: 8XXXXXXXXXX (11 цифр)'); valid = false;
        }
        const formattedPhone = phoneDigits.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2-$3-$4-$5');
        if (!Product.value) {
            showError('productError', 'Выберите класс такси'); valid = false;
        }
        if (!Quantity.value) {
            showError('quantityError', 'Выберите количество пассажиров'); valid = false;
        }
        const quantityNum = Quantity.value; 
        if (!valid) {
            productResult.style.color = 'red';
            productResult.textContent = 'Пожалуйста, исправьте ошибки выше';
            return;
        }
        const output = `Ваш заказ такси:\nИмя: ${Name.value}\nE-mail: ${Email.value}\nТелефон: ${Phone.value}\nКласс: ${Product.value}\nКоличество: ${quantityNum}`;
        alert(output);
        productResult.style.color = 'black';
        productResult.textContent = output;
    });

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }
    function clearErrors() {
        ['nameError', 'emailError', 'phoneError', 'productError', 'quantityError'].forEach(id => {
            document.getElementById(id).textContent = '';
        });
    }

    // Изменение кнопки (Изменение в CSS)

    productSubmit.addEventListener('mouseover', () => {
        productSubmit.style.backgroundColor = '#221db4';
        productSubmit.style.transform = 'scale(1.05)';
    });
    productSubmit.addEventListener('mouseout', () => {
        productSubmit.style.backgroundColor = '';
        productSubmit.style.transform = 'scale(1)';
    });

    // Скрыть заголовок формы при клике (Изменение в CSS)

    document.getElementById('taxiHeader').addEventListener('click', function () {
        this.style.display = 'none';
    });
});
