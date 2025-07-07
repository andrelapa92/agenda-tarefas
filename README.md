# Gerenciador de Tarefas

Uma aplicação web full-stack para gerenciamento de tarefas, construída com um backend em PHP com banco de dados MySQL e um frontend em React e totalmente conteinerizada com Docker.

## Funcionalidades

- **CRUD completo de tarefas**: Crie, leia, atualize e delete tarefas.
- **Interface Reativa**: Frontend construído com React e estilizado com Bootstrap.
- **Separação de Responsabilidades**: Backend e Frontend em serviços Docker separados.
- **Ambiente de Desenvolvimento Simples**: Suba toda a stack com um único comando.
- **Persistência de Dados**: Utiliza MySQL para armazenar as tarefas.

## Tecnologias Utilizadas

- **Backend**: PHP 8.2
- **Frontend**: React.js, Bootstrap 5
- **Banco de Dados**: MySQL 8.0
- **Servidor Web / Proxy Reverso**: Nginx
- **Conteinerização**: Docker, Docker Compose

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Docker](https://www.docker.com/get-started)

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    VIA HTTPS
    git clone https://github.com/andrelapa92/agenda-tarefas.git
    OU VIA SSH
    git@github.com:andrelapa92/agenda-tarefas.git
    cd agenda-tarefas
    ```

2.  **Crie o arquivo de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```
    Você pode ajustar as variáveis no arquivo `.env` se necessário, mas os valores padrão são projetados para funcionar com o Docker Compose.

3.  **Suba os contêineres:**
    Use o Docker Compose para construir as imagens e iniciar todos os serviços em modo de desenvolvimento.
    ```bash
    docker compose up -d
    ```

4.  **Acesse a aplicação:**
    - O **Frontend** estará disponível em: `http://localhost:8000`
    - A **API** do backend estará acessível através do mesmo endereço, no prefixo `/api`.

## Documentação da API

A API RESTful fornece os seguintes endpoints para gerenciar as tarefas:

---

#### Listar todas as tarefas
*   **Método:** `GET`
*   **Endpoint:** `/api/tasks`
*   **Resposta de Sucesso:** `200 OK` com um array de objetos de tarefa.

---

#### Obter uma tarefa específica
*   **Método:** `GET`
*   **Endpoint:** `/api/tasks/{id}`
*   **Resposta de Sucesso:** `200 OK` com o objeto da tarefa.

---

#### Criar uma nova tarefa
*   **Método:** `POST`
*   **Endpoint:** `/api/tasks`
*   **Corpo da Requisição (Exemplo):**
    ```json
    {
        "title": "Nova Tarefa",
        "description": "Descrição da nova tarefa...",
        "due_date": "2025-12-31"
    }
    ```
*   **Resposta de Sucesso:** `201 Created` com o objeto da tarefa criada.

---

#### Atualizar uma tarefa (parcialmente)
*   **Método:** `PATCH` ou `PUT`
*   **Endpoint:** `/api/tasks/{id}`
*   **Corpo da Requisição (Exemplo):**
    ```json
    { "status": "completed" }
    ```
*   **Resposta de Sucesso:** `200 OK` com o objeto da tarefa atualizada.

---

#### Excluir uma tarefa
*   **Método:** `DELETE`
*   **Endpoint:** `/api/tasks/{id}`
*   **Resposta de Sucesso:** `204 No Content`.

### Objeto Tarefa

Um objeto de tarefa retornado pela API terá a seguinte estrutura:

```json
{
    "id": 1,
    "title": "Comprar mantimentos",
    "description": "Leite, pão, ovos, frutas",
    "due_date": "2025-07-05",
    "status": "pending",
    "created_at": "2024-01-01 10:00:00",
    "updated_at": "2024-01-01 10:00:00"
}
```

## Estrutura do Projeto

```
/
├── backend/            # Contém a API em PHP puro
├── docker/             # Configurações do Nginx
├── frontend/           # Aplicação em React
├── .env.example        # Arquivo de exemplo para variáveis de ambiente
├── docker compose.yml  # Orquestração para ambiente de desenvolvimento
└── README.md           # Esta documentação
```

## Parando o Ambiente

Para derrubar todos os contêineres, execute:
```bash
docker compose down
```

Se desejar remover também os volumes (isso apagará os dados do banco de dados), use a flag `-v`:
```bash
docker compose down -v
```
