# 💍 Wedding Invitation Website

Um convite de casamento digital elegante e interativo, desenvolvido com tecnologias modernas e integrado com automação para gerenciamento de confirmações.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/proflucassilvas-projects/v0-wedding-invitation-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/glw4dbonAE6)

## 🌟 Sobre o Projeto

Este projeto é um convite de casamento digital desenvolvido para proporcionar uma experiência moderna e interativa aos convidados. O site permite que os convidados confirmem presença diretamente através de um modal de confirmação, com os dados sendo automaticamente registrados em uma planilha.

### ✨ Principais Características

- **Envelope Interativo**: Envelope realista com animação de abertura e selo de cera personalizado
- **Design Elegante**: Decorações florais personalizadas com imagens de alta qualidade
- **Confirmação com Prazo**: Sistema de RSVP com prazo limite (28/02/2026)
- **Responsivo**: Totalmente adaptável para diferentes dispositivos
- **Animações Suaves**: Transições e animações com Framer Motion

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 16** - Framework React para produção
- **React 19** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animações para React

### UI Components

- **Radix UI** - Componentes acessíveis e não estilizados
- **Lucide React** - Ícones modernos
- **Shadcn/ui** - Componentes reutilizáveis construídos com Radix UI

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de esquemas TypeScript-first

### Integrações

- **Webhook + Make.com** - Automação para registro de confirmações
- **Vercel Analytics** - Análise de performance e métricas

## 🔧 Como Funciona

### Sistema de Confirmação de Presença

O projeto implementa um fluxo completo de confirmação de presença com prazo limite:

1. **Modal de Confirmação**: Os convidados preenchem um formulário no modal com suas informações
2. **Validação de Prazo**: O sistema verifica automaticamente se ainda está dentro do prazo (até 28/02/2026)
3. **Validação de Dados**: Os dados são validados usando React Hook Form + Zod
4. **Webhook**: Ao submeter, os dados são enviados para um webhook via API Route
5. **Make.com**: O webhook aciona um cenário no Make que processa as informações
6. **Planilha**: Os dados são automaticamente gravados em uma planilha (Google Sheets/Excel)

### Recursos Visuais

- **Envelope Realista**: Design tridimensional com texturas de papel, vincos e sombras realistas
- **Selo de Cera**: Imagem personalizada do selo (`signet.png`) com animações interativas
- **Decoração Floral**:  
  - Tela inicial com imagem de fundo floral (`floral-decoration.png`) ocupando toda altura
  - Cantos decorativos na página do convite (`floral-corner.png`)
  - Opacidade otimizada para melhor visibilidade
- **Ícones Personalizados**: Alianças de casamento (`wedding-ring.png`) em vez de SVG genérico

### Arquitetura da Integração

```bash
[Modal de Confirmação] 
    ↓
[Verificação de Prazo (28/02/2026)]
    ↓
[Validação (Zod + React Hook Form)]
    ↓
[API Route (/api/rsvp)]
    ↓
[Webhook HTTP POST]
    ↓
[Make.com - Automação]
    ↓
[Planilha (Google Sheets)]
```

## 🎨 Assets e Recursos Visuais

O projeto utiliza imagens personalizadas localizadas em `public/images/`:

- **floral-decoration.png**: Decoração de fundo da tela inicial (envelope)
- **floral-corner.png**: Decorações nos cantos da página do convite
- **wedding-ring.png**: Ícone de alianças de casamento
- **signet.png**: Selo de cera para o envelope

Todas as decorações florais foram otimizadas com opacidade ajustada para melhor visualização.

## 📦 Estrutura do Projeto

```bash
wedding_invitation/
├── app/                      # Pages e rotas Next.js
│   ├── page.tsx             # Página principal com envelope e convite
│   ├── layout.tsx           # Layout global
│   ├── globals.css          # Estilos globais
│   └── api/
│       └── rsvp/
│           └── route.ts     # API Route para confirmações
├── components/               # Componentes React reutilizáveis
│   ├── wedding/
│   │   ├── envelope.tsx     # Componente do envelope interativo
│   │   ├── invitation-content.tsx  # Conteúdo do convite
│   │   ├── rsvp-modal.tsx   # Modal de confirmação com prazo
│   │   └── floral-decoration.tsx   # Decorações florais (backup SVG)
│   └── theme-provider.tsx   # Provider de temas
├── lib/                      # Utilitários e helpers
├── public/
│   └── images/              # Imagens personalizadas
│       ├── floral-decoration.png
│       ├── floral-corner.png
│       ├── wedding-ring.png
│       └── signet.png
├── styles/                   # Estilos globais
├── components.json           # Configuração do Shadcn/ui
└── package.json              # Dependências do projeto
```

## 🌐 Deploy

O projeto está hospedado na Vercel com deploy contínuo configurado:

**URL de Produção**: [https://vercel.com/proflucassilvas-projects/v0-wedding-invitation-website](https://vercel.com/proflucassilvas-projects/v0-wedding-invitation-website)

### Processo de Deploy

1. Alterações são feitas via v0.app
2. Commits automáticos são feitos neste repositório
3. Vercel detecta as mudanças e realiza o deploy automaticamente

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Executar em modo de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 🔗 Integração com Make.com

Para configurar a integração com Make:

1. Crie um novo cenário no Make.com
2. Configure um webhook como trigger
3. Conecte com Google Sheets (ou outra planilha)
4. Mapeie os campos do formulário para as colunas da planilha
5. Atualize a URL do webhook no código do modal

### Exemplo de Payload do Webhook

```json
{
  "fullName": "Nome Completo do Convidado",
  "confirmedAt": "2026-01-23T10:30:00.000Z"
}
```

### Prazo de Confirmação

O sistema implementa um controle de prazo automático:
- **Prazo Limite**: 28 de fevereiro de 2026 (23:59:59)
- **Após o prazo**:  
  - Campo de nome fica desabilitado
  - Botão de confirmação desabilitado
  - Mensagem de "Prazo Encerrado" exibida
  - Validação automática no frontend

## 🎨 Customização

O projeto foi desenvolvido inicialmente usando v0.app e pode ser customizado de duas formas:

1. **Via v0.app**: Continue editando no [chat do v0](https://v0.app/chat/glw4dbonAE6)
2. **Manualmente**: Edite os arquivos diretamente neste repositório

## 📝 Licença

Este é um projeto privado desenvolvido para um evento específico.

---

Desenvolvido com carinho!
