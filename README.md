# 💍 Wedding Invitation Website

Um convite de casamento digital elegante e interativo, desenvolvido com tecnologias modernas e integrado com automação para gerenciamento de confirmações.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/proflucassilvas-projects/v0-wedding-invitation-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/glw4dbonAE6)

## 🌟 Sobre o Projeto

Este projeto é um convite de casamento digital desenvolvido para proporcionar uma experiência moderna e interativa aos convidados. O site permite que os convidados confirmem presença diretamente através de um modal de confirmação, com os dados sendo automaticamente registrados em uma planilha.

### ✨ Principais Características

- **Envelope Interativo**: Envelope realista com animação de abertura e selo de cera personalizado
- **Design Elegante**: Decorações florais personalizadas com imagens de alta qualidade
- **Sistema de Confirmação Inteligente**:
  - Autocomplete com validação de convidados
  - Seleção múltipla de nomes
  - Apenas convidados da lista podem confirmar presença
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

O projeto implementa um sistema robusto de confirmação de presença com validação, prazo limite e integração com Google Sheets:

1. **Lista de Convidados**: Arquivo JSON (`convidados.json`) contém todos os nomes autorizados
2. **Autocomplete Inteligente**: 
   - Enquanto digita, o sistema filtra e sugere nomes da lista
   - Exclui automaticamente nomes já selecionados
   - Busca case-insensitive em qualquer parte do nome
   - **Nomes já confirmados aparecem em cinza e não podem ser selecionados novamente**
3. **Seleção Múltipla**:
   - Possibilidade de selecionar vários convidados de uma vez
   - Chips visuais exibem os nomes selecionados acima do input
   - Fácil remoção individual através do botão X em cada chip
4. **Validação Rigorosa**:
   - Apenas nomes existentes na lista podem ser selecionados
   - Botão de confirmação só habilita com pelo menos 1 nome selecionado
   - Impossível confirmar presença sem selecionar da lista
   - Impossível selecionar nomes já confirmados
5. **Integração com Google Sheets**:
   - Sistema busca automaticamente nomes já confirmados da planilha
   - Exibe nomes confirmados com texto riscado e cinza
   - Etiqueta "(confirmado)" ao lado de nomes já processados
   - Atualização em tempo real via Google Apps Script
6. **Verificação de Prazo**: O sistema verifica automaticamente se ainda está dentro do prazo (até 28/02/2026)
7. **Webhook**: Ao submeter, os dados são enviados para um webhook do Make.com via API Route
8. **Make.com**: O webhook aciona um cenário no Make que processa as informações
9. **Planilha**: Os dados são automaticamente gravados em Google Sheets

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
[Lista de Convidados (JSON)]
    ↓
[Autocomplete com Filtro]
    ↓
[Google Sheets API - Busca nomes confirmados]
    ↓
[Exibe confirmados em cinza e bloqueados]
    ↓
[Seleção Múltipla de Nomes disponíveis]
    ↓
[Validação: Nomes existem na lista?]
    ↓
[Verificação de Prazo (28/02/2026)]
    ↓
[API Route (/api/rsvp)]
    ↓
[Webhook HTTP POST com array de nomes]
    ↓
[Make.com - Automação]
    ↓
[Google Sheets - Registro de confirmações]
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
│   ├── convidados.json      # Lista de convidados autorizados
│   └── api/
│       └── rsvp/
│           └── route.ts     # API Route para confirmações e busca de confirmados
├── components/               # Componentes React reutilizáveis
│   ├── wedding/
│   │   ├── envelope.tsx     # Componente do envelope interativo
│   │   ├── invitation-content.tsx  # Conteúdo do convite
│   │   ├── rsvp-modal.tsx   # Modal com autocomplete e validação de confirmados
│   │   └── floral-decoration.tsx   # Decorações florais (backup SVG)
│   └── theme-provider.tsx   # Provider de temas
├── lib/                      # Utilitários e helpers
├── public/
│   └── images/              # Imagens personalizadas
│       ├── floral-decoration.png
│       ├── floral-corner.png
│       ├── wedding-ring.png
│       └── signet.png
├── google-apps-script/       # Scripts do Google Sheets
│   └── Code.gs              # Apps Script para buscar nomes confirmados
├── styles/                   # Estilos globais
├── .env.local               # Variáveis de ambiente (Google Sheets + Webhook)
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

# Configurar variáveis de ambiente
# Crie o arquivo .env.local com SHEETS_API_URL e WEBHOOK_URL

# Executar em modo de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

### Requisitos

- Node.js 18+ 
- pnpm (ou npm/yarn)
- Conta Google (para Google Sheets)
- Conta Make.com (para automação do webhook)

## 🔗 Integração com Google Sheets e Make.com

### Configuração do Google Apps Script

1. **Acesse sua planilha no Google Sheets**
2. Vá em **Extensões > Apps Script**
3. Cole o código do arquivo `google-apps-script/Code.gs`
4. Clique em **Implantar > Nova implantação**
5. Selecione tipo: **Aplicativo da Web**
6. Configure:
   - **Executar como**: "Eu"
   - **Quem tem acesso**: "Qualquer pessoa"
7. Clique em **Implantar** e copie a URL gerada
8. Cole a URL no arquivo `.env.local` na variável `SHEETS_API_URL`

### Configuração do Webhook (Make.com)

Para configurar a integração com Make:

1. Crie um novo cenário no Make.com
2. Configure um webhook como trigger
3. Conecte com Google Sheets (ou outra planilha)
4. Mapeie os campos do formulário para as colunas da planilha
5. Configure a variável de ambiente `WEBHOOK_URL` no arquivo `.env.local`

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# URL do Google Apps Script para buscar confirmados
SHEETS_API_URL=https://script.google.com/macros/s/SEU_ID_AQUI/exec

# URL do webhook do Make.com para registrar confirmações
WEBHOOK_URL=https://hook.us2.make.com/SEU_WEBHOOK_AQUI
```

### Exemplo de Payload do Webhook

```json
{
  "names": [
    "Ana Silva",
    "João Pereira",
    "Maria Santos"
  ],
  "confirmedAt": "2026-01-23T10:30:00.000Z",
  "source": "wedding-invitation"
}
```

**Observações**:
- O campo `names` é um array contendo múltiplos nomes
- Cada confirmação pode incluir vários convidados simultaneamente
- O webhook recebe todos os nomes selecionados de uma vez
- A planilha deve ter os nomes na coluna A para o script funcionar corretamente

### Gerenciamento da Lista de Convidados

Para adicionar ou remover convidados autorizados:

1. Edite o arquivo `app/convidados.json`
2. Adicione ou remova nomes do array `convidados`
3. Mantenha o formato: `["Nome Completo", "Outro Nome", ...]`
4. O autocomplete será atualizado automaticamente

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
