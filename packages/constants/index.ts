export const TRANSACTION_TYPES = {
  INCOME: 'income' as const,
  EXPENSE: 'expense' as const,
}

export const TRANSACTION_CATEGORIES = {
  // Receitas
  SALARY: 'salary',
  FREELANCE: 'freelance',
  INVESTMENT: 'investment',
  GIFT: 'gift',
  OTHER_INCOME: 'other_income',

  // Despesas
  FOOD: 'food',
  TRANSPORT: 'transport',
  HOUSING: 'housing',
  UTILITIES: 'utilities',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  ENTERTAINMENT: 'entertainment',
  SHOPPING: 'shopping',
  TRAVEL: 'travel',
  OTHER_EXPENSE: 'other_expense',
}

export const CATEGORY_LABELS = {
  // Receitas
  [TRANSACTION_CATEGORIES.SALARY]: 'Salário',
  [TRANSACTION_CATEGORIES.FREELANCE]: 'Freelance',
  [TRANSACTION_CATEGORIES.INVESTMENT]: 'Investimento',
  [TRANSACTION_CATEGORIES.GIFT]: 'Presente',
  [TRANSACTION_CATEGORIES.OTHER_INCOME]: 'Outras Receitas',

  // Despesas
  [TRANSACTION_CATEGORIES.FOOD]: 'Alimentação',
  [TRANSACTION_CATEGORIES.TRANSPORT]: 'Transporte',
  [TRANSACTION_CATEGORIES.HOUSING]: 'Moradia',
  [TRANSACTION_CATEGORIES.UTILITIES]: 'Utilidades',
  [TRANSACTION_CATEGORIES.HEALTHCARE]: 'Saúde',
  [TRANSACTION_CATEGORIES.EDUCATION]: 'Educação',
  [TRANSACTION_CATEGORIES.ENTERTAINMENT]: 'Entretenimento',
  [TRANSACTION_CATEGORIES.SHOPPING]: 'Compras',
  [TRANSACTION_CATEGORIES.TRAVEL]: 'Viagem',
  [TRANSACTION_CATEGORIES.OTHER_EXPENSE]: 'Outras Despesas',
}

export const TYPE_LABELS = {
  [TRANSACTION_TYPES.INCOME]: 'Receita',
  [TRANSACTION_TYPES.EXPENSE]: 'Despesa',
}

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    SIGNOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  TRANSACTIONS: {
    BASE: '/transactions',
    STATS: '/transactions/stats',
  },
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
}
