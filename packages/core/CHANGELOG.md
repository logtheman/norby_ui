# @logan/ui

## 0.1.1

### Patch Changes

- Fix component test failures and improve code quality
  - Fixed Checkbox: Group disabled state now properly propagates to child checkboxes
  - Fixed Tabs: Default to first tab when no defaultSelectedKey is provided
  - Fixed Tooltip: Improved event handler compatibility with both React synthetic events and native DOM events
  - Added automatic trailing whitespace removal on save and commit
  - Added comprehensive pre-push validation (tests, type-check, lint)
