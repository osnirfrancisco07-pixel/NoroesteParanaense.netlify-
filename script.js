// 1. MENU MOBILE
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-menu-mobile');
    const nav = document.getElementById('nav-links');
    
    btn.onclick = (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
    };

    document.onclick = () => nav.classList.remove('active');
    
    // Fechar ao clicar no link (âncora)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.onclick = () => nav.classList.remove('active');
    });
});

// 2. NOTÍCIAS EM TEMPO REAL (RSS G1 PARANÁ)
async function carregarNoticiasRSS() {
    const container = document.getElementById('rss-news-container');
    const rssUrl = 'https://g1.globo.com/rss/g1/pr/norte-noroeste/';
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const res = await fetch(api);
        const data = await res.json();
        container.innerHTML = '';
        
        data.items.slice(0, 6).forEach(item => {
            const img = item.enclosure.link || 'posts/27317.jpg';
            container.innerHTML += `
                <article class="card-white">
                    <div class="img-box"><img src="${img}" onerror="this.src='posts/27317.jpg'"></div>
                    <h4 style="margin-top:10px; font-size:15px;">${item.title}</h4>
                    <a href="${item.link}" target="_blank" style="color:#004a8d; font-weight:bold; text-decoration:none; font-size:12px; display:block; margin-top:10px;">Ler notícia completa →</a>
                </article>`;
        });
    } catch (e) {
        container.innerHTML = '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
    }
}

// 3. MAPA, CLIMA E CHUVA
function initMapa() {
    const mapa = L.map('map').setView([-23.42, -51.93], 9); // Foco Maringá e região
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);
    let marker = L.marker([-23.42, -51.93]).addTo(mapa);

    async function atualizarInfoClima(lat, lng) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=precipitation_probability`;
        const res = await fetch(url);
        const d = await res.json();
        const hora = new Date().getHours();
        const probChuva = d.hourly.precipitation_probability[hora];

        document.getElementById('temp-atual').innerText = d.current_weather.temperature + '°C';
        document.getElementById('valor-chuva').innerText = probChuva;
        
        marker.setLatLng([lat, lng]).bindPopup(`<b>Clima aqui:</b><br>Temp: ${d.current_weather.temperature}°C<br>Chuva: ${probChuva}%`).openPopup();
    }

    mapa.on('click', e => atualizarInfoClima(e.latlng.lat, e.latlng.lng));
    atualizarInfoClima(-23.42, -51.93);
}

// 4. HORÓSCOPO
function atualizarHoroscopo() {
    const signo = document.getElementById('signoSelect').value;
    const desc = {
        "Áries": "Foco total na carreira e novos começos.",
        "Touro": "Momento de estabilidade e cuidado financeiro.",
        "Gêmeos": "Dia favorável para diálogos e parcerias.",
        "Câncer": "Siga sua intuição em assuntos do coração.",
        "Leão": "Sua liderança estará em evidência hoje.",
        "Virgem": "Organização trará a clareza que você precisa.",
        "Libra": "Busque harmonia e equilíbrio nas decisões.",
        "Escorpião": "Dia de transformações positivas e profundas.",
        "Sagitário": "Novas aventuras e conhecimentos surgindo.",
        "Capricórnio": "Trabalho duro que resultará em lucros.",
        "Aquário": "Inovação é o seu segredo para o sucesso hoje.",
        "Peixes": "Conecte-se com sua paz interior e espiritualidade."
    };
    document.getElementById('horoscopo-texto').innerText = desc[signo] || "Selecione um signo.";
}

// 5. INICIALIZAÇÃO GERAL
window.onload = () => {
    carregarNoticiasRSS();
    initMapa();
    
    // Ticker Móvel
    const track = document.getElementById('ticker-values');
    const content = `
        <span class="ticker-label">DÓLAR</span><span class="ticker-value">R$ 4,98</span>
        <span class="ticker-label">SOJA</span><span class="ticker-value">R$ 134,80</span>
        <span class="ticker-label">MILHO</span><span class="ticker-value">R$ 61,50</span>
    `;
    track.innerHTML = content + content + content; // Repetir para animação infinita

    // Relógio
    setInterval(() => {
        const r = document.getElementById('relogio-digital');
        if(r) r.innerText = new Date().toLocaleTimeString('pt-br');
    }, 1000);
};

// Funções Extras (Conversor)
function converterMoeda() {
    const v = document.getElementById('valorInput').value;
    const m = document.getElementById('moedaSelect').value;
    const taxa = m === 'USD' ? 4.98 : 5.42;
    if(v > 0) document.getElementById('resultadoCalc').innerText = `Total estimado: ${m} ${(v/taxa).toFixed(2)}`;
}
