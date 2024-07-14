module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "unused-imports"
    ],
    "rules": {
        "react/prop-types": "off",
        "react/no-unknown-property": "off",
        "unused-imports/no-unused-imports": "warn",
        "no-unused-vars": "warn"
    },
    "settings": {
        "react": {
            "version": "detect" // Automatically detect the version of React.
        }
    }
}
