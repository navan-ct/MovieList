module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  rules: {
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }]
  }
};
