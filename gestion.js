// ==========================================
// 1. ANIMACIÓN DE PARTÍCULAS EN CANVAS
// ==========================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particlesArray = [];
const numberOfParticles = 65;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.fillStyle = `rgba(126, 217, 87, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        let opacity = 1 - (distance / 120);
        ctx.strokeStyle = `rgba(126, 217, 87, ${opacity * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}

if (canvas) {
  initParticles();
  animateParticles();
}

// ==========================================
// ==========================================
// INTERACTIVIDAD Y CIERRE DEL MEGAMENÚ
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const megaMenu = document.getElementById('megaMenu');

if (menuBtn && megaMenu) {
  // Abrir / Cerrar menú
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    megaMenu.classList.toggle('open');
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener('click', (e) => {
    if (!megaMenu.contains(e.target) && !menuBtn.contains(e.target) && megaMenu.classList.contains('open')) {
      menuBtn.classList.remove('active');
      megaMenu.classList.remove('open');
    }
  });

  // Cerrar el menú automáticamente al hacer clic en cualquier enlace interno (#)
  const menuLinks = megaMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      megaMenu.classList.remove('open');
    });
  });
}

// ==========================================
// 3. SELECCIÓN DE ESTÁNDARES (ISO 9126 / 25000)
// ==========================================
const btnIso9126 = document.getElementById('btnIso9126');
const btnIso25000 = document.getElementById('btnIso25000');
const isoTitle = document.getElementById('isoTitle');
const isoContent = document.getElementById('isoContent');

const isoData = {
  iso9126: {
    title: "ISO 9126",
    content: "<p><strong>Modelo estándar para la evaluación de la calidad del software.</strong><br>Define la calidad a través de seis características principales: Funcionalidad, Fiabilidad, Usabilidad, Eficiencia, Mantenibilidad y Portabilidad.</p>"
  },
  iso25000: {
    title: "ISO 25000 (SQuaRE)",
    content: "<p><strong>Sistema de Requisitos y Evaluación de Calidad de Software.</strong><br>Reemplaza y extiende la norma ISO 9126. Proporciona un marco unificado para evaluar tanto la calidad del producto de software como la calidad de los datos.</p>"
  }
};

if (btnIso9126 && btnIso25000) {
  btnIso9126.addEventListener('click', () => {
    btnIso9126.classList.add('active');
    btnIso25000.classList.remove('active');
    isoTitle.textContent = isoData.iso9126.title;
    isoContent.innerHTML = isoData.iso9126.content;
  });

  btnIso25000.addEventListener('click', () => {
    btnIso25000.classList.add('active');
    btnIso9126.classList.remove('active');
    isoTitle.textContent = isoData.iso25000.title;
    isoContent.innerHTML = isoData.iso25000.content;
  });
}

