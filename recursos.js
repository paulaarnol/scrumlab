document.addEventListener('DOMContentLoaded', () => {
  // 1. LÓGICA DE FILTRADO Y BÚSQUEDA DEL GLOSARIO
  const searchInput = document.getElementById('glossarySearch');
  const clearBtn = document.getElementById('clearSearch');
  const letterBtns = document.querySelectorAll('.alphabet-bar .letter-btn');
  const letterSections = document.querySelectorAll('.letter-section');
  const noResults = document.getElementById('noResults');

  let activeLetter = 'ALL';

  function filterGlossary() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleTermsCount = 0;

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    letterSections.forEach(section => {
      const sectionLetter = section.getAttribute('data-letter');
      const cards = section.querySelectorAll('.term-card');
      let sectionVisibleCount = 0;

      cards.forEach(card => {
        const term = card.getAttribute('data-term');
        const def = card.getAttribute('data-def');
        const matchesQuery = !query || term.includes(query) || def.includes(query);
        const matchesLetter = activeLetter === 'ALL' || sectionLetter === activeLetter;

        if (matchesQuery && matchesLetter) {
          card.style.display = 'flex';
          sectionVisibleCount++;
          visibleTermsCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (sectionVisibleCount > 0) {
        section.style.display = 'flex';
      } else {
        section.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleTermsCount === 0 ? 'block' : 'none';
    }
  }

  // Filtrado al hacer clic en los botones de letras A-Z
  letterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('disabled')) return;

      letterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeLetter = btn.getAttribute('data-letter');
      filterGlossary();
    });
  });

  // Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', filterGlossary);
  }

  // Botón para limpiar la barra de búsqueda
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterGlossary();
      searchInput.focus();
    });
  }

  // 2. LÓGICA DEL ACORDEÓN DE PREGUNTAS FRECUENTES (DESPLEGABLE)
  const faqDarkItems = document.querySelectorAll('.faq-dark-item');

  faqDarkItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-dark-question');
    const answer = item.querySelector('.faq-dark-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });
});