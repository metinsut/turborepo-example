const eslintRules = {
  ...require('config/eslint-react'),
  parserOptions: {
    root: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
};

export default eslintRules;
