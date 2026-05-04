-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS portal_noticias_regional CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portal_noticias_regional;

-- 2. Tabela de Categorias
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 3. Tabela de Usuários (Autores/Admin)
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel ENUM('admin', 'redator') DEFAULT 'redator'
) ENGINE=InnoDB;

-- 4. Tabela de Cidades (Importante para portal Regional)
CREATE TABLE cidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    estado_sigla CHAR(2) NOT NULL
) ENGINE=InnoDB;

-- 5. Tabela de Notícias
CREATE TABLE noticias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    resumo TEXT,
    conteudo LONGTEXT NOT NULL,
    imagem_capa VARCHAR(255),
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('rascunho', 'publicado') DEFAULT 'rascunho',
    
    -- Relacionamentos
    categoria_id INT,
    autor_id INT,
    cidade_id INT,
    
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id) ON DELETE SET NULL,
    
    -- Índice para busca rápida por data
    INDEX idx_data (data_publicacao)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- DADOS DE EXEMPLO (Para teste inicial)
-- -----------------------------------------------------

INSERT INTO categorias (nome, slug) VALUES 
('Política', 'politica'),
('Esportes', 'esportes'),
('Cultura', 'cultura');

INSERT INTO cidades (nome, estado_sigla) VALUES 
('Rio Branco', 'AC'),
('Cruzeiro do Sul', 'AC');

INSERT INTO usuarios (nome, email, senha, nivel) VALUES 
('Admin', 'admin@portal.com', '123456', 'admin');

INSERT INTO noticias (titulo, resumo, conteudo, categoria_id, autor_id, cidade_id, status) VALUES 
('Novo parque é inaugurado', 'Cidade ganha área de lazer.', 'O conteúdo completo da notícia regional aqui...', 3, 1, 1, 'publicado');
