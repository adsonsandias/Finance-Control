var _a, _b;
export var TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense',
};
export var TRANSACTION_CATEGORIES = {
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
};
export var CATEGORY_LABELS = (_a = {},
    // Receitas
    _a[TRANSACTION_CATEGORIES.SALARY] = 'Salário',
    _a[TRANSACTION_CATEGORIES.FREELANCE] = 'Freelance',
    _a[TRANSACTION_CATEGORIES.INVESTMENT] = 'Investimento',
    _a[TRANSACTION_CATEGORIES.GIFT] = 'Presente',
    _a[TRANSACTION_CATEGORIES.OTHER_INCOME] = 'Outras Receitas',
    // Despesas
    _a[TRANSACTION_CATEGORIES.FOOD] = 'Alimentação',
    _a[TRANSACTION_CATEGORIES.TRANSPORT] = 'Transporte',
    _a[TRANSACTION_CATEGORIES.HOUSING] = 'Moradia',
    _a[TRANSACTION_CATEGORIES.UTILITIES] = 'Utilidades',
    _a[TRANSACTION_CATEGORIES.HEALTHCARE] = 'Saúde',
    _a[TRANSACTION_CATEGORIES.EDUCATION] = 'Educação',
    _a[TRANSACTION_CATEGORIES.ENTERTAINMENT] = 'Entretenimento',
    _a[TRANSACTION_CATEGORIES.SHOPPING] = 'Compras',
    _a[TRANSACTION_CATEGORIES.TRAVEL] = 'Viagem',
    _a[TRANSACTION_CATEGORIES.OTHER_EXPENSE] = 'Outras Despesas',
    _a);
export var TYPE_LABELS = (_b = {},
    _b[TRANSACTION_TYPES.INCOME] = 'Receita',
    _b[TRANSACTION_TYPES.EXPENSE] = 'Despesa',
    _b);
export var API_ENDPOINTS = {
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
};
export var STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
};
export var PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
};
