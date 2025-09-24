module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es2020: true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-require-imports": "error",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        endOfLine: "lf",
        semi: true,
      },
    ],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    indent: ["error", 2],
    eqeqeq: ["error", "always"],
    "no-console": "off",
  },
  ignorePatterns: ["dist/**", "node_modules/**"],
};
