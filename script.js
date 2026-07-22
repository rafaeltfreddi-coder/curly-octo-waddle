// Configurações do Supabase (Apenas a URL base, sem /rest/v1/)
const SUPABASE_URL = 'https://xdqoxpfipqswbgkkshys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcW94cGZpcHFzd2Jna2tzaHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDkyOTMsImV4cCI6MjA1NjgyNTI5M30.4P4-H7TffQ0A6uR_D4x0L3z9-qvhX6A8uG3V6V2bQ7s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Redirecionamento para o WhatsApp
function contactWhatsApp() {
  const phone = "5511999999999"; // Substitua pelo seu número real com DDD
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre seus serviços de desenvolvimento web.");
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Lógica de Toggle do Accordion (FAQ)
function toggleFAQ(element) {
  const isActive = element.classList.contains('active');
  
  // Fecha todos os itens
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    const icon = item.querySelector('.faq-question i');
    if (icon) {
      icon.className = 'fas fa-plus';
    }
  });

  // Abre o item clicado (se não estava ativo)
  if (!isActive) {
    element.classList.add('active');
    const icon = element.querySelector('.faq-question i');
    if (icon) {
      icon.className = 'fas fa-minus';
    }
  }
}

// Envio do Formulário para o Supabase
async function handleFormSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Desabilita o botão temporariamente
  submitBtn.disabled = true;
  submitBtn.innerText = 'Enviando...';
  formStatus.className = 'form-status';
  formStatus.innerText = '';

  try {
    // Insere os dados na tabela do Supabase (certifique-se de que a tabela se chama 'mensagens' no painel)
    const { error } = await supabaseClient
      .from('mensagens')
      .insert([{ nome, email, mensagem }]);

    if (error) throw error;

    formStatus.className = 'form-status success';
    formStatus.innerText = 'Mensagem enviada com sucesso!';
    document.getElementById('contactForm').reset();
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err);
    formStatus.className = 'form-status error';
    formStatus.innerText = 'Ocorreu um erro ao enviar. Tente novamente.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Enviar Mensagem';
  }
}

// Canvas Interativo de Partículas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
