export declare const TRANSACTION_TYPES: {
    INCOME: "income";
    EXPENSE: "expense";
};
export declare const TRANSACTION_CATEGORIES: {
    SALARY: string;
    FREELANCE: string;
    INVESTMENT: string;
    GIFT: string;
    OTHER_INCOME: string;
    FOOD: string;
    TRANSPORT: string;
    HOUSING: string;
    UTILITIES: string;
    HEALTHCARE: string;
    EDUCATION: string;
    ENTERTAINMENT: string;
    SHOPPING: string;
    TRAVEL: string;
    OTHER_EXPENSE: string;
};
export declare const CATEGORY_LABELS: {
    [x: string]: string;
};
export declare const TYPE_LABELS: {
    income: string;
    expense: string;
};
export declare const API_ENDPOINTS: {
    AUTH: {
        SIGNUP: string;
        SIGNIN: string;
        SIGNOUT: string;
        ME: string;
        REFRESH: string;
    };
    TRANSACTIONS: {
        BASE: string;
        STATS: string;
    };
};
export declare const STORAGE_KEYS: {
    AUTH_TOKEN: string;
    USER_PREFERENCES: string;
};
export declare const PAGINATION: {
    DEFAULT_PAGE: number;
    DEFAULT_LIMIT: number;
    MAX_LIMIT: number;
};
