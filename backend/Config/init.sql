SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Popular o banco com exemplos de tarefas
INSERT INTO tasks (title, description, due_date, status) VALUES
('Comprar mantimentos', 'Leite, pão, ovos, frutas', '2025-07-05', 'pending'),
('Pagar contas', 'Água, luz, internet', '2025-07-10', 'pending'),
('Lavar o carro', 'Limpeza interna e externa', '2025-07-07', 'completed');
