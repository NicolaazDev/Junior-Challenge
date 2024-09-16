# Monorepo: Frontend e Backend

Este repositório contém um projeto monorepo com um backend em NestJS e um frontend. Abaixo estão as instruções para iniciar o frontend e o backend, além de como usar o Docker para configurar o backend.

## Estrutura do Projeto

```bash
/frontend # Código do frontend
/backend # Código do backend
```

## Requisitos

- Node.js (para frontend e backend)
- Docker (para backend)
- Docker Compose (para orquestrar os contêineres)

## Backend (NestJS)

### Configuração

1. Navegue para o diretório do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para iniciar o backend localmente, execute:

   ```bash
   npm run start
   ```

### Usando Docker

1. Navegue para o diretório do Backend:

   ```bash
   cd backend
   ```

2. Construa a imagem com container Docker:

   ```bash
   docker compose up -d
   ```

3. A API estará disponível em `http://localhost:3000`.

## Frontend

### Configuração

1. Navegue para o diretório do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para iniciar o frontend localmente, execute:

   ```bash
   npm run dev
   ```

4. O frontend estará disponível em `http://localhost:3001`.

## Documentação da API

A documentação da API está disponível em [SwaggerHub](https://app.swaggerhub.com/apis/JOHANHENRIQUE2K24/Desafio-Junior/1.0.0#/).

## Capturas de Tela

Aqui estão algumas capturas de tela do frontend:

### Página de Login

![Página de Login](https://res.cloudinary.com/do9d7j6b3/image/upload/v1726463374/Captura_de_tela_2024-09-16_020820_bjbkxf.png)

### Página de Cadastro

![Página de Cadastro](https://res.cloudinary.com/do9d7j6b3/image/upload/v1726463374/Captura_de_tela_2024-09-16_020849_ajkm1f.png)

## Contribuição

Se você quiser contribuir para este projeto, por favor, abra uma _issue_ ou um _pull request_.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
