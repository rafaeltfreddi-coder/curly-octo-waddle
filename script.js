// URL corrigida do Supabase (removido o "/rest/v1/" que causava falha nas chamadas)
const SUPABASE_URL = 'https://xdqoxpfipqswbgkkshys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcW94cGZpcHFzd2Jna2tzaHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDkyOTMsImV4cCI6MjA1NjgyNTI5M30.4P4-H7TffQ0A6uR_D4x0L3z9-qvhX6A8uG3V6V2bQ7s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mecanismo de Ação do WhatsApp
function contactWhatsApp() {
  const phone = "5511999999999"; // Altere para seu número com DDD
  const message = encodeURIComponent("Olá! Vim pelo site e gostaria de saber mais informações.");
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Mecanismo do FAQ (Accordion)
function toggleFAQ(element) {
  const isActive = element.classList.contains('active');
  
  // Reseta todos os itens para fechar
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    const icon = item.querySelector('.faq-question i');
    if (icon) {
      icon.className = 'fas fa-plus';
    }
  });

  // Abre apenas o selecionado se não estava aberto
  if (!isActive) {
    element.classList.add('active');
    const icon = element.querySelector('.faq-question i');
    if (icon) {
      icon.className = 'fas fa-minus';
    }
  }
}

// Envio do formulário para o banco de dados do Supabase
async function handleFormSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Trava o botão para evitar cliques múltiplos
  submitBtn.disabled = true;
  submitBtn.innerText = 'Enviando...';
  formStatus.className = 'form-status';
  formStatus.innerText = '';

  try {
    const { error } = await supabaseClient
      .from('mensagens')
      .insert([{ nome, email, mensagem }]);

    if (error) throw error;

    formStatus.className = 'form-status success';
    formStatus.innerText = 'Sua mensagem foi enviada com sucesso!';
    document.getElementById('contactForm').reset();
  } catch (err) {
    console.error('Erro no Supabase:', err);
    formStatus.className = 'form-status error';
    formStatus.innerText = 'Ocorreu um erro ao enviar. Tente novamente.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Enviar Mensagem';
  }
}

// Animação de Fundo Interativa (Canvas Particles)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 45;

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
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
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
