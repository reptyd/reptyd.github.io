document.addEventListener('DOMContentLoaded', () => {
  // Корзина и прайс-лист
  const cart = {};
  const prices = {
      'Собачка': 1200,
      'Овечка': 900,
      'Коровка': 1500,
      'Уточка': 700,
      'Котик': 1100
  };

  const cartItemsContainer = document.querySelector('.cart-items');
  const addButtons = document.querySelectorAll('.ajax_add_to_cart');

  // Добавление товара в корзину
  addButtons.forEach(button => {
      button.addEventListener('click', () => {
          const itemElem = button.closest('.carousel-item');
          const itemName = itemElem.dataset.title;
          if (cart[itemName]) {
              cart[itemName]++;
          } else {
              cart[itemName] = 1;
          }
          updateCart();
      });
  });

  // Обновление отображения корзины
  function updateCart() {
      const itemNames = Object.keys(cart);
      if (itemNames.length === 0) {
          cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
          return;
      }
      let totalPrice = 0;
      const rows = itemNames.map(name => {
          const qty = cart[name];
          const sum = prices[name] * qty;
          totalPrice += sum;
          return `<tr><td>${name}</td><td>${qty} шт</td><td>${sum} руб</td></tr>`;
      }).join('');
      const html = `
          <table class='cart-table'>
              <thead>
                  <tr><th>Товар</th><th>Количество</th><th>Сумма</th></tr>
              </thead>
              <tbody>
                  ${rows}
              </tbody>
              <tfoot>
                  <tr><td colspan="2">Итоговая цена</td><td>${totalPrice} руб</td></tr>
              </tfoot>
          </table>`;
      cartItemsContainer.innerHTML = html;
  }

  // Модальное окно корзины
  const cartButton = document.getElementById('cartButton');
  const modal = document.getElementById('cartModal');
  const closeButton = document.getElementById('modalClose');
  const overlay = document.getElementById('modalOverlay');

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
});
