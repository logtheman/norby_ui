# Error Reporting for AI Assistance

This document explains how to share GitHub Actions errors with AI assistants (like Cursor's Composer) for automatic fixes.

## Quick Method: Copy-Paste

1. **When tests fail in GitHub Actions:**
   - Go to the failed workflow run
   - Click on the "test" job
   - Copy the error output from the "Run tests" step
   - Paste it into Cursor with: "Fix these test failures: [paste error]"

2. **Download Artifacts:**
   - In the workflow run, download the `test-results-*` artifact
   - Extract and share `test-output.txt` or `test-failures.txt` with the AI

## Automated Method: GitHub Actions Integration

The workflow automatically:
- ✅ Captures all test failures in `test-failures.txt`
- ✅ Creates a summary in the workflow summary
- ✅ Uploads artifacts with full test output
- ✅ Comments on PRs with error details (for PRs)

## Using the Error Output

When sharing errors with AI:

1. **Include context:**
   ```
   Fix these test failures from GitHub Actions:
   [paste error output]
   ```

2. **Or reference the artifact:**
   ```
   The test failures are in the GitHub Actions artifact test-results-12345.
   Fix all failing tests.
   ```

3. **For specific test files:**
   ```
   Fix the failing tests in Tooltip.test.tsx:
   [paste specific error]
   ```

## Workflow Features

- **Test Summary**: Automatically generated in workflow summary
- **Artifacts**: Full test output saved for 30 days
- **PR Comments**: Automatic comments on PRs with failures
- **Structured Output**: JSON summary for programmatic access

## Manual Testing Locally

Before pushing, run locally:
```bash
pnpm test              # Run all tests
pnpm test --reporter=verbose  # Detailed output
pnpm check:staged      # Check only staged files
```

