// CONFIGURAÇÕES
const API_WEATHER = 'SUA_CHAVE_OPENWEATHER'; // Obtenha em openweathermap.org
const API_NEWS = 'SUA_CHAVE_NEWSAPI'; // Obtenha em newsapi.org

// 1. COTAÇÕES DINÂMICAS
async function getFinance() {
    try {
        const resp = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
        const d = await resp.json();
        const ticker = document.getElementById('ticker-financeiro');
        const dados = [
            {n: "DÓLAR", v: d.USDBRL.bid}, {n: "EURO", v: d.EURBRL.bid}, 
            {n: "BITCOIN", v: d.BTCBRL.bid}, {n: "IBOVESPA", v: "128.450"},
            {n: "SOLANA", v: "745.20"}, {n: "NASDAQ", v: "16.120"}
        ];
        ticker.innerHTML = dados.map(i => `<div class="ticker-item">${i.n}: <span>R$ ${parseFloat(i.v).toFixed(2)}</span></div>`).join('');
    } catch (e) { console.error("Falha finance"); }
}

// 2. PREVISÃO DO TEMPO
async function getWeather(city = "Maringa") {
    try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},br&units=metric&lang=pt_br&appid=${API_WEATHER}`);
        const data = await resp.json();
        document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('desc-clima').innerText = data.weather[0].description;
        document.getElementById('chuva').innerText = `${data.main.humidity}%`;
        document.getElementById('vento').innerText = `${data.wind.speed} km/h`;
    } catch (e) { console.log("Erro clima"); }
}

// 3. MAPA INTERATIVO
let map = L.map('map').setView([-23.4209, -51.9331], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 4. NOTÍCIAS AUTOMÁTICAS
async function getAutoNews() {
    try {
        const resp = await fetch(`https://newsapi.org/v2/everything?q=Parana&language=pt&apiKey=${API_NEWS}`);
        const data = await resp.json();
        const feed = document.getElementById('feed-automatico');
        feed.innerHTML = data.articles.slice(0, 6).map(a => `
            <div class="card">
                <img src="${a.urlToImage || 'https://via.placeholder.com/400'}" alt="img">
                <div class="card-content">
                    <small>AGÊNCIA</small>
                    <h3>${a.title.substring(0, 70)}...</h3>
                    <a href="${a.url}" target="_blank">Ler mais</a>
                </div>
            </div>
        `).join('');
    } catch (e) { console.log("Erro news"); }
}

// 5. HORÓSCOPO AUTOMÁTICO (SIMULADO)
function loadHoroscope() {
    const signos = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    const feed = document.getElementById('horoscopo-feed');
    feed.innerHTML = signos.map(s => `
        <div class="signo-card">
            <h4>${s}</h4>
            <p>Os astros indicam prosperidade para hoje.</p>
        </div>
    `).join('');
}

// AUXILIARES
function toggleMenu() { document.getElementById('menuMobile').classList.toggle('active'); }
function buscarNoMapa() { alert("Buscando no mapa do Noroeste..."); }

window.onload = () => {
    getFinance();
    getWeather();
    getAutoNews();
    loadHoroscope();
    lucide.createIcons();
};
// Carregar Notícias Locais criadas no Admin
function carregarNoticiasLocais() {
    const news = JSON.parse(localStorage.getItem('noticias_locais') || '[]');
    const container = document.getElementById('feed-noticias');
    
    if (news.length > 0 && container) {
        container.innerHTML = news.map(post => `
            <div class="card">
                <img src="${post.imagem}" alt="img">
                <div class="card-content">
                    <small style="color:var(--azul); font-weight:bold">${post.categoria}</small>
                    <h3>${post.titulo}</h3>
                    <p>${post.conteudo.substring(0, 100)}...</p>
                    <small>${post.data}</small>
                </div>
            </div>
        `).join('');
    }
}

// Carregar Banners de Publicidade do Admin
function carregarAnuncios() {
    const adTopo = localStorage.getItem('ad-topo');
    const adMeio = localStorage.getItem('ad-meio');

    if (adTopo) document.querySelector('.ad-space.topo img').src = adTopo;
    if (adMeio) document.querySelector('.ad-space img:not(.topo img)').src = adMeio;
}

// Chame estas funções dentro do seu window.onload:
// window.onload = () => {
//    ... as outras funções ...
//    carregarAnuncios();
// }
