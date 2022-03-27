const eslintRules = {
  ...require('config/eslint-react'),
  parserOptions: {
    root: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};

export default eslintRules;
