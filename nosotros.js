
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

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


const menuBtn = document.getElementById('menuBtn');
const megaMenu = document.getElementById('megaMenu');
const scrollIndicator = document.getElementById('scrollIndicator');
const moreSections = document.getElementById('moreSections');

if (menuBtn && megaMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    megaMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!megaMenu.contains(e.target) && !menuBtn.contains(e.target) && megaMenu.classList.contains('open')) {
      menuBtn.classList.remove('active');
      megaMenu.classList.remove('open');
    }
  });
}

if (scrollIndicator && moreSections) {
  scrollIndicator.addEventListener('click', () => {
    moreSections.scrollIntoView({ behavior: 'smooth' });
  });
}
