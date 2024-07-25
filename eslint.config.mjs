import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        files: [
            "./hooks/**/*",
            "./entities/**/*",
            "./shared/**/*",
            "./app/**/*",
        ],
        ignores: ["./scripts"],
    },
    { languageOptions: { globals: globals.browser }, },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
        },
    },
];
