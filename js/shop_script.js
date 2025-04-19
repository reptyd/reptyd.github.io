document.addEventListener('DOMContentLoaded', () => {
    // Объект корзины и прайс-лист
    const cart = {};
    const prices = {
        'Собачка': 1200,
        'Овечка': 900,
        'Коровка': 1500,
        'Уточка': 700,
        'Котик': 1100
    };

    // Элементы модального окна и кнопки
    const cartButton = document.getElementById('cartButton');
    const modal = document.getElementById('cartModal');
    const closeButton = document.getElementById('modalClose');
    const overlay = document.getElementById('modalOverlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const addButtons = document.querySelectorAll('.ajax_add_to_cart');

    // Открыть/закрыть модалку
    function openModal() {
        updateCart();
        modal.classList.add('active');
    }
    function closeModal() {
        modal.classList.remove('active');
    }

    cartButton.addEventListener('click', e => {
        e.preventDefault();
        openModal();
    });
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Добавление товара в корзину
    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemElem = btn.closest('.carousel-item');
            const title = itemElem.getAttribute('data-title');
            cart[title] = (cart[title] || 0) + 1;
        });
    });

    // Обновление содержимого корзины
    function updateCart() {
        if (Object.keys(cart).length === 0) {
            cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
            return;
        }

        let totalPrice = 0;
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                </tr>
            </thead>
        `;
        const tbody = document.createElement('tbody');

        Object.keys(cart).forEach(title => {
            const qty = cart[title];
            const price = prices[title] || 0;
            const sum = price * qty;
            totalPrice += sum;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${title}</td>
                <td>${price} ₽</td>
                <td class="qty-cell">
                    <button class="decrease" data-title="${title}">-</button>
                    <span class="quantity">${qty}</span>
                    <button class="increase" data-title="${title}">+</button>
                </td>
                <td>${sum} ₽</td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        const footer = document.createElement('div');
        footer.classList.add('cart-total');
        footer.innerHTML = `<strong>Итоговая цена:</strong> ${totalPrice} ₽`;

        // Вставляем в контейнер
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(table);
        cartItemsContainer.appendChild(footer);

        // Привязываем обработчики на +/-
        cartItemsContainer.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                cart[title] = (cart[title] || 0) + 1;
                updateCart();
            });
        });
        cartItemsContainer.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                cart[title]--;
                if (cart[title] <= 0) delete cart[title];
                updateCart();
            });
        });
    }
});
