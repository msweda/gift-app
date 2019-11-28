module.exports =  {
  extends:  [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  plugins: ["filenames", "prettier", "react"],
  rules:  {
    // Use camelCase.js as the default format.
    // The third "true" argument ignores this rule for files with default exports.
    "filenames/match-regex": [2, null, true],
    // If there is a default export, the filename must match it.
    "filenames/match-exported": 2,
    // Enforce .jsx filename convention.
    "react/jsx-filename-extension": [2, { "extensions": [".jsx"] }],
    "react/prop-types": [2],
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