// ==========================================
// 4. DESPLEGABLE CON GRÁFICOS (CAJA NEGRA / BLANCA)
// ==========================================
const btnCajaNegra = document.getElementById('btnCajaNegra');
const btnCajaBlanca = document.getElementById('btnCajaBlanca');
const infoModal = document.getElementById('infoModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// Diagrama SVG Caja Negra
const svgCajaNegra = `
  <div class="graphic-container">
    <svg class="graphic-svg" viewBox="0 0 450 140" xmlns="http://www.w3.org/2000/svg">
      <!-- Entradas -->
      <rect x="10" y="45" width="90" height="50" rx="8" fill="#60a250" />
      <text x="55" y="75" font-family="sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">Entradas</text>
      
      <!-- Flecha 1 -->
      <path d="M 105 70 L 140 70" stroke="#0f2d1a" stroke-width="3" marker-end="url(#arrow)" />
      
      <!-- Caja Negra -->
      <rect x="145" y="25" width="160" height="90" rx="12" fill="#071f13" stroke="#7ed957" stroke-width="2"/>
      <text x="225" y="68" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">SISTEMA / CÓDIGO</text>
      <text x="225" y="88" font-family="sans-serif" font-size="11" fill="#7ed957" text-anchor="middle">(Funcionamiento Oculto)</text>
      
      <!-- Flecha 2 -->
      <path d="M 310 70 L 345 70" stroke="#0f2d1a" stroke-width="3" />
      
      <!-- Salidas -->
      <rect x="350" y="45" width="90" height="50" rx="8" fill="#60a250" />
      <text x="395" y="75" font-family="sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">Salidas</text>
    </svg>
  </div>
`;

// Diagrama SVG Caja Blanca
const svgCajaBlanca = `
  <div class="graphic-container">
    <svg class="graphic-svg" viewBox="0 0 450 140" xmlns="http://www.w3.org/2000/svg">
      <!-- Entrada -->
      <circle cx="45" cy="70" r="22" fill="#60a250" />
      <text x="45" y="74" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">Inicio</text>
      
      <!-- Conexiones internas -->
      <path d="M 67 70 L 110 70" stroke="#0f2d1a" stroke-width="2" />
      <path d="M 150 70 L 190 40" stroke="#0f2d1a" stroke-width="2" />
      <path d="M 150 70 L 190 100" stroke="#0f2d1a" stroke-width="2" />
      <path d="M 230 40 L 270 70" stroke="#0f2d1a" stroke-width="2" />
      <path d="M 230 100 L 270 70" stroke="#0f2d1a" stroke-width="2" />
      <path d="M 310 70 L 375 70" stroke="#0f2d1a" stroke-width="2" />

      <!-- Estructura Lógica Visibles -->
      <rect x="110" y="50" width="40" height="40" rx="6" fill="#ffffff" stroke="#071f13" stroke-width="2" />
      <rect x="190" y="20" width="40" height="40" rx="6" fill="#ffffff" stroke="#071f13" stroke-width="2" />
      <rect x="190" y="80" width="40" height="40" rx="6" fill="#ffffff" stroke="#071f13" stroke-width="2" />
      <rect x="270" y="50" width="40" height="40" rx="6" fill="#ffffff" stroke="#071f13" stroke-width="2" />

      <text x="130" y="74" font-family="sans-serif" font-size="10" font-weight="bold" fill="#071f13" text-anchor="middle">If</text>
      <text x="210" y="44" font-family="sans-serif" font-size="10" font-weight="bold" fill="#071f13" text-anchor="middle">Ruta A</text>
      <text x="210" y="104" font-family="sans-serif" font-size="10" font-weight="bold" fill="#071f13" text-anchor="middle">Ruta B</text>
      <text x="290" y="74" font-family="sans-serif" font-size="10" font-weight="bold" fill="#071f13" text-anchor="middle">End</text>

      <!-- Salida -->
      <circle cx="395" cy="70" r="22" fill="#60a250" />
      <text x="395" y="74" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">Fin</text>
    </svg>
  </div>
`;

if (btnCajaNegra && btnCajaBlanca) {
  btnCajaNegra.addEventListener('click', () => {
    modalTitle.textContent = "Pruebas de Caja Negra (Black Box)";
    modalBody.innerHTML = `
      <p class="modal-detail-text">
        Se centran en verificar la funcionalidad del software sin observar la estructura interna del código. El tester proporciona datos de entrada y evalúa si la salida coincide con los resultados esperados.
      </p>
      <ul class="modal-detail-list">
        <li><strong>Técnicas principales:</strong> Partición de equivalencia, análisis de valores límite, tablas de decisión.</li>
        <li><strong>Enfoque:</strong> Pruebas funcionales, de usabilidad y pruebas de aceptación del cliente.</li>
        <li><strong>Ventaja:</strong> No requiere conocimientos técnicos de programación.</li>
      </ul>
      ${svgCajaNegra}
    `;
    infoModal.style.display = 'flex';
  });

  btnCajaBlanca.addEventListener('click', () => {
    modalTitle.textContent = "Pruebas de Caja Blanca (White Box)";
    modalBody.innerHTML = `
      <p class="modal-detail-text">
        Evalúan la estructura interna, la lógica del código y los flujos de ejecución. El tester analiza componentes como condiciones, bucles y caminos lógicos para asegurar que cada línea de código sea segura.
      </p>
      <ul class="modal-detail-list">
        <li><strong>Técnicas principales:</strong> Cobertura de sentencias, cobertura de ramas/decisiones, pruebas de caminos independientes.</li>
        <li><strong>Enfoque:</strong> Pruebas unitarias, de integración y análisis estático de código.</li>
        <li><strong>Ventaja:</strong> Permite optimizar el código y detectar fallos lógicos ocultos.</li>
      </ul>
      ${svgCajaBlanca}
    `;
    infoModal.style.display = 'flex';
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    infoModal.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === infoModal) {
    infoModal.style.display = 'none';
  }
});
// ==========================================
// 5. INTERACCION TOUCH/CLICK PARA TARJETAS GIRATORIAS
// ==========================================
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});