# 💍 Wedding Invitation Website

Um convite de casamento digital elegante e interativo, desenvolvido com tecnologias modernas e integrado com automação para gerenciamento de confirmações.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/proflucassilvas-projects/v0-wedding-invitation-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/glw4dbonAE6)

## 🌟 Sobre o Projeto

Este projeto é um convite de casamento digital desenvolvido para proporcionar uma experiência moderna e interativa aos convidados. O site permite que os convidados confirmem presença diretamente através de um modal de confirmação, com os dados sendo automaticamente registrados em uma planilha.

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

O projeto implementa um fluxo completo de confirmação de presença:

1. **Modal de Confirmação**: Os convidados preenchem um formulário no modal com suas informações
2. **Validação**: Os dados são validados usando React Hook Form + Zod
3. **Webhook**: Ao submeter, os dados são enviados para um webhook
4. **Make.com**: O webhook aciona um cenário no Make que processa as informações
5. **Planilha**: Os dados são automaticamente gravados em uma planilha (Google Sheets/Excel)

### Arquitetura da Integração

```
[Modal de Confirmação] 
    ↓
[Validação (Zod + React Hook Form)]
    ↓
[Webhook HTTP POST]
    ↓
[Make.com - Automação]
    ↓
[Planilha (Google Sheets)]
```

## 📦 Estrutura do Projeto

```
wedding_invitation/
├── app/                  # Pages e rotas Next.js
├── components/           # Componentes React reutilizáveis
├── lib/                  # Utilitários e helpers
├── public/               # Arquivos estáticos
├── styles/               # Estilos globais
├── components.json       # Configuração do Shadcn/ui
└── package.json          # Dependências do projeto
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
  "name": "Nome do Convidado",
  "email": "email@exemplo.com",
  "guests": 2,
  "attendance": true,
  "message": "Mensagem opcional"
}
```

## 🎨 Customização

O projeto foi desenvolvido inicialmente usando v0.app e pode ser customizado de duas formas:

1. **Via v0.app**: Continue editando no [chat do v0](https://v0.app/chat/glw4dbonAE6)
2. **Manualmente**: Edite os arquivos diretamente neste repositório

## 📝 Licença

Este é um projeto privado desenvolvido para um evento específico.

---

Desenvolvido com 💖 usando [v0.app](https://v0.app)