-- Dados de exemplo para o Finance Control

-- Criar um usuário de teste
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'usuario@exemplo.com', '{"display_name": "Usuário Teste"}', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Inserir perfil do usuário de teste (será criado automaticamente pelo trigger, mas garantimos aqui)
INSERT INTO public.user_profiles (id, email, display_name, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'usuario@exemplo.com', 'Usuário Teste', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Inserir transações de exemplo para o usuário de teste
INSERT INTO public.transactions (user_id, title, type, category, amount, created_at)
VALUES
  -- Receitas
  ('00000000-0000-0000-0000-000000000000', 'Salário Janeiro', 'income', 'Salário', 5000.00, NOW() - INTERVAL '60 days'),
  ('00000000-0000-0000-0000-000000000000', 'Salário Fevereiro', 'income', 'Salário', 5000.00, NOW() - INTERVAL '30 days'),
  ('00000000-0000-0000-0000-000000000000', 'Salário Março', 'income', 'Salário', 5000.00, NOW()),
  ('00000000-0000-0000-0000-000000000000', 'Freelance Site XYZ', 'income', 'Freelance', 1200.00, NOW() - INTERVAL '45 days'),
  ('00000000-0000-0000-0000-000000000000', 'Dividendos', 'income', 'Investimento', 350.00, NOW() - INTERVAL '15 days'),
  ('00000000-0000-0000-0000-000000000000', 'Presente de aniversário', 'income', 'Presente', 200.00, NOW() - INTERVAL '20 days'),
  
  -- Despesas
  ('00000000-0000-0000-0000-000000000000', 'Supermercado', 'expense', 'Alimentação', 650.00, NOW() - INTERVAL '55 days'),
  ('00000000-0000-0000-0000-000000000000', 'Restaurante', 'expense', 'Alimentação', 120.00, NOW() - INTERVAL '50 days'),
  ('00000000-0000-0000-0000-000000000000', 'Supermercado', 'expense', 'Alimentação', 580.00, NOW() - INTERVAL '25 days'),
  ('00000000-0000-0000-0000-000000000000', 'Restaurante', 'expense', 'Alimentação', 85.00, NOW() - INTERVAL '10 days'),
  ('00000000-0000-0000-0000-000000000000', 'Combustível', 'expense', 'Transporte', 200.00, NOW() - INTERVAL '58 days'),
  ('00000000-0000-0000-0000-000000000000', 'Combustível', 'expense', 'Transporte', 200.00, NOW() - INTERVAL '28 days'),
  ('00000000-0000-0000-0000-000000000000', 'Manutenção carro', 'expense', 'Transporte', 350.00, NOW() - INTERVAL '40 days'),
  ('00000000-0000-0000-0000-000000000000', 'Aluguel', 'expense', 'Moradia', 1500.00, NOW() - INTERVAL '60 days'),
  ('00000000-0000-0000-0000-000000000000', 'Aluguel', 'expense', 'Moradia', 1500.00, NOW() - INTERVAL '30 days'),
  ('00000000-0000-0000-0000-000000000000', 'Aluguel', 'expense', 'Moradia', 1500.00, NOW()),
  ('00000000-0000-0000-0000-000000000000', 'Conta de luz', 'expense', 'Utilidades', 150.00, NOW() - INTERVAL '55 days'),
  ('00000000-0000-0000-0000-000000000000', 'Conta de água', 'expense', 'Utilidades', 80.00, NOW() - INTERVAL '55 days'),
  ('00000000-0000-0000-0000-000000000000', 'Internet', 'expense', 'Utilidades', 120.00, NOW() - INTERVAL '55 days'),
  ('00000000-0000-0000-0000-000000000000', 'Conta de luz', 'expense', 'Utilidades', 165.00, NOW() - INTERVAL '25 days'),
  ('00000000-0000-0000-0000-000000000000', 'Conta de água', 'expense', 'Utilidades', 80.00, NOW() - INTERVAL '25 days'),
  ('00000000-0000-0000-0000-000000000000', 'Internet', 'expense', 'Utilidades', 120.00, NOW() - INTERVAL '25 days'),
  ('00000000-0000-0000-0000-000000000000', 'Consulta médica', 'expense', 'Saúde', 200.00, NOW() - INTERVAL '35 days'),
  ('00000000-0000-0000-0000-000000000000', 'Farmácia', 'expense', 'Saúde', 120.00, NOW() - INTERVAL '32 days'),
  ('00000000-0000-0000-0000-000000000000', 'Curso online', 'expense', 'Educação', 300.00, NOW() - INTERVAL '45 days'),
  ('00000000-0000-0000-0000-000000000000', 'Livros', 'expense', 'Educação', 150.00, NOW() - INTERVAL '15 days'),
  ('00000000-0000-0000-0000-000000000000', 'Cinema', 'expense', 'Entretenimento', 60.00, NOW() - INTERVAL '48 days'),
  ('00000000-0000-0000-0000-000000000000', 'Streaming', 'expense', 'Entretenimento', 45.00, NOW() - INTERVAL '58 days'),
  ('00000000-0000-0000-0000-000000000000', 'Streaming', 'expense', 'Entretenimento', 45.00, NOW() - INTERVAL '28 days'),
  ('00000000-0000-0000-0000-000000000000', 'Roupas', 'expense', 'Compras', 250.00, NOW() - INTERVAL '42 days'),
  ('00000000-0000-0000-0000-000000000000', 'Eletrônicos', 'expense', 'Compras', 800.00, NOW() - INTERVAL '20 days'),
  ('00000000-0000-0000-0000-000000000000', 'Viagem de fim de semana', 'expense', 'Viagem', 600.00, NOW() - INTERVAL '38 days')
ON CONFLICT DO NOTHING;

-- Criar um usuário administrador para acesso ao Supabase Studio
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@exemplo.com', '{"display_name": "Administrador"}', NOW(), NOW(), 'supabase_admin')
ON CONFLICT DO NOTHING;

-- Inserir perfil do administrador
INSERT INTO public.user_profiles (id, email, display_name, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@exemplo.com', 'Administrador', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Adicionar mais algumas transações recentes para demonstração
INSERT INTO public.transactions (user_id, title, type, category, amount, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'Bônus trimestral', 'income', 'Salário', 1500.00, NOW() - INTERVAL '3 days'),
  ('00000000-0000-0000-0000-000000000000', 'Compra online', 'expense', 'Compras', 320.00, NOW() - INTERVAL '2 days'),
  ('00000000-0000-0000-0000-000000000000', 'Assinatura software', 'expense', 'Utilidades', 50.00, NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;