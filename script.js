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
    { numero: 98, texto: "Satisfação (%)", sufixo: "%" },
    { numero: 24, texto: "Horas de entrega média" }
];

// Planos
const planos = [
    { nome: "Essencial", preco: "49,90", itens: ["10 aprimoramentos", "Alta qualidade", "Entrega rápida"] },
    { nome: "Profissional", preco: "69,90", itens: ["15 aprimoramentos", "Atendimento prioritário", "Revisão incluída"], destaque: true },
    { nome: "Premium", preco: "89,90", itens: ["20 aprimoramentos", "Qualidade máxima", "Revisões extras"] }
];

// Pacotes
const pacotes = [
    { nome: "Loja Virtual", qtd: "50 imagens", de: "249,90", por: "199,90" },
    { nome: "Empresarial", qtd: "100 imagens", de: "499,90", por: "349,90" },
    { nome: "Criador de Conteúdo", qtd: "200 imagens", de: "799,90", por: "599,90", destaque: true }
];

// Por quê escolher
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
    
    renderServices();
    renderPortfolio();
    renderStats();
    renderPlans();
    renderPackages();
    renderWhy();
    renderTestimonials();
    renderFAQ();
}

// Render Services
function renderServices() {
    const container = document.getElementById('services-grid');
    container.innerHTML = servicos.map(s => `
        <div class="service-card">
            <h3>${s.titulo}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// Render Portfolio
function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    container.innerHTML = portfolioItems.map(item => `
        <div class="portfolio-item">
            <h3>${item.titulo}</h3>
            <div class="before-after">
                <img src="${item.antes}" alt="Antes">
                <img src="${item.depois}" alt="Depois">
            </div>
        </div>
    `).join('');
}

// Render Stats with animation
function renderStats() {
    const container = document.getElementById('stats-grid');
    container.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <h3 data-target="\( {stat.numero}" class="stat-number">0 \){stat.sufixo || ''}</h3>
            <p>${stat.texto}</p>
        </div>
    `).join('');
    
    const observers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observers.unobserve(entry.target);
            }
        });
    });
    observers.observe(container);
}

function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target + (el.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(count) + (el.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    });
}

// Render Plans
function renderPlans() {
    const container = document.getElementById('plans-grid');
    container.innerHTML = planos.map(plan => `
        <div class="plan-card ${plan.destaque ? 'featured' : ''}">
            ${plan.destaque ? '<div class="featured-badge" style="position:absolute;top:-15px;right:20px;background:#00AEEF;color:black;padding:5px 15px;border-radius:20px;font-size:0.9rem;">Mais Escolhido</div>' : ''}
            <h3>${plan.nome}</h3>
            <div class="price" style="font-size:2.5rem;margin:20px 0;">R$ ${plan.preco}</div>
            <ul>\( {plan.itens.map(i => `<li> \){i}</li>`).join('')}</ul>
        </div>
    `).join('');
}

// Render Packages
function renderPackages() {
    const container = document.getElementById('packages-grid');
    container.innerHTML = pacotes.map(p => `
        <div class="package-card ${p.destaque ? 'featured' : ''}">
            <h3>${p.nome}</h3>
            <p>${p.qtd}</p>
            <div class="price">De <s>R$ \( {p.de}</s> por <strong>R \) ${p.por}</strong></div>
        </div>
    `).join('');
}

// Render Why Choose Us
function renderWhy() {
    const container = document.getElementById('why-grid');
    container.innerHTML = porQue.map(item => `
        <div class="why-card" style="background:#1A1A1A;padding:30px;border-radius:20px;">
            <p>🚀 ${item}</p>
        </div>
    `).join('');
}

// Render Testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    container.innerHTML = depoimentos.map(d => `
        <div class="testimonial" style="background:#1A1A1A;padding:30px;border-radius:20px;text-align:center;">
            <img src="\( {d.foto}" alt=" \){d.nome}" style="border-radius:50%;width:80px;height:80px;">
            <p>"${d.texto}"</p>
            <strong>${d.nome}</strong>
        </div>
    `).join('');
}

// Render FAQ
function renderFAQ() {
    const container = document.getElementById('faq-list');
    container.innerHTML = faqs.map((faq) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${faq.q}</span>
                <span>+</span>
            </div>
            <div class="faq-answer">${faq.a}</div>
        </div>
    `).join('');
}

function toggleFAQ(el) {
    const answer = el.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

// Load saved name
window.onload = () => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('greeting').innerHTML = `Olá, ${savedName}! 👋`;
        renderServices();
        renderPortfolio();
        renderStats();
        renderPlans();
        renderPackages();
        renderWhy();
        renderTestimonials();
        renderFAQ();
    }
};
