// MENU MOBILE
const menu = document.getElementById("mobile-menu");
const nav = document.getElementById("nav-menu");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// BUSCA
function buscar() {
    let termo = document.getElementById("inputPesquisa").value;
    alert("Você pesquisou: " + termo);
}

// COTAÇÕES COM CORES
async function carregarCotacoes() {
    try {
        let res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
        let data = await res.json();

        let texto = `
            <span class="moeda">Dólar:</span> 
            <span class="valor">R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}</span>
            <span class="sep"> | </span>

            <span class="moeda">Euro:</span> 
            <span class="valor">R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}</span>
            <span class="sep"> | </span>

            <span class="moeda">Bitcoin:</span> 
            <span class="valor">R$ ${parseFloat(data.BTCBRL.bid).toFixed(0)}</span>
        `;

        document.getElementById("cotacao-ticker").innerHTML = texto;

    } catch {
        document.getElementById("cotacao-ticker").innerText = "Erro ao carregar cotações";
    }
}

carregarCotacoes();

// CLIMA
async function carregarClima() {
    try {
        let res = await fetch("https://wttr.in/Maringa?format=j1");
        let data = await res.json();

        document.getElementById("cidade").innerText = "Maringá - PR";
        document.getElementById("temperatura").innerText = data.current_condition[0].temp_C + "°C";
        document.getElementById("condicao").innerText = data.current_condition[0].weatherDesc[0].value;

    } catch {
        document.getElementById("condicao").innerText = "Erro ao carregar clima";
    }
}

carregarClima();
