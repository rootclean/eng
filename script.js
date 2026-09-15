// === ПЕРЕМЕННЫЕ ===
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Установить общее количество слайдов
totalSlidesEl.textContent = totalSlides;

// === ПОКАЗ СЛАЙДА ===
function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    currentIndex = index;
    currentSlideEl.textContent = index + 1;
    progressFill.style.width = ((index + 1) / totalSlides * 100) + '%';
}

// === НАВИГАЦИЯ ===
function nextSlide() {
    if (currentIndex < totalSlides - 1) showSlide(currentIndex + 1);
}

function prevSlide() {
    if (currentIndex > 0) showSlide(currentIndex - 1);
}

// === КНОПКИ ===
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// === КЛАВИАТУРА ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        showSlide(0);
    } else if (e.key === 'End') {
        showSlide(totalSlides - 1);
    }
});

// === СВАЙПЫ (для телефона) ===
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();  // свайп влево
        else prevSlide();           // свайп вправо
    }
}, { passive: true });

// === КОЛЕСО МЫШИ (осторожно, чтобы не срабатывало слишком часто) ===
let wheelLock = false;
document.addEventListener('wheel', (e) => {
    if (wheelLock) return;
    wheelLock = true;
    setTimeout(() => wheelLock = false, 800);

    if (e.deltaY > 0) nextSlide();
    else if (e.deltaY < 0) prevSlide();
}, { passive: true });

// === СТАРТ ===
showSlide(0);
