// ==================== DADOS DA APLICAÇÃO ====================

const servicos = [
    { titulo: "Aprimoramento Visual", desc: "Melhoria automática de clareza e detalhes acionada por IA." },
    { titulo: "Super Resolução", desc: "Upscaling inteligente de imagens sem perda de definição." },
    { titulo: "Restauração Digital", desc: "Recuperação minuciosa de fotografias antigas ou danificadas." },
    { titulo: "Ajuste Cromático", desc: "Correções profissionais de cor, balanço de branco e iluminação." },
    { titulo: "Limpeza de Imperfeições", desc: "Remoção precisa de ruídos, manchas e elementos indesejados." },
    { titulo: "Artes Publicitárias", desc: "Criação de banners e anúncios focados em conversão." },
    { titulo: "Social Media Kits", desc: "Conteúdos otimizados para Instagram, LinkedIn e TikTok." },
    { titulo: "Branding Corporativo", desc: "Identidade visual elegante para empresas e marcas." }
];

// Apenas 1 item e 1 imagem por container
const portfolioItems = [
    { 
        titulo: "Fotografia Gastronômica Aprimorada", 
        imagem: "https://cozinhabase.com.br/wp-content/uploads/2025/08/prompt-6-para-melhorar-foto-de-comida.jpg" 
    }
];

const stats = [
    { numero: 5000, texto: "Imagens Aprimoradas" }
];

const planos = [
    { nome: "Profissional", preco: "69,90", itens: ["15 aprimoramentos", "Atendimento prioritário", "Revisões ilimitadas"], destaque: true }
];

const pacotes = [
    { nome: "Scale Content", qtd: "200 imagens", de: "799,90", por: "599,90", destaque: true }
];

const porQue = [
    "Algoritmos de IA de ponta combinados com supervisão profissional"
];

const depoimentos = [
    { nome: "Carlos Mendes", texto: "Superou minhas expectativas. Nossos materiais visuais ganharam um nível totalmente profissional.", foto: "https://i.pinimg.com/474x/e1/05/41/e105419e21e2f0dfd1579c6aef739bb5.jpg" }
];

const faqs = [
    { q: "Qual o prazo padrão para entrega das imagens?", a: "A grande maioria dos projetos é entregue dentro do prazo de 24 horas úteis." }
];

// ==================== LÓGICA E RENDERIZAÇÃO ====================

function proceedToMain() {
    const nome = document.getElementById('user-name').value.trim();
    const errorMsg = document.getElementById('error-msg');
    
    if (nome === '') {
        errorMsg.textContent = "Por favor, informe seu nome para prosseguir.";
        return;
    }
    
    localStorage.setItem('userName', nome);
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    document.getElementById('greeting').innerHTML = `Bem-vindo(a), ${nome}! 👋`;
    
    renderAll();
}

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

function renderServices() {
    const container = document.getElementById('services-grid');
    container.innerHTML = servicos.map(s => `
        <div class="service-card">
            <h3>${s.titulo}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    container.innerHTML = portfolioItems.map(item => `
        <div class="portfolio-item">
            <h3>${item.titulo}</h3>
            <div class="portfolio-single-img">
                <img src="${item.imagem}" alt="${item.titulo}">
            </div>
        </div>
    `).join('');
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    container.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <div class="stat-number" data-target="${stat.numero}">0${stat.sufixo || ''}</div>
            <p>${stat.texto}</p>
        </div>
    `).join('');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(container);
}

function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(target / 50);
        const suffix = el.textContent.includes('%') ? '%' : '';
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target.toLocaleString('pt-BR') + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(count).toLocaleString('pt-BR') + suffix;
            }
        }, 30);
    });
}

function renderPlans() {
    const container = document.getElementById('plans-grid');
    container.innerHTML = planos.map(plan => `
        <div class="plan-card ${plan.destaque ? 'featured' : ''}">
            ${plan.destaque ? `<div class="featured-badge">Mais Recomendado</div>` : ''}
            <h3>${plan.nome}</h3>
            <div class="price">R$ ${plan.preco}</div>
            <ul>
                ${plan.itens.map(i => `<li><i class="fa-solid fa-check" style="color:var(--primary); margin-right:8px;"></i>${i}</li>`).join('')}
            </ul>
            <button onclick="contactWhatsApp()">Contratar Plano</button>
        </div>
    `).join('');
}

function renderPackages() {
    const container = document.getElementById('packages-grid');
    container.innerHTML = pacotes.map(p => `
        <div class="package-card ${p.destaque ? 'featured' : ''}">
            ${p.destaque ? `<div class="featured-badge">Melhor Custo</div>` : ''}
            <h3>${p.nome}</h3>
            <p class="qtd">${p.qtd}</p>
            <div class="price">
                <span style="font-size:0.9rem; color:var(--text-muted); text-decoration:line-through; font-weight:normal;">De R$ ${p.de}</span><br>
                R$ ${p.por}
            </div>
            <button onclick="contactWhatsApp()">Adquirir Pacote</button>
        </div>
    `).join('');
}

function renderWhy() {
    const container = document.getElementById('why-grid');
    container.innerHTML = porQue.map(item => `
        <div class="why-card">
            <p><i class="fa-solid fa-shield-halved" style="color:var(--primary); margin-right:8px;"></i>${item}</p>
        </div>
    `).join('');
}
