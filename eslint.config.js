export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
        },

        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-reserved-component-names': 'off',
            'vue/no-v-html': 'off',
            'vue/html-indent': ['warn', 'tab'],

            'vue/html-closing-bracket-spacing': ['error', {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'never',
            }],

            'no-console': ['warn', {
                allow: ['warn', 'error'],
            }],
            'no-debugger': 'off',

            '@stylistic/js/indent': ['warn', 'tab'],
            '@stylistic/js/semi': ['warn', 'never'],
            '@stylistic/js/quotes': ['warn', 'single'],
            '@stylistic/js/no-multi-spaces': ['warn'],
            '@stylistic/js/object-curly-spacing': ['warn', 'always'],

            '@stylistic/js/keyword-spacing': ['warn', {
                after: true,
                before: true,
            }],

            '@stylistic/js/comma-spacing': ['warn', {
                after: true,
                before: false,
            }],

            '@stylistic/js/key-spacing': ['warn', {
                beforeColon: false,
                afterColon: true,
            }],

            '@stylistic/js/arrow-spacing': ['warn', {
                before: true,
                after: true,
            }],

            '@stylistic/js/space-infix-ops': ['warn', {
                int32Hint: false,
            }],
        },
    },
    {
        ignores: ['.github/', 'deploy/', 'dist/', 'node_modules/', 'public/'],
    }
]
