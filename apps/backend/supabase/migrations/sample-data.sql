-- Inserir perfil do usuário de teste
INSERT INTO public.user_profiles (id, email, display_name, created_at, updated_at)
VALUES 
  ('{{USER_ID}}', 'usuario@exemplo.com', 'Usuário Teste', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Inserir transações de exemplo
INSERT INTO public.transactions (user_id, title, type, category, amount, created_at)
VALUES
  ('{{USER_ID}}', 'Salário Janeiro', 'income', 'Salário', 5000.00, NOW() - INTERVAL '60 days'),
  ('{{USER_ID}}', 'Salário Fevereiro', 'income', 'Salário', 5000.00, NOW() - INTERVAL '30 days'),
  ('{{USER_ID}}', 'Salário Março', 'income', 'Salário', 5000.00, NOW()),
  ('{{USER_ID}}', 'Freelance Site XYZ', 'income', 'Freelance', 1200.00, NOW() - INTERVAL '45 days'),
  ('{{USER_ID}}', 'Dividendos', 'income', 'Investimento', 350.00, NOW() - INTERVAL '15 days'),
  ('{{USER_ID}}', 'Presente de aniversário', 'income', 'Presente', 200.00, NOW() - INTERVAL '20 days'),

  -- Despesas
  ('{{USER_ID}}', 'Supermercado', 'expense', 'Alimentação', 650.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Restaurante', 'expense', 'Alimentação', 120.00, NOW() - INTERVAL '50 days'),
  ('{{USER_ID}}', 'Supermercado', 'expense', 'Alimentação', 580.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Restaurante', 'expense', 'Alimentação', 85.00, NOW() - INTERVAL '10 days'),
  ('{{USER_ID}}', 'Combustível', 'expense', 'Transporte', 200.00, NOW() - INTERVAL '58 days'),
  ('{{USER_ID}}', 'Combustível', 'expense', 'Transporte', 200.00, NOW() - INTERVAL '28 days'),
  ('{{USER_ID}}', 'Manutenção carro', 'expense', 'Transporte', 350.00, NOW() - INTERVAL '40 days'),
  ('{{USER_ID}}', 'Aluguel', 'expense', 'Moradia', 1500.00, NOW() - INTERVAL '60 days'),
  ('{{USER_ID}}', 'Aluguel', 'expense', 'Moradia', 1500.00, NOW() - INTERVAL '30 days'),
  ('{{USER_ID}}', 'Aluguel', 'expense', 'Moradia', 1500.00, NOW()),
  ('{{USER_ID}}', 'Conta de luz', 'expense', 'Utilidades', 150.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Conta de água', 'expense', 'Utilidades', 80.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Internet', 'expense', 'Utilidades', 120.00, NOW() - INTERVAL '55 days'),
  ('{{USER_ID}}', 'Conta de luz', 'expense', 'Utilidades', 165.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Conta de água', 'expense', 'Utilidades', 80.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Internet', 'expense', 'Utilidades', 120.00, NOW() - INTERVAL '25 days'),
  ('{{USER_ID}}', 'Consulta médica', 'expense', 'Saúde', 200.00, NOW() - INTERVAL '35 days'),
  ('{{USER_ID}}', 'Farmácia', 'expense', 'Saúde', 120.00, NOW() - INTERVAL '32 days'),
  ('{{USER_ID}}', 'Curso online', 'expense', 'Educação', 300.00, NOW() - INTERVAL '45 days'),
  ('{{USER_ID}}', 'Livros', 'expense', 'Educação', 150.00, NOW() - INTERVAL '15 days'),
  ('{{USER_ID}}', 'Cinema', 'expense', 'Entretenimento', 60.00, NOW() - INTERVAL '48 days'),
  ('{{USER_ID}}', 'Streaming', 'expense', 'Entretenimento', 45.00, NOW() - INTERVAL '58 days'),
  ('{{USER_ID}}', 'Streaming', 'expense', 'Entretenimento', 45.00, NOW() - INTERVAL '28 days'),
  ('{{USER_ID}}', 'Roupas', 'expense', 'Compras', 250.00, NOW() - INTERVAL '42 days'),
  ('{{USER_ID}}', 'Eletrônicos', 'expense', 'Compras', 800.00, NOW() - INTERVAL '20 days'),
  ('{{USER_ID}}', 'Viagem de fim de semana', 'expense', 'Viagem', 600.00, NOW() - INTERVAL '38 days'),
  ('{{USER_ID}}', 'Bônus trimestral', 'income', 'Salário', 1500.00, NOW() - INTERVAL '3 days'),
  ('{{USER_ID}}', 'Compra online', 'expense', 'Compras', 320.00, NOW() - INTERVAL '2 days'),
  ('{{USER_ID}}', 'Assinatura software', 'expense', 'Utilidades', 50.00, NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;
