// Dados simulados para o Horóscopo
const previsoes = {
    "Áries": "O dia pede iniciativa no trabalho. Evite gastos impulsivos.",
    "Touro": "Momento de estabilidade. Boa fase para conversas familiares.",
    "Gêmeos": "Sua comunicação está em alta. Aproveite para fazer contatos.",
    // Adicione os outros signos aqui...
    "Peixes": "Confie na sua intuição para resolver problemas pendentes."
};

function atualizarHoroscopo() {
    const signo = document.getElementById('signoSelect').value;
    const texto = previsoes[signo] || "Busque o equilíbrio em suas ações hoje.";
    document.getElementById('horoscopo-texto').innerHTML = `<strong>${signo}:</strong> ${texto}`;
}

function configurarCalendario() {
    const dataAtual = new Date();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    
    document.getElementById('calendar-display').innerHTML = `
        <div class="cal-header">${meses[dataAtual.getMonth()]}</div>
        <div class="cal-date">${dataAtual.getDate()}</div>
        <div class="cal-day">${dias[dataAtual.getDay()]}</div>
    `;
}

async function carregarConteudo() {
    const grid = document.getElementById('news-grid');
    // Simulando Notícias e Esportes (Geralmente vem de APIs de RSS)
    const noticias = [
        { titulo: "Noroeste FC vence clássico regional", cat: "ESPORTE", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400" },
        { titulo: "Novas obras de asfalto começam na segunda", cat: "NOTÍCIA", img: "posts/27317.jpg" },
        { titulo: "Previsão de chuva para o fim de semana", cat: "CLIMA", img: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400" }
    ];

    grid.innerHTML = noticias.map(n => `
        <div class="news-card">
            <div class="img-box"><img src="${n.img}"></div>
            <div class="news-body">
                <span class="tag">${n.cat}</span>
                <h4>${n.titulo}</h4>
                <a href="#" class="btn-link">Ler notícia</a>
            </div>
        </div>
    `).join('');
}

window.onload = () => {
    initTicker();   // Função das cotações infinitas
    initMap();      // Função do mapa
    configurarCalendario();
    carregarConteudo();
    atualizarHoroscopo();
};
