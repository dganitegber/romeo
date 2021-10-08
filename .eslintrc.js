module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        // "@vue/prettier",
        // "@vue/prettier/@typescript-eslint",
    ],
    parserOptions: {
        parserOptions: {
            parser: "babel-eslint",
        },
        // ecmaVersion: 2020,
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
};
