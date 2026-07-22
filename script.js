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

const portfolioItems = [
    { 
        titulo: "Fotografia Gastronômica (Melhoria de Foto de Comida)", 
        antes: "https://cozinhabase.com.br/wp-content/uploads/2025/08/prompt-4-para-melhorar-foto-de-comida.jpg", 
        depois: "https://cozinhabase.com.br/wp-content/uploads/2025/08/prompt-6-para-melhorar-foto-de-comida.jpg" 
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
    { 
        nome: "Ana Souza", 
        texto: "Incrível! As fotos dos meus produtos mudaram de nível da noite para o dia. Super recomendo o trabalho da equipe.", 
        foto: "https://i.pinimg.com/564x/4f/2e/d8/4f2ed84f1f2374e3cb20a233b2bf405e.jpg" 
    },
    { 
        nome: "Carlos Mendes", 
        texto: "Superou minhas expectativas. Nossos materiais visuais ganharam um nível totalmente profissional.", 
        foto: "https://i.pinimg.com/474x/e1/05/41/e105419e21e2f0dfd1579c6aef739bb5.jpg" 
    }
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
            <div class="comparison-slider">
                <img src="${item.depois}" alt="Depois" class="img-after">
                <div class="img-before-wrapper" id="beforeWrapper">
                    <img src="${item.antes}" alt="Antes" class="img-before">
                </div>
                <span class="badge badge-antes">ANTES</span>
                <span class="badge badge-depois">DEPOIS</span>
                <input type="range" min="0" max="100" value="50" class="slider-input" oninput="moveSlider(this)">
                <div class="slider-handle" id="sliderHandle">
                    <div class="handle-line"></div>
                    <div class="handle-button"><i class="fa-solid fa-code-compare"></i></div>
                </div>
            </div>
        </div>
    `).join('');
}

function moveSlider(input) {
    const value = input.value + '%';
    document.getElementById('beforeWrapper').style.width = value;
    document.getElementById('sliderHandle').style.left = value;
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
                <span style="font-size:0.85rem; color:var(--text-muted); text-decoration:line-through; font-weight:normal;">De R$ ${p.de}</span><br>
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

function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    container.innerHTML = depoimentos.map(d => `
        <div class="testimonial">
            <img src="${d.foto}" alt="${d.nome}">
            <p>"${d.texto}"</p>
            <strong>${d.nome}</strong>
        </div>
    `).join('');
}

function renderFAQ() {
    const container = document.getElementById('faq-list');
    container.innerHTML = faqs.map(faq => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${faq.q}</span>
                <span class="toggle-icon"><i class="fa-solid fa-plus"></i></span>
            </div>
            <div class="faq-answer">${faq.a}</div>
        </div>
    `).join('');
}

function toggleFAQ(el) {
    const answer = el.nextElementSibling;
    const icon = el.querySelector('.toggle-icon i');
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.className = 'fa-solid fa-plus';
    } else {
        answer.style.display = 'block';
        icon.className = 'fa-solid fa-minus';
    }
}

function contactWhatsApp() {
    window.open('https://wa.me/5516989477519?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços.', '_blank');
}

// ==================== AUTO-START ====================

window.onload = () => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('greeting').innerHTML = `Bem-vindo(a), ${savedName}! 👋`;
        renderAll();
    }
};
