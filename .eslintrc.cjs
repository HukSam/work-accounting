/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
    ],
    env: {
        "vue/setup-compiler-macros": true
    },
    rules: {
        "strict": 0,
        "vue/no-v-html": ["off"],
        "vue/no-template-shadow": ["off"],
        "vue/html-indent": ["error", 2],
        "vue/padding-line-between-blocks": ["error", "always"],
        "vue/component-definition-name-casing": ["error", "kebab-case"],
        "vue/html-self-closing": [
            "error", {
                html: {
                    normal: "never",
                    void: "always"
                }
            }
        ],
        "semi": ["error", "never"],
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "object-curly-spacing": ["warn", "always"],
        "keyword-spacing": "warn"
    }
};
