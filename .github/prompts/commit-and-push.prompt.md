---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: [read, execute, todo]
---

# Commit and Push Changes

Analyze workspace changes, generate a conventional commit message, and push to a feature branch.

## Input

**REQUIRED** - Branch name: ${input:branch-name:Feature branch name (e.g., feature/add-validation)}

## Instructions

### 1. Validate Branch Name

If branch name is not provided:
- **STOP** and ask the user to provide a branch name
- Suggest format: `feature/<descriptive-name>` or `fix/<descriptive-name>`
- Example: `feature/add-todo-validation` or `fix/delete-endpoint`

### 2. Analyze Changes

Use git diff to understand what changed:
```bash
git status
git diff
```

Review the changes to understand:
- Which files were modified
- What functionality was added/changed
- The scope of the changes

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following **Conventional Commits** format:

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without changing behavior
- `style:` - Code style/formatting changes

**Examples**:
```
feat: add delete button to todo items
fix: correct validation for empty todo titles
test: add integration tests for todo API endpoints
refactor: extract validation logic into separate function
```

**Guidelines**:
- Keep description concise and clear (50-70 characters)
- Use imperative mood ("add" not "added")
- Don't capitalize first letter after colon
- No period at the end

### 4. Create or Switch to Branch

Check if the branch exists:
```bash
git branch --list <branch-name>
```

If branch does NOT exist:
```bash
git checkout -b <branch-name>
```

If branch exists:
```bash
git checkout <branch-name>
```

### 5. Stage All Changes

Stage all modified, new, and deleted files:
```bash
git add .
```

Verify staged changes:
```bash
git status
```

### 6. Commit with Generated Message

Commit using the conventional commit message:
```bash
git commit -m "<generated-message>"
```

### 7. Push to Feature Branch

Push to the specified branch:
```bash
git push origin <branch-name>
```

**CRITICAL**: Only push to the user-provided branch name. Never push to `main` or any other branch.

### 8. Confirm Success

After successful push, inform the user:
- Branch name pushed to
- Commit message used
- Number of files changed
- Next steps (e.g., create PR, continue work)

## Safety Checks

**DO NOT**:
- Commit to `main` branch
- Push to any branch other than the user-provided branch name
- Proceed without a branch name
- Commit if there are no changes staged

**DO**:
- Always ask for branch name if not provided
- Verify branch before pushing
- Use conventional commit format
- Stage all changes before committing

## Success Criteria

Commit and push is successful when:
- ✅ Branch created or switched to correctly
- ✅ All changes staged with `git add .`
- ✅ Commit created with conventional format
- ✅ Changes pushed to specified feature branch
- ✅ User informed of success and next steps

## Example Output

```
## Commit and Push Summary

**Branch**: feature/add-validation
**Commit Message**: `feat: add validation for todo title field`
**Files Changed**: 3 files
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js
- .github/memory/scratch/working-notes.md

✅ Successfully pushed to origin/feature/add-validation

**Next Steps**:
- Continue development on this branch
- Run more tests if needed
- Create a pull request when ready
```
