# Migration to Supabase - Finance Control

## Overview

This project has been migrated to use Supabase as a database and authentication service. Supabase is an open-source alternative to Firebase, offering PostgreSQL database, authentication, file storage, and serverless functions.

## Local Configuration

### Prerequisites

- Node.js installed
- Docker installed (to run Supabase locally)

### Configuration Steps

1. **Install Supabase CLI**

```bash
# macOS
brew install supabase/tap/supabase

# Linux
curl -s https://raw.githubusercontent.com/supabase/cli/main/install.sh | bash
```

2. **Start Supabase locally**

```bash
supabase start
```

This will start Supabase locally with PostgreSQL, Studio, and other services.

3. **Apply the Schema**

```bash
./backend/scripts/update-supabase-schema.sh
```

This script will apply the schema defined in `backend/supabase/migrations/supabase-schema.sql`.

4. **Access Supabase Studio**

Supabase Studio will be available at: http://localhost:54323

Default credentials:
- Email: admin@example.com
- Password: admin

## Database Structure

### Tables

1. **user_profiles**
   - User profiles linked to authentication accounts
   - Fields: id, email, display_name, avatar_url, created_at, updated_at

2. **transaction_categories**
   - Categories for transactions (income and expenses)
   - Fields: id, name, type, icon, color, is_default, created_at, updated_at

3. **transactions**
   - Users' financial transactions
   - Fields: id, user_id, title, type, category, amount, created_at, updated_at

### Views

1. **monthly_stats**
   - Monthly transaction statistics by user

2. **category_stats**
   - Transaction statistics by category and user

## Security

The database uses Row Level Security (RLS) to ensure that users can only access their own data. Security policies are defined in the SQL schema.

## Backend Integration

The backend is already configured to use Supabase through the JavaScript client. Transaction and user routes have been updated to use Supabase instead of direct SQL queries.

### Environment Variables

Configure the following environment variables in the `.env` file:

```
SUPABASE_URL=http://localhost:54323
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

You can obtain these keys after starting Supabase locally with `supabase start`.

## Frontend Integration

The frontend is already configured to use Supabase for authentication and database operations. Repositories and services have been updated to use the Supabase client.

## Troubleshooting

### Supabase Connection Error

If you encounter connection errors, check if:

1. Supabase is running locally (`supabase status`)
2. Environment variables are correctly configured
3. The schema was applied correctly

### Authentication Error

If you encounter authentication errors, check:

1. If the token is being sent correctly in the headers
2. If RLS policies are configured correctly
3. If the user has permission to access the data

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/supabase-client)
- [Supabase Auth](https://supabase.io/docs/guides/auth)