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
  - Input de texto livre com validação "por trás"
  - Suporte a múltiplos nomes separados por vírgula
  - Apenas convidados da lista podem confirmar presença
  - Validação fuzzy para nomes similares
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
2. **Input de Texto Livre**: 
   - Usuário digita seu(s) nome(s) completo(s) diretamente
   - Suporte a múltiplos nomes separados por vírgula ou ponto-e-vírgula
   - Sem dropdown visível - validação acontece em segundo plano
3. **Validação Inteligente**:
   - Normalização automática de strings (case-insensitive, remoção de espaços extras)
   - Match exato contra a lista de convidados
   - Busca fuzzy para sugerir nomes similares em caso de erro de digitação
   - Validação de nomes já confirmados anteriormente
4. **Processamento de Múltiplos Nomes**:
   - Split automático por vírgula ou ponto-e-vírgula
   - Validação individual de cada nome
   - Confirmação parcial: processa nomes válidos mesmo que alguns tenham problemas
   - Feedback detalhado sobre nomes inválidos ou já confirmados
5. **Integração com Google Sheets**:
   - Sistema busca automaticamente nomes já confirmados da planilha
   - Bloqueia re-confirmação de nomes já processados
   - Exibe mensagem informativa quando nome já foi confirmado
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
[Input de Texto Livre - Usuário digita nome(s)]
    ↓
[Google Sheets API - Busca nomes confirmados]
    ↓
[Split por vírgula/ponto-e-vírgula]
    ↓
[Normalização de strings (lowercase, trim)]
    ↓
[Validação de cada nome]
    ├─ Match exato na lista? ✓
    ├─ Já confirmado? ℹ️ (ignora, mas continua)
    └─ Nome similar? (sugestão fuzzy)
    ↓
[Processamento Inteligente]
    ├─ Válidos → Confirma
    ├─ Já confirmados → Informa na tela de sucesso
    └─ Inválidos → Informa na tela de sucesso (se houver válidos)
    ↓
[Verificação de Prazo (28/02/2026)]
    ↓
[API Route (/api/rsvp) - Validação backend adicional]
    ↓
[Webhook HTTP POST com array de nomes válidos]
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
│   ├── convidados.json      # Lista de cinput livre e validação inteligente
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
    "Maria Santos" validados
- Cada confirmação pode incluir vários convidados simultaneamente
- O webhook recebe apenas os nomes válidos que foram processados com sucesso
- A planilha deve ter os nomes na coluna A para o script funcionar corretamente
- Nomes já confirmados ou inválidos são filtrados antes do envio

### Exemplos de Validação

**Entrada do usuário**: `"joão silva, Maria Santos, pedro costa"`

**Processamento**:
1. Split: `["joão silva", "Maria Santos", "pedro costa"]`
2. Normalização: `["joão silva", "maria santos", "pedro costa"]`
3. Validação contra `convidados.json`:
   - "joão silva" → Match com "João Silva" ✓
   - "maria santos" → Já confirmado ℹ️
   - "pedro costa" → Não encontrado ❌

**Resultado**:
- Se "João Silva" está na lista e "Maria Santos" já confirmado:
  -A validação será atualizada automaticamente

**Dica**: Use nomes completos para evitar ambiguidade (ex: "João Silva" em vez de só "João")
  - 🎉 Tela de sucesso com aviso: "ℹ️ Maria Santos já tinha presença confirmada anteriormente. ⚠️ pedro costa não foi encontrado na lista de convidados."
  
- Se todos os nomes tiverem problemas:
  - ❌ Bloqueia e mostra erro detalhado
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
