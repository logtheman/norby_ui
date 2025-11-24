# Release Procedure & CI/CD Troubleshooting Guide

## What Went Wrong (v0.1.3 Release)

### Issue 1: Uncommitted Changes After `changeset version`

**Problem:** The CI workflow ran `changeset version` which updates `package.json` and `CHANGELOG.md` files, but these changes were not committed before attempting to publish.

**Error:** `ERR_PNPM_GIT_UNCLEAN Unclean working tree. Commit or stash changes first.`

**Solution:** Added a commit step in `.github/workflows/release.yml` that automatically commits version changes before publishing.

### Issue 2: Incorrect Publish Command

**Problem:** The workflow used `pnpm -w publish --access public` which is incorrect syntax and doesn't work with changesets.

**Error:** `npm error code EUSAGE` - missing package-spec argument

**Solution:** Changed to `pnpm changeset publish` which correctly handles publishing packages versioned by changesets and respects the `"access": "public"` setting in `.changeset/config.json`.

### Issue 3: NPM Authentication Not Configured

**Problem:** The `changeset publish` command failed with `ENEEDAUTH` error because npm authentication wasn't properly configured for changesets.

**Error:** `ENEEDAUTH This command requires you to be logged in to https://registry.npmjs.org/`

**Solution:** Added explicit npm authentication configuration step that creates `~/.npmrc` with the NPM_TOKEN. The `setup-node` action's `registry-url` alone isn't sufficient for changesets - they need the token in `.npmrc` format.

### Issue 4: NPM Publish Permission Error (404)

**Problem:** Publishing fails with `E404 Not Found` error even though the package exists. This typically indicates the NPM_TOKEN doesn't have write/publish permissions for the `@logtheman` scope.

**Error:** `E404 Not Found - PUT https://registry.npmjs.org/@logtheman%2fui - '@logtheman/ui@0.1.4' is not in this registry.`

**Note:** If the package already exists on npm (e.g., version 0.1.2 is published), the scope exists. The 404 error means the token lacks publish permissions.

**Solution:**

1. **Verify Token Scope:**
   - The token must be scoped to the `@logtheman` organization
   - "Publish" type tokens should work, but verify they're associated with the correct organization
   - Check that your npm account is a member of the `@logtheman` organization

2. **Generate a New Token (if needed):**
   - Go to https://www.npmjs.com/settings/[username]/tokens
   - Click "Generate New Token"
   - Select "Automation" or "Publish" type
   - **Important:** Ensure the token is scoped to `@logtheman` organization
   - Set expiration to "Never" for CI/CD use
   - Copy the token immediately (you won't see it again)

3. **Update GitHub Secret:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Update the `NPM_TOKEN` secret with the new token
   - Ensure the token value is correct (no extra spaces or newlines)

4. **Verify Organization Access:**
   - Ensure your npm account is a member of the `@logtheman` organization
   - Verify you have "publish" permissions for that organization
   - Check organization settings at https://www.npmjs.com/org/logtheman/settings/members

5. **Test Token Locally (optional):**
   ```bash
   echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN" > ~/.npmrc
   npm whoami --registry=https://registry.npmjs.org
   # Should show your npm username
   ```

## Pre-Push Checklist

Before pushing to main, ensure:

1. ✅ **All tests pass** - `pnpm test`
2. ✅ **Type checking passes** - `pnpm type-check`
3. ✅ **Linting passes** - `pnpm lint` (0 errors, 0 warnings)
4. ✅ **Code formatting is correct** - `pnpm format:check`
5. ✅ **Build succeeds** - `pnpm build`
6. ✅ **No uncommitted changes** - `git status` should be clean

## Pre-Push Hook

The `.husky/pre-push` hook automatically runs:

- Format check
- Tests
- Type check
- Lint check

**If any check fails, the push will be blocked.** Fix the issues before pushing.

## CI/CD Workflow Steps

The `.github/workflows/release.yml` workflow:

1. **Checkout code**
2. **Install dependencies** - `pnpm install --frozen-lockfile`
3. **Build** - `pnpm build`
4. **Run tests** - `pnpm test` (fails workflow if tests fail)
5. **Version packages** - `pnpm -w changeset version` (updates package.json/CHANGELOG)
6. **Commit version changes** - Automatically commits and pushes version updates
7. **Publish** - `pnpm changeset publish` (publishes to npm)

## Manual Release Process

If you need to release manually:

```bash
# 1. Ensure all checks pass locally
pnpm type-check
pnpm lint
pnpm test
pnpm build

# 2. Create a changeset (if needed)
pnpm changeset

# 3. Version packages
pnpm -w changeset version

# 4. Commit version changes
git add -A
git commit -m "chore: version packages"
git push

# 5. Publish (requires NPM_TOKEN)
NODE_AUTH_TOKEN=$NPM_TOKEN pnpm changeset publish
```

## Common Issues & Solutions

### Issue: Pre-push hook fails

**Solution:** Fix the failing check locally before pushing. The hook will show which check failed.

### Issue: CI fails on "Unclean working tree"

**Solution:** Ensure the workflow includes a commit step after `changeset version` (already fixed).

### Issue: CI fails on publish with EUSAGE error

**Solution:** Use `pnpm changeset publish` instead of `pnpm publish` (already fixed).

### Issue: CI fails on publish with ENEEDAUTH error

**Solution:** Ensure npm authentication is configured via `~/.npmrc` file with the NPM_TOKEN (already fixed in workflow).

### Issue: CI fails on publish with E404 Not Found error

**Solution:**

- **If package already exists:** The token lacks publish permissions. Generate a new Automation or Granular Access Token with write/publish permissions for `@logtheman` scope
- **If package doesn't exist:** Create the npm organization/scope on npmjs.com first, then ensure token has publish permissions
- Verify the token is associated with an account that has access to the `@logtheman` organization
- Check token type: Use "Automation" or "Granular Access Token" (classic tokens are being deprecated)
- Update GitHub secret `NPM_TOKEN` with the correct token

### Issue: Tests pass locally but fail in CI

**Solution:**

- Ensure lockfile is committed (`pnpm-lock.yaml`)
- Check Node.js version matches (CI uses Node 20)
- Run `pnpm install --frozen-lockfile` locally to match CI

## Best Practices

1. **Always run checks before pushing:**

   ```bash
   pnpm check && pnpm test
   ```

2. **Keep lockfile up to date:**

   ```bash
   pnpm install
   git add pnpm-lock.yaml
   ```

3. **Create changesets for significant changes:**

   ```bash
   pnpm changeset
   ```

4. **Test locally before pushing to main:**
   - All checks should pass
   - Build should succeed
   - No uncommitted changes

5. **Monitor CI/CD workflow:**
   - Check GitHub Actions after pushing
   - Review test results and publish status
   - Verify package appears on npm

## Version Bumping

Version bumps are handled automatically by changesets:

- **Patch** (0.1.2 → 0.1.3): Bug fixes, small changes
- **Minor** (0.1.3 → 0.2.0): New features, backward compatible
- **Major** (0.1.3 → 1.0.0): Breaking changes

The version in `packages/core/package.json` is updated by `changeset version` during the release process.
