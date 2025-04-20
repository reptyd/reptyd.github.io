document.addEventListener('DOMContentLoaded', () => {
  // 1. Объект корзины и прайс‑лист
  const cart = {};
  const prices = {
    'Собачка': 1200,
    'Овечка': 900,
    'Коровка': 1500,
    'Уточка': 700,
    'Котик': 1100
  };

  // 2. Элементы первого модала
  const cartButton         = document.getElementById('cartButton');
  const modal              = document.getElementById('cartModal');
  const closeButton        = document.getElementById('modalClose');
  const overlay            = document.getElementById('modalOverlay');
  const cartItemsContainer = document.querySelector('.cart-items');
  const addButtons         = document.querySelectorAll('.ajax_add_to_cart');

  // 3. Открыть/закрыть корзину
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

  // 4. Добавление товара в корзину
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const itemElem = btn.closest('.carousel-item');
      const title = itemElem.getAttribute('data-title');
      cart[title] = (cart[title] || 0) + 1;
    });
  });

  // 5. Обновление содержимого корзины
  function updateCart() {
    // Если корзина пуста
    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
      return;
    }

    // Сборка таблицы
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
      const qty   = cart[title];
      const price = prices[title] || 0;
      const sum   = price * qty;
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

    // Кнопка "Далее"
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Далее';
    nextBtn.className   = 'cart-next-btn';

    // Итоговая сумма
    const footer = document.createElement('div');
    footer.classList.add('cart-total');
    footer.innerHTML = `<strong>Итоговая цена:</strong> ${totalPrice} ₽`;

    // Вставляем в контейнер
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.appendChild(table);
    cartItemsContainer.appendChild(nextBtn);
    cartItemsContainer.appendChild(footer);

    // Обработчики кнопок +/−
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

  // 6. Второе модальное окно — доставка
  const deliveryModal  = document.getElementById('deliveryModal');
  const deliveryClose  = document.getElementById('deliveryClose');
  const deliveryForm   = document.getElementById('deliveryForm');

  function openDelivery() {
    closeModal();               // прячет корзину
    deliveryModal.classList.add('active');
  }
  function closeDelivery() {
    deliveryModal.classList.remove('active');
  }

  // Открыть форму при клике "Далее"
  cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('cart-next-btn')) {
      openDelivery();
    }
  });

  // Закрыть форму доставки
  deliveryClose.addEventListener('click', closeDelivery);
  deliveryModal.addEventListener('click', e => {
    if (e.target === deliveryModal) closeDelivery();
  });

  // Обработка отправки формы
  deliveryForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(deliveryForm);
    console.log('Данные доставки:', Object.fromEntries(data.entries()));
    closeDelivery();
    alert('Спасибо! Ваш заказ оформлен.');
  });
});
