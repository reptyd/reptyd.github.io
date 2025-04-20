
window.addEventListener('load', () => {
    // Переключение темы
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.addEventListener('change', () => {
        const darkMode = themeSelect.value === 'dark';
        document.body.classList.toggle('dark-mode', darkMode);
    });

    // Переключение языка
    const langSelect = document.getElementById('langSelect');
    const translations = {
        en: {
            welcome: 'Welcome to PlushZoo!',
            introText: 'The best plush toys for all ages. Animals, plants, insects, and game characters!',
            toys: 'Meet the toy',
            aboutUs: 'Get to know us better!',
            advantages: 'Our Advantages',
            specs: 'Toy Specifications',
            main: 'Home',
            toysNav: 'Toys',
            aboutNav: 'About Us',
            contacts: 'Contacts',
            cart: 'Cart'
        },
        ru: {
            welcome: 'Добро пожаловать в PlushZoo!',
            introText: 'Лучшие плюшевые игрушки для всех возрастов. Животные, растения, насекомые и герои из любимых игр!',
            toys: 'Познакомься с игрушкой',
            aboutUs: 'Познакомьтесь с нами ближе!',
            advantages: 'Наши преимущества',
            specs: 'Характеристики игрушек',
            main: 'Главная',
            toysNav: 'Игрушки',
            aboutNav: 'О нас',
            contacts: 'Контакты',
            cart: 'Корзина'
        }
    };

    langSelect.addEventListener('change', () => {
        const lang = translations[langSelect.value];

        document.querySelector('.intro h2').textContent = lang.welcome;
        document.querySelector('.intro p').textContent = lang.introText;
        document.querySelector('.carousel-section h2').textContent = lang.toys;
        document.querySelector('.video-section h2').textContent = lang.aboutUs;
        document.querySelector('.features h2').textContent = lang.advantages;
        document.querySelector('.specs h2').textContent = lang.specs;

        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks[0].textContent = lang.main;
        navLinks[1].textContent = lang.toysNav;
        navLinks[2].textContent = lang.aboutNav;
        navLinks[3].textContent = lang.contacts;

        document.querySelector('#cart-punkt').textContent = lang.cart;
    });

    // Анимации появления
    const fadeElements = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));

    // Карусель
    const carousel = document.getElementById('carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const titleSpan = document.getElementById('carouselTitle');
    let index = 0;

    function updateCarousel() {
        const width = carouselItems[0].clientWidth;
        carousel.style.transform = `translateX(-${index * width}px)`;
        const title = carouselItems[index].getAttribute('data-title');
        if (titleSpan && title) {
            titleSpan.textContent = title;
        }
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        index = (index + 1) % carouselItems.length;
        updateCarousel();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        index = (index - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    // Привязка звуков по клику на изображение
    carouselItems.forEach((item, i) => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            const audio = new Audio(`audio/${i + 1}.mp3`);
            audio.play().catch(err => {
                console.error(`Ошибка при воспроизведении audio/${i + 1}.mp3:`, err);
            });
        });
    });
    
});
