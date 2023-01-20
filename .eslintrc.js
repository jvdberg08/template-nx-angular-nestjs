module.exports = {
  root: true,
  plugins: ['@nrwl/nx', 'prettier', 'simple-import-sort', 'unused-imports'],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    ecmaVersion: 9,
  },
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        'linebreak-style': ['error', 'unix'],
        'no-console': 'error',
        'array-callback-return': 'error',
        'dot-notation': 'off',
        'simple-import-sort/imports': 'error',
        'unused-imports/no-unused-imports': 'error',
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
            enforceBuildableLibDependency: true,
          },
        ],
      },
    },
    {
      files: ['*.ts'],
      extends: ['plugin:@nrwl/nx/typescript'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};
