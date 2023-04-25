module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['import'],
  rules: {
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern:
              '{@(@components|@constants|@context|@database|@helpers|@hooks|@init|@lib|@managers|@queries|@screens|@typings|@test|@utils)/**}',
            group: 'external',
            position: 'after'
          },
          {
            pattern: 'app/**',
            group: 'parent',
            position: 'before'
          }
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        pathGroupsExcludedImportTypes: ['type']
      }
    ]
  }
}
