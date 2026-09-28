CREATE DATABASE IF NOT EXISTS gamecrud_db;
USE gamecrud_db;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    valor_compra DECIMAL(10, 2) NOT NULL,
    valor_venda DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados iniciais (Seed)
INSERT INTO produtos (descricao, marca, estoque, valor_compra, valor_venda) VALUES
('Controle Sem Fio DualSense', 'Sony', 25, 350.00, 449.90),
('Headset Gamer Cloud II', 'HyperX', 15, 280.00, 399.00),
('Teclado Mecânico BlackWidow V3', 'Razer', 10, 420.00, 599.99),
('Mouse Gamer G Pro X Superlight', 'Logitech', 18, 510.00, 699.00),
('Console PlayStation 5 Slim', 'Sony', 8, 3100.00, 3799.00);

