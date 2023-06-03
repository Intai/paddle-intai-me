const { NODE_ENV } = process.env
const isDevelopment =  !NODE_ENV || NODE_ENV === 'development'

module.exports = {
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'plugins': [
    'react',
    'react-hooks',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'globals': {
    'CONFIG': 'readonly',
  },
  'rules': {
    'array-bracket-spacing': 'warn',
    'arrow-spacing': 'warn',
    'block-spacing': 'warn',
    'brace-style': 'warn',
    'comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],
    'comma-spacing': 'warn',
    'computed-property-spacing': 'warn',
    'eol-last': ['warn', 'always'],
    'func-call-spacing': 'warn',
    'indent': ['error', 2],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'linebreak-style': 'warn',
    'multiline-ternary': ['warn', 'always-multiline'],
    'no-console': isDevelopment ? 'off' : 'error',
    'no-constant-condition': isDevelopment ? 'off' : 'error',
    'no-debugger': isDevelopment ? 'off' : 'error',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
    }],
    'object-curly-spacing': ['warn', 'always'],
    'operator-linebreak': ['warn', 'before'],
    'prefer-const': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'sort-imports': ['warn', {
      'ignoreCase': true,
      'ignoreDeclarationSort': true,
    }],
    'space-before-blocks': 'warn',
    'space-before-function-paren': ['warn', {
      'anonymous': 'never',
      'asyncArrow': 'always',
      'named': 'never',
    }],
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',

    'jsx-a11y/media-has-caption': 'off',
    'jsx-quotes': 'warn',
    'react/forbid-component-props': 'off',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/no-multi-comp': ['error', {
      'ignoreStateless': true,
    }],
    'react/prop-types': 'off',
  },
}
