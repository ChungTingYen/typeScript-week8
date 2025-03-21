import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescript from '@typescript-eslint/eslint-plugin';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // 支援 TSX 檔案
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        JSX: true, // 為 TSX 啟用 JSX 全局變數
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } }, // 自動檢測 React 版本
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescript,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...typescript.configs.recommended.rules, // 加入 TypeScript 的推薦規則
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要顯式引入 React
      'react/jsx-key': 'error', // 強制檢查列表的 key
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'space-infix-ops': ['error', { int32Hint: false }],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'object-curly-newline': ['error', { multiline: true, consistent: true }]
    },
  },
];
