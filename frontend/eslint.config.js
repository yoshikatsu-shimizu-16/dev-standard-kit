import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import jsdoc from 'eslint-plugin-jsdoc'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: ['dist', 'coverage', 'playwright-report', 'test-results'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
    plugins: {
      jsdoc,
      'react-refresh': reactRefresh,
    },
    rules: {
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/no-types': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSEnumDeclaration',
          ],
          enableFixer: false,
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: false,
          },
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: [
      'src/components/ui/**/*.{ts,tsx}',
      '**/*.{test,spec}.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      'e2e/**/*.{ts,tsx}',
    ],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
])
