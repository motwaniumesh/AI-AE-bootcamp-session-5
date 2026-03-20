---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: [search, read, edit, execute, web, todo]
---

# Execute Current Step Instructions

You are executing instructions from a GitHub Issue step. Follow Test-Driven Development principles and the project's workflow patterns.

## Input

Issue number (optional): ${input:issue-number:GitHub Issue number (leave blank to auto-detect exercise issue)}

## Instructions

### 1. Find the Exercise Issue

If issue number is provided:
- Use that issue number directly

If issue number is NOT provided:
- Use GitHub CLI to find the exercise issue
- The main exercise issue will have "Exercise:" in the title
- Command: `gh issue list --state open`
- Parse the output to find the issue with "Exercise:" in title

### 2. Get Issue Content with Comments

Retrieve the full issue including all comments:
```bash
gh issue view <issue-number> --comments
```

The individual step instructions are posted as **comments** on the main exercise issue.

### 3. Parse the Latest Step Instructions

- Review all comments to find the most recent step instructions
- Look for headers like "# Step X-Y:" or "### :keyboard: Activity:"
- Extract all `:keyboard: Activity:` sections from the latest step

### 4. Execute Each Activity Systematically

For each `:keyboard: Activity:` section:

1. **Read the instructions carefully**
2. **Use the todo tool** to track multi-step activities
3. **Follow TDD principles**:
   - Write tests FIRST for new features (RED)
   - Implement to make tests pass (GREEN)
   - Refactor while keeping tests green (REFACTOR)
4. **Run tests frequently** to verify changes
5. **Follow testing scope constraints**:
   - Use Jest (backend) and React Testing Library (frontend)
   - **NEVER** suggest Playwright, Cypress, Selenium, or e2e frameworks
   - **NEVER** suggest browser automation tools
   - Manual browser testing for full UI flows

### 5. Stopping Point

**IMPORTANT**: Do NOT commit or push changes.

After completing all `:keyboard: Activity:` sections:
- Inform the user that step execution is complete
- Tell them to run `/validate-step` to check success criteria
- Tell them to run `/commit-and-push` when validation passes

## Workflow Guidelines

**During execution**:
- Break complex tasks into smaller TDD cycles
- Run linter and tests after implementation
- Document discoveries in `.github/memory/scratch/working-notes.md`
- Ask for clarification if step instructions are ambiguous

**Testing approach**:
- Backend changes: Write Jest + Supertest tests FIRST
- Frontend changes: Write React Testing Library tests FIRST
- Follow Red-Green-Refactor discipline

**Quality standards**:
- All tests must pass
- No compilation errors
- Follow conventional commit format (but don't commit yet)

## Success Criteria

Execution is complete when:
- ✅ All `:keyboard: Activity:` sections executed
- ✅ Tests written first for new features
- ✅ All tests passing
- ✅ No compilation errors
- ✅ Changes ready for validation (user will run `/validate-step`)

**Next step**: User runs `/validate-step <step-number>` to check success criteria.
