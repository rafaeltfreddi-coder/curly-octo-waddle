// ==================== DADOS ====================

// ==================== DADOS ====================

// Dados dos serviços
const servicos = [
    { titulo: "Aprimoramento de imagens", desc: "Melhoria automática de qualidade com IA" },
    { titulo: "Aumento de resolução", desc: "Upscaling inteligente para alta definição" },
    { titulo: "Restauração de fotos", desc: "Recuperação de imagens antigas" },
    { titulo: "Correção de cores", desc: "Ajustes profissionais de tonalidade" },
    { titulo: "Remoção de imperfeições", desc: "Limpeza e retoques precisos" },
    { titulo: "Criação de anúncios", desc: "Anúncios visualmente impactantes" },
    { titulo: "Artes para redes sociais", desc: "Conteúdo otimizado para plataformas" },
    { titulo: "Design para empresas", desc: "Identidade visual completa" }
];

// Dados do portfólio
const portfolioItems = [
    { titulo: "Cardápio de Restaurante", antes: "https://picsum.photos/id/1015/800/600", depois: "https://picsum.photos/id/106/800/600" },
    { titulo: "Anúncio de Produto", antes: "https://picsum.photos/id/201/800/600", depois: "https://picsum.photos/id/237/800/600" },
    { titulo: "Fotografia Antiga", antes: "https://picsum.photos/id/133/800/600", depois: "https://picsum.photos/id/180/800/600" }
];

// Estatísticas
const stats = [
    { numero: 5000, texto: "Imagens aprimoradas" },
    { numero: 1200, texto: "Clientes atendidos" },
    { numero: 98,  texto: "Satisfação", sufixo: "%" },
    { numero: 24,   texto: "Horas de entrega média" }
];

// Planos
const planos = [
    { nome: "Essencial", preco: "49,90", itens: ["10 aprimoramentos", "Alta qualidade", "Entrega rápida"] },
    { nome: "Profissional", preco: "69,90", itens: ["15 aprimoramentos", "Atendimento prioritário", "Revisão incluída"], destaque: true },
    { nome: "Premium", preco: "89,90", itens: ["20 aprimoramentos", "Qualidade máxima", "Revisões extras"] }
];

// Pacotes Promocionais
const pacotes = [
    { nome: "Loja Virtual", qtd: "50 imagens", de: "249,90", por: "199,90" },
    { nome: "Empresarial", qtd: "100 imagens", de: "499,90", por: "349,90" },
    { nome: "Criador de Conteúdo", qtd: "200 imagens", de: "799,90", por: "599,90", destaque: true }
];

// Por que escolher
const porQue = [
    "Inteligência Artificial avançada",
    "Designers profissionais",
    "Entrega rápida",
    "Garantia de qualidade",
    "Resultados premium",
    "Atendimento personalizado"
];

// Depoimentos
const depoimentos = [
    { nome: "Carlos Mendes", texto: "Transformaram meu cardápio completamente! Vendas aumentaram muito.", foto: "https://picsum.photos/id/64/80/80" },
    { nome: "Ana Silva", texto: "Minhas fotos antigas voltaram à vida. Serviço incrível!", foto: "https://picsum.photos/id/65/80/80" }
];

// FAQ
const faqs = [
    { q: "Quanto tempo demora o serviço?", a: "A maioria dos trabalhos é entregue em até 24 horas." },
    { q: "Como envio minhas imagens?", a: "Basta enviar por WhatsApp ou e-mail após a contratação." },
    { q: "Quais formatos são aceitos?", a: "JPG, PNG, WEBP e arquivos RAW." },
    { q: "Há garantia de satisfação?", a: "Sim, oferecemos até 3 revisões gratuitas." }
];

// ==================== FUNÇÕES DE RENDER ====================

// Função para prosseguir da tela inicial
function proceedToMain() {
    const nome = document.getElementById('user-name').value.trim();
    const errorMsg = document.getElementById('error-msg');
    
    if (nome === '') {
        errorMsg.textContent = "Por favor, digite seu nome para continuar.";
        return;
    }
    
    localStorage.setItem('userName', nome);
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    document.getElementById('greeting').innerHTML = `Olá, ${nome}! 👋`;
    
    renderAll();
}

