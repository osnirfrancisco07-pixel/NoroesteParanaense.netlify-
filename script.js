// MENU
const menuBtn = document.getElementById("mobile-menu");
const menu = document.getElementById("nav-menu");

// abrir/fechar menu
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
});

// fechar ao clicar fora
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove("active");
    }
});

// fechar ao clicar em item
document.querySelectorAll("#nav-menu a").forEach(item => {
    item.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});


// BUSCA
function buscar() {
    let termo = document.getElementById("inputPesquisa").value;

    if (termo.trim() !== "") {
        alert("Você pesquisou: " + termo);
    }
}


// COTAÇÕES
async function carregarCotacoes() {
    try {
        let res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
        let data = await res.json();

        let conteudo = `
            <span>Dólar: R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}</span>
            <span>Euro: R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}</span>
            <span>Bitcoin: R$ ${parseFloat(data.BTCBRL.bid).toFixed(0)}</span>
        `;

        document.getElementById("cotacao-ticker").innerHTML = conteudo;
        document.getElementById("cotacao-ticker-dup").innerHTML = conteudo;

    } catch (erro) {
        console.error("Erro nas cotações:", erro);
    }
}


// CLIMA
async function carregarClima() {
    try {
        let res = await fetch("https://wttr.in/Maringa?format=j1");
        let data = await res.json();

        document.getElementById("cidade").innerText = "Maringá - PR";
        document.getElementById("temperatura").innerText = data.current_condition[0].temp_C + "°C";
        document.getElementById("condicao").innerText = data.current_condition[0].weatherDesc[0].value;

    } catch (erro) {
        console.error("Erro no clima:", erro);
    }
}


// INICIALIZAÇÃO
carregarCotacoes();
setInterval(carregarCotacoes, 60000);

carregarClima();
