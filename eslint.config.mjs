import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import pluginQuery from '@tanstack/eslint-plugin-query';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: [
    js.configs.recommended,
    ts.configs.recommended,
    ts.configs.stylistic,
    prettier
  ]
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@tanstack/query': pluginQuery
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];

export default eslintConfig;
