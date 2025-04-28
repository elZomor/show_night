/** @type {import('prettier').Config} */
module.exports = {
    semi: true,               // Add semicolons automatically
    singleQuote: true,         // Use single quotes instead of double quotes
    trailingComma: 'all',      // Add trailing commas wherever possible (ES5+)
    printWidth: 100,           // Maximum line width before wrapping
    tabWidth: 2,               // 2 spaces per indentation level
    useTabs: false,            // Use spaces instead of tabs
    bracketSpacing: true,      // Add spaces between brackets: { foo: bar }
    arrowParens: 'always',     // Always include parentheses in arrow functions
    endOfLine: 'auto',         // Maintain whatever the existing EOL is
    jsxSingleQuote: false,     // Use double quotes in JSX
    jsxBracketSameLine: false, // Put the `>` of a multi-line JSX element at the end of the last line
    plugins: ['prettier-plugin-tailwindcss'], // If using Tailwind, auto-sort classes
};
