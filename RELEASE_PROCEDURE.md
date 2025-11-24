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
