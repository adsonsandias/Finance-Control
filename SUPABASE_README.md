# Migração para Supabase - Finance Control

## Visão Geral

Este projeto foi migrado para utilizar o Supabase como banco de dados e serviço de autenticação. O Supabase é uma alternativa open-source ao Firebase, oferecendo banco de dados PostgreSQL, autenticação, armazenamento de arquivos e funções serverless.

## Configuração Local

### Pré-requisitos

- Node.js instalado
- Docker instalado (para rodar o Supabase localmente)

### Passos para Configuração

1. **Instalar CLI do Supabase**

```bash
npm install -g supabase
```

2. **Iniciar Supabase localmente**

```bash
npx supabase start
```

Isso iniciará o Supabase localmente com PostgreSQL, Studio e outros serviços.

3. **Aplicar o Schema**

```bash
./backend/scripts/update-supabase-schema.sh
```

Este script aplicará o schema definido em `backend/supabase/migrations/supabase-schema.sql`.

4. **Acessar o Supabase Studio**

O Supabase Studio estará disponível em: http://localhost:54323

Credenciais padrão:
- Email: admin@example.com
- Senha: admin

## Estrutura do Banco de Dados

### Tabelas

1. **user_profiles**
   - Perfis dos usuários vinculados às contas de autenticação
   - Campos: id, email, display_name, avatar_url, created_at, updated_at

2. **transaction_categories**
   - Categorias para transações (receitas e despesas)
   - Campos: id, name, type, icon, color, is_default, created_at, updated_at

3. **transactions**
   - Transações financeiras dos usuários
   - Campos: id, user_id, title, type, category, amount, created_at, updated_at

### Views

1. **monthly_stats**
   - Estatísticas mensais de transações por usuário

2. **category_stats**
   - Estatísticas de transações por categoria e usuário

## Segurança

O banco de dados utiliza Row Level Security (RLS) para garantir que os usuários só possam acessar seus próprios dados. As políticas de segurança estão definidas no schema SQL.

## Integração no Backend

O backend já está configurado para utilizar o Supabase através do cliente JavaScript. As rotas de transações e usuários foram atualizadas para usar o Supabase em vez de consultas SQL diretas.

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no arquivo `.env`:

```
SUPABASE_URL=http://localhost:54323
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Você pode obter essas chaves após iniciar o Supabase localmente com `npx supabase start`.

## Integração no Frontend

O frontend já está configurado para utilizar o Supabase para autenticação e operações de banco de dados. Os repositórios e serviços foram atualizados para usar o cliente Supabase.

## Troubleshooting

### Erro de Conexão com o Supabase

Se você encontrar erros de conexão, verifique se:

1. O Supabase está rodando localmente (`npx supabase status`)
2. As variáveis de ambiente estão configuradas corretamente
3. O schema foi aplicado corretamente

### Erro de Autenticação

Se encontrar erros de autenticação, verifique:

1. Se o token está sendo enviado corretamente nos cabeçalhos
2. Se as políticas RLS estão configuradas corretamente
3. Se o usuário tem permissão para acessar os dados

## Recursos Adicionais

- [Documentação do Supabase](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/supabase-client)
- [Supabase Auth](https://supabase.io/docs/guides/auth)