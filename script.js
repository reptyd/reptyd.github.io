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
            popularToys: 'Popular toys',
            moreDetails: 'More details',
            aboutUs: 'About Us',
            contacts: 'Contacts',
            main: 'Home'
        },
        ru: {
            welcome: 'Добро пожаловать в PlushZoo!',
            introText: 'Лучшие плюшевые игрушки для всех возрастов. Животные, растения, насекомые и герои из любимых игр!',
            popularToys: 'Популярные игрушки',
            moreDetails: 'Подробнее',
            aboutUs: 'О нас',
            contacts: 'Контакты',
            main: 'Главная'
        }
    };

    langSelect.addEventListener('change', () => {
        const lang = translations[langSelect.value];

        document.querySelector('.intro h2').textContent = lang.welcome;
        document.querySelector('.intro p').textContent = lang.introText;
        document.querySelector('.catalog h2').textContent = lang.popularToys;

        document.querySelectorAll('.product-card button').forEach(btn => {
            btn.textContent = lang.moreDetails;
        });

        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks[0].textContent = lang.main;
        navLinks[1].textContent = lang.popularToys;
        navLinks[2].textContent = lang.aboutUs;
        navLinks[3].textContent = lang.contacts;
    });

    // Tilt эффект
    VanillaTilt.init(document.querySelectorAll(".product-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
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

    // Карусель (5 изображений)
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

    // Привязка звуков по индексу
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
