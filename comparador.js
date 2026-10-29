document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.checkboxes-grid input[type="checkbox"]');
  const comparatorWrapper = document.getElementById('comparatorContentWrapper');

  const methodologyData = {
    cascada: { name: "Cascada", plan: "Principalmente inicial", flex: "Baja", org: "Etapas secuenciales" },
    modeloV: { name: "Modelo V", plan: "Rigurosa inicial", flex: "Baja", org: "Verificación y validación" },
    iterativo: { name: "Iterativo e Incremental", plan: "Por iteraciones", flex: "Media", org: "Ciclos sucesivos" },
    scrum: { name: "Scrum", plan: "Por Sprint", flex: "Alta", org: "Sprints y roles" },
    kanban: { name: "Kanban", plan: "Flujo continuo", flex: "Alta", org: "Tablero visual y WIP" },
    xp: { name: "XP", plan: "Por iteraciones", flex: "Alta", org: "Prácticas de programación" }
  };

  function renderComparatorTable() {
    const selectedKeys = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    if (selectedKeys.length < 2) {
      comparatorWrapper.innerHTML = `
        <div class="warning-selection-box">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <h4 style="margin-bottom: 0.5rem; font-weight: 800; font-size: 1.1rem;">Seleccioná al menos dos metodologías</h4>
          <p style="font-size: 0.9rem; color: #d1ebd8; margin: 0;">La tabla aparecerá cuando haya dos o más opciones seleccionadas.</p>
        </div>
      `;
      return;
    }

    let tableHTML = `
      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Características</th>
    `;

    selectedKeys.forEach(key => {
      tableHTML += `<th>${methodologyData[key].name}</th>`;
    });

    tableHTML += `
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Planificación</strong></td>
    `;
    selectedKeys.forEach(key => {
      tableHTML += `<td>${methodologyData[key].plan}</td>`;
    });

    tableHTML += `
            </tr>
            <tr>
              <td><strong>Flexibilidad</strong></td>
    `;
    selectedKeys.forEach(key => {
      tableHTML += `<td>${methodologyData[key].flex}</td>`;
    });

    tableHTML += `
            </tr>
            <tr>
              <td><strong>Organización</strong></td>
    `;
    selectedKeys.forEach(key => {
      tableHTML += `<td>${methodologyData[key].org}</td>`;
    });

    tableHTML += `
            </tr>
          </tbody>
        </table>
      </div>
    `;

    comparatorWrapper.innerHTML = tableHTML;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', renderComparatorTable);
  });

  renderComparatorTable();
});