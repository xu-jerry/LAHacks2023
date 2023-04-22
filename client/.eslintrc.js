module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'linebreak-style': 'off', // disable LF vs. CRLF because GitHub automatically converts to CRLF
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // we don't care that .js files contain JSX code
    'react/jsx-props-no-spreading': 'off', // HOCs should have prop spreading
    'react-hooks/rules-of-hooks': 'error', // part of react hooks
    'react-hooks/exhaustive-deps': 'warn', // part of react hooks
    'max-len': 'off', // disables line length check
    'no-console': 'off', // disables no console statements
  },
};
