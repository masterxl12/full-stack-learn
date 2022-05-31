module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      alias: [['@', 'src']],
    },
  },
}
