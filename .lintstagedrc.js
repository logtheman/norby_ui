module.exports = {
  // TypeScript and TSX files - lint and type-check
  'packages/core/**/*.{ts,tsx}': [
    // ESLint with auto-fix and readable output (run from package directory)
    (filenames) => `cd packages/core && eslint --fix --format=stylish ${filenames.map(f => f.replace('packages/core/', '')).join(' ')}`,
    // Type check all files (needed for proper type checking)
    'bash -c "pnpm --filter @logan/ui exec tsc --noEmit"'
  ]
};

