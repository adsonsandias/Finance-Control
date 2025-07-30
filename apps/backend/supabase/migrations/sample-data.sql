-- Inserir perfil do usuário de teste
INSERT INTO public.user_profiles (id, email, display_name, created_at, updated_at)
VALUES 
  ('{{USER_ID}}', 'usuario@exemplo.com', 'Usuário Teste', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Inserir transações de exemplo
INSERT INTO public.transactions (user_id, title, type, category, amount, created_at)
VALUES
  ('{{USER_ID}}', 'Salário Janeiro', 'income', 'salary', 5000.00, NOW() - INTERVAL '60 days'),
  ('{{USER_ID}}', 'Salário Fevereiro', 'income', 'salary', 5000.00, NOW() - INTERVAL '30 days'),
  ('{{USER_ID}}', 'Salário Março', 'income', 'salary', 5000.00, NOW()),
  ('{{USER_ID}}', 'Freelance Site XYZ', 'income', 'freelance', 1200.00, NOW() - INTERVAL '45 days'),
  ('{{USER_ID}}', 'Dividendos', 'income', 'investment', 350.00, NOW() - INTERVAL '15 days'),
  ('{{USER_ID}}', 'Presente de aniversário', 'income', 'gift', 200.00, NOW() - INTERVAL '20 days'),

  -- Despesas
  ('{{USER_ID}}', 'Supermercado', 'expense', 'food', 650.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Restaurante', 'expense', 'food', 120.00, NOW() - INTERVAL '50 days'),
  ('{{USER_ID}}', 'Supermercado', 'expense', 'food', 580.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Restaurante', 'expense', 'food', 85.00, NOW() - INTERVAL '10 days'),
  ('{{USER_ID}}', 'Combustível', 'expense', 'transport', 200.00, NOW() - INTERVAL '58 days'),
  ('{{USER_ID}}', 'Combustível', 'expense', 'transport', 200.00, NOW() - INTERVAL '28 days'),
  ('{{USER_ID}}', 'Manutenção carro', 'expense', 'transport', 350.00, NOW() - INTERVAL '40 days'),
  ('{{USER_ID}}', 'Aluguel', 'expense', 'housing', 1500.00, NOW() - INTERVAL '60 days'),
  ('{{USER_ID}}', 'Aluguel', 'expense', 'housing', 1500.00, NOW() - INTERVAL '30 days'),
  ('{{USER_ID}}', 'Aluguel', 'expense', 'housing', 1500.00, NOW()),
  ('{{USER_ID}}', 'Conta de luz', 'expense', 'utilities', 150.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Conta de água', 'expense', 'utilities', 80.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Internet', 'expense', 'utilities', 120.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Conta de luz', 'expense', 'utilities', 165.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Conta de água', 'expense', 'utilities', 80.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Internet', 'expense', 'utilities', 120.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Consulta médica', 'expense', 'healthcare', 200.00, NOW() - INTERVAL '35 days'),
  ('{{USER_ID}}', 'Farmácia', 'expense', 'healthcare', 120.00, NOW() - INTERVAL '32 days'),
  ('{{USER_ID}}', 'Curso online', 'expense', 'education', 300.00, NOW() - INTERVAL '45 days'),
  ('{{USER_ID}}', 'Livros', 'expense', 'education', 150.00, NOW() - INTERVAL '15 days'),
  ('{{USER_ID}}', 'Cinema', 'expense', 'entertainment', 60.00, NOW() - INTERVAL '48 days'),
  ('{{USER_ID}}', 'Streaming', 'expense', 'entertainment', 45.00, NOW() - INTERVAL '58 days'),
  ('{{USER_ID}}', 'Streaming', 'expense', 'entertainment', 45.00, NOW() - INTERVAL '28 days'),
  ('{{USER_ID}}', 'Roupas', 'expense', 'shopping', 250.00, NOW() - INTERVAL '42 days'),
  ('{{USER_ID}}', 'Eletrônicos', 'expense', 'shopping', 800.00, NOW() - INTERVAL '20 days'),
  ('{{USER_ID}}', 'Viagem de fim de semana', 'expense', 'travel', 600.00, NOW() - INTERVAL '38 days'),
  ('{{USER_ID}}', 'Bônus trimestral', 'income', 'salary', 1500.00, NOW() - INTERVAL '3 days'),
  ('{{USER_ID}}', 'Compra online', 'expense', 'shopping', 320.00, NOW() - INTERVAL '2 days'),
  ('{{USER_ID}}', 'Assinatura software', 'expense', 'utilities', 50.00, NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;