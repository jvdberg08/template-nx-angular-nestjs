module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'scope-enum': [2, 'always', ['repo', 'api', 'web-app']],
    'subject-case': [2, 'always', 'lower-case'],
    'body-case': [2, 'always', 'sentence-case'],
  },
  defaultIgnores: false,
};
