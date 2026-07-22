// ==================== CONFIGURAÇÃO DO SUPABASE ====================
const SUPABASE_URL = 'https://xdqoxpfipqswbgkkshys.supabase.co/rest/v1/'; // ex: https://xyz.supabase.co
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcW94cGZpcHFzd2Jna2tzaHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTMzNzQsImV4cCI6MjEwMDI2OTM3NH0.W4LhLmQavvQyEfexNc7xAdrKuDSiZ7iXxiGnEHHDCYk';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Login via OAuth Google
async function loginWithGoogle() {
    if (!supabaseClient) return alert('Supabase não inicializado.');
    
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin
        }
    });

    if (error) {
        console.error('Erro ao fazer login:', error.message);
        alert('Erro ao tentar logar com Google.');
    }
}

async function resetUserSession() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
    localStorage.removeItem('userName');
    window.location.reload();
}

// ==================== GERENCIADOR DE TEMAS ====================

const themes = ['dark', 'gray', 'light'];
const themeIcons = {
    dark: 'fa-moon',
    gray: 'fa-circle-half-stroke',
    light: 'fa-sun'
};
const themeNames = {
    dark: 'Escuro',
    gray: 'Cinza',
    light: 'Claro'
};

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    applyTheme(nextTheme);
    localStorage.setItem('siteTheme', nextTheme);
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    const iconEl = document.getElementById('theme-icon');
    const textEl = document.getElementById('theme-text');
    
    if (iconEl && textEl) {
        iconEl.className = `fa-solid ${themeIcons[theme]}`;
        textEl.textContent = themeNames[theme];
    }
}

// ==================== NOTIFICAÇÃO "EM DESENVOLVIMENTO" ====================

let toastTimeout;
function showInDevelopment(feature) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    
    if (toast && msg) {
        msg.textContent = `${feature}: Em desenvolvimento`;
        toast.classList.remove('hidden');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 2800);
    }
}

// ==================== CANVAS TECNOLÓGICO ADAPTÁVEL AO TEMA ====================

