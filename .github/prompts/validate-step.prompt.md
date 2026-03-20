---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: [search, read, execute, web, todo]
---

# Validate Step Success Criteria

Systematically validate that all success criteria for a GitHub Issue step are met.

## Input

**REQUIRED** - Step number: ${input:step-number:Step number to validate (e.g., 5-0, 5-1, 5-2)}

## Instructions

### 1. Validate Step Number

If step number is not provided:
- **STOP** and ask the user for the step number
- Format examples: "5-0", "5-1", "5-2", "5-3"

### 2. Find the Main Exercise Issue

Use GitHub CLI to find the exercise issue (has "Exercise:" in title):
```bash
gh issue list --state open
```

Parse the output to find the issue number with "Exercise:" in the title.

### 3. Get Issue Content with Comments

Retrieve the full issue including all comments:
```bash
gh issue view <issue-number> --comments
```

The individual step instructions are posted as **comments** on the main exercise issue.

### 4. Locate the Specified Step

Search through the issue comments to find the step that matches the provided step number:
- Look for heading: `# Step <step-number>:` (e.g., "# Step 5-0:")
- Extract the entire step content from that comment

### 5. Extract Success Criteria

Within the step content, find the **Success Criteria** section:
- Look for markdown heading "## Success Criteria" or "### Success Criteria"
- Or look for text containing "success criteria" or "validation checks"
- Extract all criteria listed (usually bullet points with checkboxes)

### 6. Check Each Criterion

For each success criterion:

1. **Understand what's being checked**:
   - File existence
   - Test passing
   - Lint errors resolved
   - Specific functionality working
   - Code quality standards met

2. **Verify against workspace state**:
   - Read relevant files
   - Run tests if criterion mentions tests
   - Run linter if criterion mentions linting
   - Check git status if criterion mentions commits
   - Execute commands to verify functionality

3. **Record status**:
   - ✅ Complete - criterion fully met
   - ⚠️ Partial - criterion partially met, provide specifics
   - ❌ Incomplete - criterion not met, provide guidance

### 7. Report Validation Results

Provide a structured report:

```markdown
## Step <step-number> Validation Results

### Success Criteria Status

1. ✅ [Criterion 1 description]
   - Status: Complete
   - Evidence: [What confirms this]

2. ⚠️ [Criterion 2 description]
   - Status: Partial
   - Issue: [What's missing]
   - Action: [What to do]

3. ❌ [Criterion 3 description]
   - Status: Incomplete
   - Issue: [What's wrong]
   - Action: [Specific steps to complete]

### Overall Status

**X of Y criteria met**

[If all complete]: ✅ All success criteria met! Ready to commit and push.
[If incomplete]: ⚠️ Some criteria need attention. See actions above.
```

### 8. Provide Specific Guidance

For any incomplete criteria:
- Explain exactly what's missing
- Provide specific commands to run
- Reference relevant files or code sections
- Guide toward completion without implementing (that's execute-step's job)

## Validation Approach

**Use systematic checks**:
- **File tests**: Use `ls` or file search to verify files exist
- **Test validation**: Run `npm test` to verify tests pass
- **Lint validation**: Run `npm run lint` to check for errors
- **Code review**: Read files to verify implementations
- **Git checks**: Use `git status` or `git log` to verify commits/branches

**Be thorough but efficient**:
- Run tests once and check all test-related criteria
- Run linter once and check all lint-related criteria
- Read files strategically to verify multiple criteria

## Success Criteria

Validation is complete when:
- ✅ Step found in GitHub Issue comments
- ✅ Success Criteria section extracted
- ✅ Every criterion checked against workspace
- ✅ Clear status report provided
- ✅ Specific guidance given for incomplete items

## Example Output

```
## Step 5-1 Validation Results

### Success Criteria Status

1. ✅ Tests written for POST /api/todos endpoint
   - Status: Complete
   - Evidence: Found tests in packages/backend/__tests__/app.test.js
   - Test coverage: 201 response, validation, edge cases

2. ✅ All tests passing
   - Status: Complete
   - Evidence: Ran `npm test` - 12 tests passed, 0 failed

3. ❌ No ESLint errors
   - Status: Incomplete
   - Issue: 3 ESLint errors in packages/backend/src/app.js
     - no-console: console.log on line 45
     - no-unused-vars: handleSubmit on line 12
     - no-console: console.error on line 67
   - Action: Run `@code-reviewer fix ESLint errors in backend/src/app.js`

4. ✅ Endpoint returns 400 for invalid input
   - Status: Complete
   - Evidence: Test cases verify validation and return 400 status

### Overall Status

**3 of 4 criteria met**

⚠️ Fix the ESLint errors, then you'll be ready to commit and push.

**Next step**: 
1. Fix linting errors with `@code-reviewer`
2. Run `/validate-step 5-1` again
3. If all pass, run `/commit-and-push feature/add-post-endpoint`
```

## Notes

**This prompt only VALIDATES, it does NOT fix**:
- Report what's incomplete
- Provide guidance on how to fix
- Suggest which agent to use (@tdd-developer, @code-reviewer)
- Let the user or other prompts handle the actual fixes

**Switching to code-reviewer agent**:
- This prompt specifies `agent: code-reviewer` in frontmatter
- Code review focus aligns with validation and quality checking
- Does NOT implement features - only assesses current state
