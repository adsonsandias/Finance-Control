-- Schema para o Finance Control no Supabase

-- Tabela de perfis de usuário (estende auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de categorias de transações
CREATE TABLE IF NOT EXISTS public.transaction_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  icon TEXT,
  color TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de transações
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON public.transactions(category);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas de segurança para transaction_categories
CREATE POLICY "Everyone can view default categories" ON public.transaction_categories
  FOR SELECT USING (is_default = true);

-- Políticas de segurança para transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Função para criar perfil automaticamente quando um usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER handle_updated_at_user_profiles
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_transaction_categories
  BEFORE UPDATE ON public.transaction_categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_transactions
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Inserir categorias padrão
INSERT INTO public.transaction_categories (name, type, icon, color, is_default)
VALUES
  ('Salário', 'income', 'salary', '#4CAF50', true),
  ('Freelance', 'income', 'freelance', '#8BC34A', true),
  ('Investimento', 'income', 'investment', '#009688', true),
  ('Presente', 'income', 'gift', '#00BCD4', true),
  ('Outras Receitas', 'income', 'other_income', '#03A9F4', true),
  ('Alimentação', 'expense', 'food', '#F44336', true),
  ('Transporte', 'expense', 'transport', '#E91E63', true),
  ('Moradia', 'expense', 'housing', '#9C27B0', true),
  ('Utilidades', 'expense', 'utilities', '#673AB7', true),
  ('Saúde', 'expense', 'healthcare', '#3F51B5', true),
  ('Educação', 'expense', 'education', '#2196F3', true),
  ('Entretenimento', 'expense', 'entertainment', '#FF9800', true),
  ('Compras', 'expense', 'shopping', '#FF5722', true),
  ('Viagem', 'expense', 'travel', '#795548', true),
  ('Outras Despesas', 'expense', 'other_expense', '#607D8B', true)
ON CONFLICT DO NOTHING;

-- Views para relatórios

-- Estatísticas mensais
CREATE OR REPLACE VIEW public.monthly_stats AS
SELECT
  user_id,
  DATE_TRUNC('month', created_at) AS month,
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS balance,
  COUNT(*) AS transaction_count
FROM public.transactions
GROUP BY user_id, DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Estatísticas por categoria
CREATE OR REPLACE VIEW public.category_stats AS
SELECT
  user_id,
  category,
  type,
  COUNT(*) AS transaction_count,
  SUM(amount) AS total_amount,
  AVG(amount) AS avg_amount,
  MIN(created_at) AS first_transaction,
  MAX(created_at) AS last_transaction
FROM public.transactions
GROUP BY user_id, category, type
ORDER BY total_amount DESC;