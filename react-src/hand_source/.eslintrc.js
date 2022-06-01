module.exports = {
  extends: ['@core/eslint-config-hlj-react'],
  settings: {
    'import/resolver': {
      alias: [['@', 'src']],
    },
  },
}
