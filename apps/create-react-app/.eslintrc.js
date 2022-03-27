module.exports = {
  ...require('config/eslint-react'),
  parserOptions: {
    root: true,
    project: ['./tsconfig.lint.json'],
    tsconfigRootDir: __dirname
  }
};
