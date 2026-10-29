document.addEventListener('DOMContentLoaded', () => {
  // 1. Funcionalidad desplegable para las preguntas "¿Por qué es importante?" (1 al 6)
  const importanceBoxes = document.querySelectorAll('.importance-box');
  
  importanceBoxes.forEach(box => {
    const questionHeader = box.querySelector('strong');
    const answerParagraph = box.querySelector('p');

    if (questionHeader && answerParagraph) {
      // Configurar cursor y diseño para el título desplegable
      questionHeader.style.cursor = 'pointer';
      questionHeader.style.display = 'flex';
      questionHeader.style.justifyContent = 'space-between';
      questionHeader.style.alignItems = 'center';
      
      // Agregar icono indicador de flecha
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-chevron-down';
      icon.style.transition = 'transform 0.3s ease';
      icon.style.fontSize = '0.8rem';
      questionHeader.appendChild(icon);

      // Ocultar la respuesta por defecto al cargar la página
      answerParagraph.style.display = 'none';

      // Evento de clic para alternar visibilidad
      questionHeader.addEventListener('click', () => {
        const isOpen = answerParagraph.style.display === 'block';
        answerParagraph.style.display = isOpen ? 'none' : 'block';
        icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }
  });

  // 2. Control de pestañas para Modelos Tradicionales (Información + Imagen unificada)
  const modelBtns = document.querySelectorAll('.models-filter-buttons .iso-btn');
  const modelBlocks = {
    cascada: document.getElementById('block-cascada'),
    v: document.getElementById('block-v'),
    iterativo: document.getElementById('block-iterativo')
  };

  if (modelBtns.length > 0) {
    modelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedModel = btn.getAttribute('data-model');

        Object.keys(modelBlocks).forEach(key => {
          if (modelBlocks[key]) {
            modelBlocks[key].style.display = (key === selectedModel) ? 'block' : 'none';
          }
        });
      });
    });
  }
});