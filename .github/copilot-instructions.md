---
description: "Development guidelines and context for the TODO application project"
---

# TODO Application - Development Guidelines

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React-based UI for task management
- **Backend**: Express REST API with in-memory storage
- **Development Philosophy**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Familiarize yourself with these key documentation files to understand project structure and standards:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and testing standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - Write failing tests first (RED)
   - Implement minimal code to pass (GREEN)
   - Refactor for quality (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - Each change should be independently verifiable
   - Avoid large, sweeping changes that are hard to debug

3. **Systematic Debugging**: Use test failures as guides
   - Let test output direct your investigation
   - Fix root causes, not symptoms

4. **Validation Before Commit**: Ensure code quality
   - All tests must pass
   - No lint errors or warnings
   - Code review standards met

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Testing Stack
- **Backend**: Jest + Supertest for API endpoint testing
- **Frontend**: React Testing Library for component unit/integration tests
- **UI Verification**: Manual browser testing for full user flows

### Important Testing Constraints
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit and integration testing without e2e complexity

### Testing Approach by Context

**Backend API Changes:**
1. Write Jest tests FIRST that define expected behavior
2. Run tests and confirm they fail (RED)
3. Implement the feature to pass tests (GREEN)
4. Refactor for code quality (REFACTOR)

**Frontend Component Features:**
1. Write React Testing Library tests FIRST for component behavior
2. Run tests and confirm they fail (RED)
3. Implement the component feature (GREEN)
4. Refactor for code quality (REFACTOR)
5. Follow up with manual browser testing for full UI flows

**This is true TDD**: Always write the test first, then write code to make it pass.

## Workflow Patterns

### 1. TDD Workflow (Red-Green-Refactor)
1. **RED**: Write or fix a failing test
2. **RUN**: Execute test suite to confirm failure
3. **GREEN**: Implement minimal code to pass the test
4. **VERIFY**: Run tests again to confirm they pass
5. **REFACTOR**: Improve code quality while keeping tests green

### 2. Code Quality Workflow
1. **Run Lint**: Execute linting tools to identify issues
2. **Categorize**: Group issues by type (syntax, style, best practices)
3. **Fix Systematically**: Address issues in logical order
4. **Re-validate**: Run lint again to ensure all issues resolved

### 3. Integration Workflow
1. **Identify Issue**: Understand the problem or feature requirement
2. **Debug**: Use systematic debugging to find root cause
3. **Test**: Write tests that capture the expected behavior
4. **Fix**: Implement the solution
5. **Verify End-to-End**: Confirm the complete flow works

## Agent Usage

Use specialized agents for specific types of work:

- **`tdd-developer`**: For all test-related work and Red-Green-Refactor cycles
  - Writing new tests
  - Fixing failing tests
  - Implementing features following TDD principles
  
- **`code-reviewer`**: For addressing lint errors and code quality improvements
  - Analyzing and fixing lint issues
  - Code style improvements
  - Best practices implementation

## Memory System

This project uses a two-tier memory system to capture development knowledge:

### Persistent Memory
**Location**: This file (.github/copilot-instructions.md)  
**Purpose**: Foundational principles, workflows, and permanent project standards  
**Content**: Testing philosophy, TDD workflows, commit conventions, agent usage

### Working Memory
**Location**: `.github/memory/` directory  
**Purpose**: Development discoveries, patterns, and session notes  
**Structure**:
- `README.md` - Comprehensive guide to using the memory system
- `session-notes.md` - Historical summaries of completed sessions (COMMITTED)
- `patterns-discovered.md` - Accumulated code patterns and solutions (COMMITTED)
- `scratch/working-notes.md` - Active session work-in-progress (NOT COMMITTED)

### How to Use During Development

**During Active Work:**
- Take real-time notes in `.github/memory/scratch/working-notes.md`
- Document current task, approach, findings, decisions, and blockers
- This file is ignored by git - it's your ephemeral scratchpad

**At End of Session:**
1. Review scratch/working-notes.md for key insights
2. Summarize session accomplishments in `session-notes.md`
3. Extract reusable patterns to `patterns-discovered.md`
4. Commit session-notes.md and patterns-discovered.md
5. Clear or archive scratch/working-notes.md for next session

**When Providing Context to AI:**
- Reference `.github/memory/patterns-discovered.md` for established code patterns
- Reference `.github/memory/session-notes.md` for historical context and decisions
- AI agents can apply learned patterns automatically when referenced

**See `.github/memory/README.md` for detailed usage instructions and examples.**

## Workflow Utilities

### GitHub CLI Commands

Use these commands for workflow automation (available in all modes):

```bash
# List all open issues
gh issue list --state open

# View specific issue details
gh issue view <issue-number>

# View issue with all comments
gh issue view <issue-number> --comments
```

**Note**: 
- The main exercise issue will have "Exercise:" in the title
- Individual steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without changing behavior
- `style:` - Code style/formatting changes

**Examples:**
```bash
git commit -m "feat: add delete button to todo items"
git commit -m "fix: correct validation for empty todo titles"
git commit -m "test: add integration tests for todo API endpoints"
```

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`
- **Always stage all changes before committing**: `git add .`
- **Push to correct branch**: `git push origin <branch-name>`

**Example workflow:**
```bash
# Create feature branch
git checkout -b feature/add-todo-priority

# Make changes, then stage all
git add .

# Commit with conventional format
git commit -m "feat: add priority field to todos"

# Push to feature branch
git push origin feature/add-todo-priority
```
