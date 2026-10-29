document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.survey-step');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const navButtons = document.getElementById('surveyNavButtons');
  const surveyResultContainer = document.getElementById('surveyResultContainer');
  const restartSurveyBtn = document.getElementById('restartSurveyBtn');
  const resultBarsList = document.getElementById('resultBarsList');
  const interpretationText = document.getElementById('interpretationText');

  const methodologyNames = {
    scrum: "Scrum",
    cascada: "Cascada",
    xp: "XP",
    kanban: "Kanban",
    modeloV: "Modelo V",
    iterativo: "Iterativo e Incremental"
  };

  let currentStep = 0;

  function updateSurveyView() {
    steps.forEach((step, index) => {
      step.style.display = (index === currentStep) ? 'block' : 'none';
    });

    if (currentStep === 0) {
      prevBtn.style.opacity = '0.5';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }

    if (currentStep === steps.length - 1) {
      nextBtn.textContent = 'Finalizar encuesta';
    } else {
      nextBtn.textContent = 'Siguiente';
    }
  }

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateSurveyView();
    } else {
      calculateResults();

      document.getElementById('surveyStepContainer').style.display = 'none';
      navButtons.style.display = 'none';
      surveyResultContainer.style.display = 'block';
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateSurveyView();
    }
  });

  restartSurveyBtn.addEventListener('click', () => {
    currentStep = 0;
    surveyResultContainer.style.display = 'none';
    document.getElementById('surveyStepContainer').style.display = 'block';
    navButtons.style.display = 'flex';
    updateSurveyView();
    
    steps.forEach(step => {
      const firstRadio = step.querySelector('input[type="radio"]');
      if (firstRadio) firstRadio.checked = true;
    });
  });

  function calculateResults() {
    const scores = {
      scrum: 0,
      cascada: 0,
      xp: 0,
      kanban: 0,
      modeloV: 0,
      iterativo: 0
    };

    for (let i = 1; i <= 4; i++) {
      const selected = document.querySelector(`input[name="p${i}"]:checked`);
      if (selected) {
        const val = selected.value;
        if (scores[val] !== undefined) {
          scores[val] += 1;
        }
      }
    }

    const totalQuestions = 4;
    let resultsArray = Object.keys(scores).map(key => {
      return {
        name: methodologyNames[key],
        percentage: Math.round((scores[key] / totalQuestions) * 100)
      };
    });

    resultsArray.sort((a, b) => b.percentage - a.percentage);

    let htmlBars = '';
    resultsArray.forEach(item => {
      htmlBars += `
        <div class="result-bar-item">
          <div class="bar-info"><span>${item.name}</span><span>${item.percentage}%</span></div>
          <div class="bar-track"><div class="bar-fill" style="width: ${item.percentage}%;"></div></div>
        </div>
      `;
    });

    resultBarsList.innerHTML = htmlBars;

    const topResult = resultsArray[0];
    interpretationText.textContent = `${topResult.name} obtuvo la mayor coincidencia (${topResult.percentage}%) según las respuestas ingresadas. Esta es una sugerencia orientativa, no una garantía de que sea la mejor opción para todos los proyectos.`;
  }

  updateSurveyView();
});