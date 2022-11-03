module.exports = {
  root: true,
  extends: [
    'airbnb-typescript-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'import/export': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    semi: [2, 'never'],
    camelcase: 'off',
    'func-names': 'off',
    'max-len': ['error', { code: 120 }],
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-useless-escape': 'off',
    'no-nonoctal-decimal-escape': 'off',
    'no-else-return': 'off',
    'no-return-await': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/function-component-definition': 'off',
    'react/self-closing-comp': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-fragments': [0],
    'react/jsx-no-useless-fragment': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/media-has-caption': [0],
    'default-param-last': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    // allow jsx syntax in js files (for next.js project)
    // eslint-disable-next-line max-len
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // should add ".ts" if typescript project
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false,
        jsxBracketSameLine: false,
        singleQuote: true,
        jsxSingleQuote: false,
        printWidth: 120,
        proseWrap: 'preserve',
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        paths: ['./src'],
      },
    },
  },
}
