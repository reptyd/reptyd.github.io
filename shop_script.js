document.addEventListener('DOMContentLoaded', () => {
    const cartButton   = document.getElementById('cartButton');
    const modal        = document.getElementById('cartModal');
    const closeButton  = document.getElementById('modalClose');
    const overlay      = document.getElementById('modalOverlay');
  
    function openModal() {
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
  
    // Закрытие по ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  });
  
