{
  "extends": ["prettier"],
  "plugins": ["eslint-plugin-import-helpers", "prettier"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": ["module", "/^@shared/", ["parent", "sibling", "index"], "/\\.scss$|\\.css$/"],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.js", "*.jsx"],
      "rules": {
        "prettier/prettier": ["error", { "singleQuote": true, "semi": false }],
        "indent": "off"
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
      },
      "rules": {
        "@typescript-eslint/no-unused-vars": "warn",
        "prettier/prettier": ["error", { "singleQuote": true, "semi": false }]
      }
    }
  ]
}
