# Barbearia JP Cortes - Frontend

## Sobre o Projeto

Este projeto visa criar uma aplicação eficiente e responsiva para gestão e suporte aos usuários de um sistema de barbearia. A solução foi desenvolvida com foco em:

- Tela Login com funcionalidade de redefinição de senha a partir de uma chave segura.
- Telas liberadas de acordo com o perfil.
- Agendamento independente do Barbeiro.
- Autenticação segura: Implementada utilizando JWT para acesso seguro a rotas protegidas.
- Interface responsiva: Desenvolvida com React e Next.js, com estilizações usando Tailwind CSS.

## Tecnologias Utilizadas

### Frontend:
- **React e Next.js**
- **TypeScript**
- **Tailwind CSS**

### Backend:
- **Typescript e Next.js**
- **Autenticação com JWT**

### Ferramentas de Teste:
- **Thunder Client** para validação de rotas.

## Funcionalidades Principais

### Login
- Login seguro com validação de credenciais via backend.
- Armazenamento de token JWT no localStorage para autenticação de sessão.

### Redefinição de Senha
- Os usuários podem redefinir suas senhas informando:
  - Uma chave segura.
  - Uma nova senha.
  - Confirmação da nova senha.
- O backend valida e processa a redefinição através da rota `/clientes/{id}/senha`.


### Interface de Navegação
- Botões intuitivos para “Esqueci minha senha” e “Cadastrar”.
- Dropdown para opções adicionais com comportamento dinâmico e responsivo.

### Integração de Rotas
- Uso de rotas protegidas para assegurar acesso apenas a usuários autenticados.
- Testes das rotas backend realizados previamente para garantir comunicação eficiente.

## Estrutura de Arquivos

```
/
|-- /components
|   |-- LoginForm.tsx
|   |-- RedefinirSenhaForm.tsx
|
|-- /pages
|   |-- login.tsx
|   |-- home.tsx
|
|-- /styles
|   |-- globals.css
|
|-- /backend
    |-- server.js
    |-- routes
```

## Passos para Executar

### Backend

1. Certifique-se de que o backend está configurado corretamente.
2. Execute o servidor localmente (porta padrão: localhost:5000).
3. Teste as rotas com Thunder Client ou outra ferramenta de sua preferência.

### Frontend

1. Navegue para o diretório do projeto.
2. Instale as dependências com:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento com:
   ```bash
   npm run dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação ou [https://barberia-react-frontend.vercel.app/]

## Funcionalidades Futuras

- Expansão para suporte a módulos educacionais adicionais.
- Gamificação para aumentar o engajamento dos usuários.
- Análise de desempenho detalhada através de dashboards dinâmicos.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork deste repositório.
2. Crie uma branch para sua funcionalidade: 
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit de suas alterações:
   ```bash
   git commit -m 'Minha nova função'
   ```
4. Faça push para a branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Autor

Desenvolvido por Kauã Nogueira Watanabe Nome.

Instituição: Faculdade de Tecnologia de Indaiatuba.

