import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["coverage/**", "dist/**", "node_modules/**"]
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "error"
    }
  }
];
