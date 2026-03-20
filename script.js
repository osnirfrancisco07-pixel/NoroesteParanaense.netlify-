// Abrir e fechar menu hambúrguer
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 4. Função para buscar Clima (Exemplo usando API real pronta)
async function getPrevisao() {
    try {
        // Substitua 'SUA_CHAVE_AQUI' por uma chave da OpenWeatherMap
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL')}`);
        const data = await response.json();
        const moedas = JSON.parse(data.contents);
        
        document.getElementById('cotacao-ticker').innerHTML = `
            DÓLAR: R$ ${parseFloat(moedas.USDBRL.bid).toFixed(2)} | 
            EURO: R$ ${parseFloat(moedas.EURBRL.bid).toFixed(2)} | 
            ESTADO DO TEMPO: ATUALIZADO AUTOMATICAMENTE
        `;
    } catch (error) {
        console.log("Erro ao carregar dados externos.");
    }
}

// Iniciar funções
getPrevisao();
setInterval(getPrevisao, 600000); // Atualiza a cada 10 minutos
