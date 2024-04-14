module.exports = {
  plugins: ['prettier'],
  extends: ['next/core-web-vitals', 'prettier', 'plugin:import/recommended', 'plugin:import/typescript'],
  ignorePatterns: ['node_modules', 'build', 'dist', 'coverage', 'public', '.*rc.cjs', '*.config.js'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', require('../../prettier.config')],
    'import/no-anonymous-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-empty-named-blocks': 'error',
    'import/no-unused-modules': 'error',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        distinctGroup: false,
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@ease-trip/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
  },
  settings: {
    'import/order': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: true,
      node: true,
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [
          ['@tests', './tests'],
          ['@', './src'],
        ],
      },
    },
  },
};
