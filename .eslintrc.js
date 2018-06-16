module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/airbnb'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'import/prefer-default-export': ['off'],
        'arrow-parens': ['error', 'as-needed'],
        'space-before-function-paren': ['error', 'never'],
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state'
            ]
        }],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
