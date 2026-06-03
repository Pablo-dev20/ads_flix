# 🎬 ADS Flix - Ionic & Angular Standalone

Repositório dedicado ao **ADS Flix**, o projeto prático da **AV1** na disciplina de **Desenvolvimento Mobile** (UNINASSAU). O aplicativo é uma plataforma de catálogo e busca de filmes que consome dados em tempo real de uma API pública, aplicando os conceitos de componentização, controle de fluxo e diretivas customizadas.

## 🔗 Link do Projeto (Vercel)
👉 [https://ads-flix.vercel.app/]

---

## 👥 Divisão do Grupo & Requisitos

Para garantir a organização e os critérios de avaliação do professor, o desenvolvimento do projeto foi distribuído da seguinte forma:

| Integrante | Responsabilidade Técnica | Componente / Arquivo | Nota |
| :--- | :--- | :--- | :--- |
| **Integrante 1** | Configuração global e Injeção do `HttpClient` | `app.config.ts` | 0.5 pts |
| **Integrante 2** | Criação do Serviço e consumo da API (Método GET) | `services/cinema.service.ts` | 1.0 pt |
| **Integrante 3** | Layout da Home e listagem com `@for` | `pages/home` | 0.5 pts |
| **Integrante 4** | Tela de Busca e lógica condicional `@if` | `pages/buscar` | 0.5 pts |
| **Integrante 5** | Tratamento de dados com Pipes (Nativo e Customizado) | `pipes/` | 1.0 pt |
| **Integrante 6** | Diretiva Personalizada com efeito visual | 0.5 pts |
| **Integrante 7** | Navegação e passagem de parâmetros (Ponto Extra) | `pages/detalhes` | 1.5 pts |

* **Responsável pelo método GET (Integrante 2):** Jhessimiel Nascimento
* **Responsável pelo Layout da Home e listagem com `@for` (Integrante 3):** Cleidson Danilo 
* **Responsável por Tratamento de dados com Pipes (Nativo e Customizado (Integrante 5):** Eduardo Sidney 
* **Responsável Diretiva Personalizada com efeito visual (Integrante 6):** Daniel Oliveira
---

## 🚀 Tecnologias Utilizadas
* **Framework:** [Ionic Framework](https://ionicframework.com/) (Componentes UI nativos)
* **Lógica & Core:** [Angular Standalone](https://angular.dev/) (Control Flow & HttpClient)
* **Linguagem:** TypeScript
* **Hospedagem:** Vercel

---

## 🛠️ Como Executar o Projeto Localmente

Abra o seu terminal e execute os comandos abaixo na ordem indicada:

```bash
# 1. Clone o repositório
git clone [https://github.com/cleidson-danilo/anotacao_mobile.git](https://github.com/cleidson-danilo/anotacao_mobile.git)

# 2. Acesse a pasta raiz do código Ionic
cd projeto

# 3. Instale as dependências do projeto
npm install

# 4. Inicie o app no navegador
ionic serve

   