function initTechBackground() {
    const canvas = document.getElementById('tech-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 16), 80);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2 + 1,
            type: Math.random() > 0.5 ? 1 : 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        
        let color1, color2, lineColor;

        if (currentTheme === 'light') {
            color1 = 'rgba(37, 99, 235, ';
            color2 = 'rgba(0, 0, 0, ';
            lineColor = 'rgba(15, 23, 42, ';
        } else if (currentTheme === 'gray') {
            color1 = 'rgba(0, 240, 255, ';
            color2 = 'rgba(112, 0, 255, ';
            lineColor = 'rgba(255, 255, 255, ';
        } else {
            color1 = 'rgba(255, 255, 255, ';
            color2 = 'rgba(0, 240, 255, ';
            lineColor = 'rgba(255, 255, 255, ';
        }

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = (p.type === 1 ? color1 : color2) + '0.85)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    let alpha = (1 - dist / 130) * 0.22;
                    ctx.strokeStyle = lineColor + alpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==================== DADOS DA APLICAÇÃO ====================

const servicos = [
    { titulo: "Aprimoramento Visual", desc: "Melhoria automática de clareza e detalhes acionada por Inteligência Artificial." },
    { titulo: "Super Resolução", desc: "Aumento de escala (upscaling) inteligente sem perda de qualidade original." },
    { titulo: "Restauração Digital", desc: "Recuperação minuciosa de fotografias antigas, foscas ou desgastadas." },
    { titulo: "Ajuste Cromático", desc: "Correção de cores, balanço de branco e equilíbrio de iluminação profissional." },
    { titulo: "Limpeza de Imperfeições", desc: "Remoção precisa de ruídos digitais, manchas e objetos indesejados." },
    { titulo: "Artes Publicitárias", desc: "Criação de banners e peças visuais para campanhas de alta conversão." },
    { titulo: "Social Media Kits", desc: "Conteúdos visuais padronizados para Instagram, LinkedIn e Facebook." },
    { titulo: "Branding Corporativo", desc: "Adequação de imagens para identidades visuais de marcas e empresas." }
];

const portfolioItems = [
    { 
        titulo: "Recuperação de Nitidez & Resolução IA", 
        antes: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=30&blur=6", 
        depois: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=100" 
    }
];

const stats = [
    { numero: 5000, texto: "Imagens Aprimoradas com Sucesso" }
];

const planos = [
    { 
        nome: "Iniciante", 
        preco: "49,90", 
        itens: ["10 aprimoramentos", "Entrega em até 24h úteis", "Resolução HD"], 
        destaque: false 
    },
    { 
        nome: "Profissional", 
        preco: "69,90", 
        itens: ["20 aprimoramentos", "Atendimento prioritário", "Revisões garantidas", "Qualidade Ultra HD"], 
        destaque: true 
    },
    { 
        nome: "Master", 
        preco: "119,90", 
        itens: ["40 aprimoramentos", "Suporte VIP via WhatsApp", "Revisões ilimitadas", "Arquivos em máxima fidelidade"], 
        destaque: false 
    }
];

const pacotes = [
    { nome: "Starter Pack", qtd: "50 imagens", de: "249,90", por: "189,90", destaque: false },
    { nome: "Scale Content", qtd: "200 imagens", de: "799,90", por: "599,90", destaque: true },
    { nome: "Enterprise", qtd: "500 imagens", de: "1.799,90", por: "1.299,90", destaque: false }
];

const porQue = [
    "Algoritmos avançados de Inteligência Artificial combinados com validação técnica e olhar profissional."
];

const depoimentos = [
    { 
        nome: "Ana Souza", 
        texto: "Incrível! As fotos dos meus produtos mudaram de nível da noite para o dia. Super recomendo o trabalho da equipe.", 
        foto: "https://i.pinimg.com/originals/5a/ca/bd/5acabd7ca056f85db76caf75282a0b98.jpg" 
    },
    { 
        nome: "Carlos Mendes", 
        texto: "Superou minhas expectativas. Nossos materiais visuais ganharam um nível totalmente profissional.", 
        foto: "https://i.pinimg.com/474x/e1/05/41/e105419e21e2f0dfd1579c6aef739bb5.jpg" 
    }
];

const faqs = [
    { 
        q: "Qual o prazo padrão para entrega das imagens?", 
        a: "A maioria dos projetos é entregue no prazo de 24 horas úteis. Para demandas de alto volume, combinamos um cronograma personalizado." 
    },
    { 
        q: "Como envio as minhas fotos para edição?", 
        a: "Após confirmar o seu pedido, você envia seus arquivos diretamente via WhatsApp, Google Drive ou WeTransfer mantendo a qualidade original." 
    },
    { 
        q: "Quais formatos de arquivo vocês aceitam e entregam?", 
        a: "Aceitamos PNG, JPG, WEBP e formatos RAW. As imagens finais são entregues prontas para e-commerce ou redes sociais." 
    },
    { 
        q: "E se eu precisar de ajustes na imagem entregue?", 
        a: "Oferecemos etapas de revisão para garantir que o resultado atenda totalmente às suas expectativas visuais." 
    },
    { 
        q: "Quais são as formas de pagamento aceitas?", 
        a: "Aceitamos Pix, cartões de crédito e boleto bancário. O processamento é iniciado imediatamente após a confirmação." 
    },
    { 
        q: "Fotos tiradas por celular também podem ser aprimoradas?", 
        a: "Com certeza! A IA otimiza o contraste, a nitidez e as cores de fotos capturadas em smartphones de qualquer modelo." 
    }
];

// ==================== FUNÇÃO DE ENTRADA E EXIBIÇÃO ====================

function showAppScreen(userName) {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const greeting = document.getElementById('greeting');

    if (welcomeScreen) welcomeScreen.classList.add('hidden');
    if (mainContent) mainContent.classList.remove('hidden');
    if (greeting) greeting.innerHTML = `Bem-vindo(a), ${userName}! 👋`;
    
    renderAll();
}

function proceedToMain() {
    const nameInput = document.getElementById('user-name');
    const errorMsg = document.getElementById('error-msg');
    
    if (!nameInput) return;
    
    const nome = nameInput.value.trim();
    
    if (nome === '') {
        if (errorMsg) errorMsg.textContent = "Por favor, informe seu nome para prosseguir.";
        return;
    }
    
    localStorage.setItem('userName', nome);
    showAppScreen(nome);
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
    if (!container) return;
    container.innerHTML = servicos.map(s => `
        <div class="service-card">
            <h3>${s.titulo}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;
    container.innerHTML = portfolioItems.map(item => `
        <div class="portfolio-item">
            <h3>${item.titulo}</h3>
            <div class="portfolio-comparison">
                <div class="img-box before-box">
                    <span class="badge badge-antes">ANTES</span>
                    <img src="${item.antes}" alt="Antes da Otimização">
                </div>
                <div class="img-box after-box">
                    <span class="badge badge-depois">DEPOIS</span>
                    <img src="${item.depois}" alt="Depois da Otimização">
                </div>
            </div>
        </div>
    `).join('');
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container) return;
    container.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <div class="stat-number" data-target="${stat.numero}">0</div>
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
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target.toLocaleString('pt-BR');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(count).toLocaleString('pt-BR');
            }
        }, 30);
    });
}

function renderPlans() {
    const container = document.getElementById('plans-grid');
    if (!container) return;
    container.innerHTML = planos.map(plan => `
        <div class="plan-card ${plan.destaque ? 'featured' : ''}">
            ${plan.destaque ? `<div class="featured-badge">Mais Popular</div>` : ''}
            <div>
                <h3>${plan.nome}</h3>
                <div class="price">R$ ${plan.preco}</div>
                <ul>
                    ${plan.itens.map(i => `<li><i class="fa-solid fa-check" style="color:var(--accent); margin-right:8px;"></i>${i}</li>`).join('')}
                </ul>
            </div>
            <button onclick="contactWhatsApp()">Contratar Plano</button>
        </div>
    `).join('');
}

function renderPackages() {
    const container = document.getElementById('packages-grid');
    if (!container) return;
    container.innerHTML = pacotes.map(p => `
        <div class="package-card ${p.destaque ? 'featured' : ''}">
            ${p.destaque ? `<div class="featured-badge">Melhor Custo</div>` : ''}
            <div>
                <h3>${p.nome}</h3>
                <p class="qtd">${p.qtd}</p>
                <div class="price">
                    <span style="font-size:0.85rem; color:var(--text-muted); text-decoration:line-through; font-weight:normal;">De R$ ${p.de}</span><br>
                    R$ ${p.por}
                </div>
            </div>
            <button onclick="contactWhatsApp()">Adquirir Pacote</button>
        </div>
    `).join('');
}

function renderWhy() {
    const container = document.getElementById('why-grid');
    if (!container) return;
    container.innerHTML = porQue.map(item => `
        <div class="why-card">
            <p><i class="fa-solid fa-shield-halved" style="color:var(--accent); margin-right:8px;"></i>${item}</p>
        </div>
    `).join('');
}

function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;
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
    if (!container) return;
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

// ==================== INICIALIZAÇÃO E SUPABASE HANDLERS ====================

document.addEventListener('DOMContentLoaded', async () => {
    const savedTheme = localStorage.getItem('siteTheme') || 'dark';
    applyTheme(savedTheme);

    initTechBackground();

    // Listener do Formulário de Contato enviando para a tabela 'mensagen' do Supabase
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-msg-btn');
            if (submitBtn) submitBtn.disabled = true;

            const nome = document.getElementById('contact-nome').value;
            const email = document.getElementById('contact-email').value;
            const mensagem = document.getElementById('contact-mensagem').value;

            if (supabaseClient) {
                const { error } = await supabaseClient
                    .from('mensagen')
                    .insert([{ nome, email, mensagem }]);

                if (error) {
                    console.error('Erro ao enviar mensagem para o Supabase:', error);
                    alert('Houve um erro ao enviar a mensagem.');
                } else {
                    alert('Mensagem enviada com sucesso!');
                    contactForm.reset();
                }
            } else {
                alert('Mensagem enviada (Modo simulação).');
                contactForm.reset();
            }

            if (submitBtn) submitBtn.disabled = false;
        });
    }

    // Checa se o usuário retornou de um login do Google
    if (supabaseClient) {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
            const googleUserName = session.user.user_metadata.full_name || session.user.email;
            showAppScreen(googleUserName);
            return;
        }
    }

    // Tecla Enter no nome do convidado
    const nameInput = document.getElementById('user-name');
    if (nameInput) {
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                proceedToMain();
            }
        });
    }

    // Checa nome salvo no LocalStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        showAppScreen(savedName);
    }
});
