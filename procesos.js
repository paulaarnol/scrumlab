document.addEventListener('DOMContentLoaded', () => {
  const modelBtns = document.querySelectorAll('.models-filter-buttons .iso-btn');
  const modelCards = {
    cascada: document.getElementById('model-cascada'),
    v: document.getElementById('model-v'),
    iterativo: document.getElementById('model-iterativo')
  };

  if (modelBtns.length > 0) {
    modelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedModel = btn.getAttribute('data-model');

        Object.keys(modelCards).forEach(key => {
          if (modelCards[key]) {
            if (key === selectedModel) {
              modelCards[key].style.display = 'flex';
            } else {
              modelCards[key].style.display = 'none';
            }
          }
        });
      });
    });
  }
});