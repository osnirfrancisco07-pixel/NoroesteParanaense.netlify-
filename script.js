 :root {
    --azul: #003366;
}

body {
    margin: 0;
    font-family: Arial;
    background: #f4f7f6;
}

/* LOGO */
.logo {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    padding: 15px;
    color: var(--azul);
}

.sub-logo {
    display: block;
    font-size: 14px;
}

/* COTAÇÕES */
.ticker-container {
    background: #eee;
    padding: 8px;
    text-align: center;
}

/* COTAÇÕES - UMA LINHA */
#cotacao-ticker {
    white-space: nowrap;
}

/* CORES DAS COTAÇÕES */
.moeda {
    color: #003366;
    font-weight: bold;
}

.valor {
    color: #1b8f3a;
    font-weight: bold;
}

.sep {
    color: #555;
    margin: 0 5px;
}

/* MENU */
.navbar {
    background: var(--azul);
    padding: 10px;
    position: sticky;
    top: 0;
}

.nav-menu {
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 15px;
}

.nav-menu a {
    color: white;
    text-decoration: none;
}

/* PESQUISA - ABAIXO DO MENU E À ESQUERDA */
.search-bar-container {
    background: white;
    padding: 15px 5%;
    display: flex;
    justify-content: flex-start; /* ESQUERDA */
}

.search-box {
    display: flex;
    width: 100%;
    max-width: 400px;
}

.search-box input {
    flex: 1;
    padding: 10px;
}

.search-box button {
    background: var(--azul);
    color: white;
    border: none;
    padding: 10px;
}

/* CLIMA */
.weather-card {
    background: var(--azul);
    color: white;
    margin: 20px;
    padding: 20px;
    text-align: center;
}

/* RODAPÉ */
footer {
    background: var(--azul);
    color: white;
    text-align: center;
    padding: 20px;
}

.social-icon {
    font-size: 20px;
    margin: 10px;
}

.fb { color: #1877F2; }
.insta { color: #E4405F; }
.whats { color: #25D366; }

/* MOBILE */
.menu-toggle {
    display: none;
    color: white;
    font-size: 20px;
}

@media(max-width:768px){
    .nav-menu {
        display: none;
        flex-direction: column;
    }

    .nav-menu.active {
        display: flex;
    }

    .menu-toggle {
        display: block;
    }
}
