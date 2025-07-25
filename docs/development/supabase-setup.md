# Configuração do Supabase para Finance Control

## Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Node.js instalado

## Passos para configuração

### 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Escolha sua organização
4. Preencha:
   - **Name**: Finance Control
   - **Database Password**: (escolha uma senha segura)
   - **Region**: (escolha a região mais próxima)
5. Clique em "Create new project"

### 2. Executar o SQL de configuração

1. No painel do Supabase, vá para "SQL Editor"
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `backend/supabase/migrations/supabase-schema.sql`
4. Cole no editor e clique em "Run"

### 3. Configurar as variáveis de ambiente

1. No painel do Supabase, vá para "Settings" > "API"
2. Copie:
   - **Project URL**
   - **anon public key**

3. Abra o arquivo `src/services/SupabaseConfig.ts`
4. Substitua:
   ```typescript
   const supabaseUrl = 'https://your-project-ref.supabase.co'
   const supabaseAnonKey = 'your-anon-key'
   ```
   
   Por:
   ```typescript
   const supabaseUrl = 'SUA_PROJECT_URL_AQUI'
   const supabaseAnonKey = 'SUA_ANON_KEY_AQUI'
   ```

### 4. Configurar autenticação com Google (opcional)

1. No painel do Supabase, vá para "Authentication" > "Providers"
2. Encontre "Google" e clique em "Configure"
3. Ative o provider
4. Configure as credenciais do Google OAuth:
   - Vá para [Google Cloud Console](https://console.cloud.google.com/)
   - Crie um novo projeto ou selecione um existente
   - Ative a API do Google+
   - Crie credenciais OAuth 2.0
   - Configure as URLs de redirecionamento:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copie Client ID e Client Secret para o Supabase

### 5. Instalar dependências e executar

```bash
# Instalar dependências
npm install

# Executar o projeto
npm start
```

## Estrutura do banco de dados

### Tabelas criadas:

1. **user_profiles**: Perfis dos usuários
   - `id` (UUID, referência para auth.users)
   - `email` (TEXT)
   - `display_name` (TEXT)
   - `avatar_url` (TEXT)
   - `created_at`, `updated_at` (TIMESTAMP)

2. **transaction_categories**: Categorias de transações
   - `id` (UUID, chave primária)
   - `name` (TEXT)
   - `type` (TEXT: 'income' ou 'expense')
   - `icon` (TEXT)
   - `color` (TEXT)
   - `is_default` (BOOLEAN)
   - `created_at`, `updated_at` (TIMESTAMP)

3. **transactions**: Transações financeiras
   - `id` (UUID, chave primária)
   - `user_id` (UUID, referência para auth.users)
   - `title` (TEXT)
   - `type` (TEXT: 'income' ou 'expense')
   - `category` (TEXT)
   - `amount` (DECIMAL)
   - `created_at`, `updated_at` (TIMESTAMP)

### Views criadas:

1. **monthly_stats**: Estatísticas mensais de transações
   - Agrega receitas, despesas e saldo por mês para cada usuário

2. **category_stats**: Estatísticas por categoria
   - Agrega transações por categoria para cada usuário

### Políticas de segurança (RLS):

- Usuários só podem ver/editar seus próprios dados
- Criação automática de perfil quando usuário se registra
- Atualização automática de timestamps

## Funcionalidades migradas do Firebase:

✅ Autenticação com email/senha
✅ Autenticação com Google
✅ CRUD de transações
✅ Segurança por usuário
✅ Timestamps automáticos

## Troubleshooting

### Erro de CORS
Certifique-se de que a URL do seu app local está configurada nas configurações do Supabase em "Authentication" > "URL Configuration".

### Erro de RLS
Verifique se as políticas de Row Level Security estão ativas e configuradas corretamente.

### Problemas de autenticação
Verifique se as URLs de redirecionamento estão corretas tanto no Google Console quanto no Supabase.