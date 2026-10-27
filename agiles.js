document.addEventListener('DOMContentLoaded', () => {

  // 1. VER MÁS / MENOS EN PRINCIPIOS DEL MANIFIESTO
  const togglePrinciplesBtn = document.getElementById('togglePrinciplesBtn');
  const principlesContent = document.getElementById('principlesContent');

  if (togglePrinciplesBtn && principlesContent) {
    togglePrinciplesBtn.addEventListener('click', () => {
      const isHidden = principlesContent.style.display === 'none';
      principlesContent.style.display = isHidden ? 'block' : 'none';
      togglePrinciplesBtn.textContent = isHidden ? 'OCULTAR' : 'VER MÁS';
    });
  }

});

// 2. DESPLEGAR INFORMACIÓN DE LAS TARJETAS DE VALORES DEL MANIFIESTO
function toggleValueDetail(card) {
  card.classList.toggle('open');
}

// 3. PESTAÑAS (TABS) PARA SCRUM, KANBAN Y XP
function showTab(section, tabName, btnElement) {
  const container = btnElement.closest('.green-frame-card');
  
  const buttons = container.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const panes = container.querySelectorAll('.tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));
  
  const targetPane = container.querySelector(`#${section}-${tabName}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }
}

// 4. SCRUM A PROFUNDIDAD (EXPANDIR INFORMACIÓN DE TARJETAS)
function expandScrumCard(card) {
  card.classList.toggle('open');
}

// 5. KANBAN A PROFUNDIDAD (INTERACCIÓN DRAG & DROP)
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  let dropTarget = ev.target;

  if (!dropTarget.classList.contains('kanban-cards-container')) {
    dropTarget = dropTarget.closest('.kanban-cards-container') || dropTarget.closest('.kanban-column')?.querySelector('.kanban-cards-container');
  }

  if (dropTarget && draggedElement) {
    dropTarget.appendChild(draggedElement);

    const column = dropTarget.closest('.kanban-column');
    const columnName = column.getAttribute('data-status');
    const taskName = draggedElement.getAttribute('data-task');
    const taskDesc = draggedElement.getAttribute('data-desc');

    updateKanbanStatusInfo(taskName, columnName, taskDesc);
  }
}

function updateKanbanStatusInfo(task, status, desc) {
  const statusTitle = document.getElementById('statusTitle');
  const statusDescription = document.getElementById('statusDescription');

  if (statusTitle && statusDescription) {
    statusTitle.textContent = `${task.toUpperCase()}: ESTADO [${status}]`;
    statusDescription.innerHTML = `<strong>Avance:</strong> La tarea <em>"${task}"</em> se encuentra actualmente en la fase de <strong>${status}</strong>. <br>${desc}`;
  }
}