// Renderiza todos os blocos
function renderAll() {
    renderServices();
    renderPortfolio();
    renderStats();
    renderPlans();
    renderPackages();
    renderWhy();
    renderTestimonials();
    renderFAQ();
}

// Serviços
function renderServices() {
    const container = document.getElementById('services-grid');
    container.innerHTML = servicos.map(s => `
        <div class="service-card">
            <h3>${s.titulo}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// Portfólio
function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    container.innerHTML = portfolioItems.map(item => `
        <div class="portfolio-item">
            <h3>${item.titulo}</h3>
            <div class="before-after">
                <div>
                    <small>Antes</small>
                    <img src="${item.antes}" alt="Antes">
                </div>
                <div>
                    <small>Depois</small>
                    <img src="${item.depois}" alt="Depois">
                </div>
            </div>
        </div>
    `).join('');
}

// Estatísticas com animação
function renderStats() {
    const container = document.getElementById('stats-grid');
    container.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <h3 data-target="\( {stat.numero}" class="stat-number">0 \){stat.sufixo || ''}</h3>
            <p>${stat.texto}</p>
        </div>
    `).join('');

    // Animação ao entrar na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    });
    observer.observe(container);
}

function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target + (el.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(count) + (el.textContent.includes('%') ? '%' : '');
            }
        }, 40);
    });
}

// Planos
function renderPlans() {
    const container = document.getElementById('plans-grid');
    container.innerHTML = planos.map(plan => `
        <div class="plan-card ${plan.destaque ? 'featured' : ''}">
            ${plan.destaque ? `<div class="featured-badge">Mais Escolhido</div>` : ''}
            <h3>${plan.nome}</h3>
            <div class="price">R$ ${plan.preco}</div>
            <ul>
                ${plan.itens.map(i => `<li>✓ ${i}</li>`).join('')}
            </ul>
            <button onclick="contactWhatsApp()">Escolher Plano</button>
        </div>
    `).join('');
}

// Pacotes
function renderPackages() {
    const container = document.getElementById('packages-grid');
    container.innerHTML = pacotes.map(p => `
        <div class="package-card ${p.destaque ? 'featured' : ''}">
            <h3>${p.nome}</h3>
            <p class="qtd">${p.qtd}</p>
            <div class="price">
                De <s>R$ ${p.de}</s><br>
                por <strong>R$ ${p.por}</strong>
            </div>
            <button onclick="contactWhatsApp()">Adquirir Pacote</button>
        </div>
    `).join('');
}

// Por que escolher
function renderWhy() {
    const container = document.getElementById('why-grid');
    container.innerHTML = porQue.map(item => `
        <div class="why-card">
            <p>🚀 ${item}</p>
        </div>
    `).join('');
}

// Depoimentos
function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    container.innerHTML = depoimentos.map(d => `
        <div class="testimonial">
            <img src="\( {d.foto}" alt=" \){d.nome}">
            <p>"${d.texto}"</p>
            <strong>${d.nome}</strong>
        </div>
    `).join('');
}

// FAQ
function renderFAQ() {
    const container = document.getElementById('faq-list');
    container.innerHTML = faqs.map(faq => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${faq.q}</span>
                <span class="toggle-icon">+</span>
            </div>
            <div class="faq-answer">${faq.a}</div>
        </div>
    `).join('');
}

function toggleFAQ(el) {
    const answer = el.nextElementSibling;
    const icon = el.querySelector('.toggle-icon');
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.textContent = '+';
    } else {
        answer.style.display = 'block';
        icon.textContent = '−';
    }
}

function contactWhatsApp() {
    window.open('https://wa.me/5516989477519?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20planos.', '_blank');
}

// ==================== INICIALIZAÇÃO ====================

window.onload = () => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('greeting').innerHTML = `Olá, ${savedName}! 👋`;
        renderAll();
    }
};
