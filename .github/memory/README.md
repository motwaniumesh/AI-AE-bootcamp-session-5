# Development Memory System

## Purpose

This memory system is designed to track patterns, decisions, and lessons learned during development sessions. Unlike static documentation, this is a **living knowledge base** that evolves as you build features, fix bugs, and discover patterns in the codebase.

## Why Use This System?

As you work through TDD cycles, debug issues, and implement features, you encounter valuable insights:
- "Empty arrays work better than null for initialization"
- "This validation pattern appears in multiple endpoints"
- "Jest requires explicit imports for React Testing Library utilities"

**Without a memory system**, these insights are lost when the session ends.  
**With this memory system**, AI agents can reference your discoveries and apply them automatically in future work.

---

## Memory Types: Persistent vs Working

### Persistent Memory
**Location**: `.github/copilot-instructions.md`  
**Purpose**: Foundational principles, workflows, and standards  
**Committed**: Yes (always in git)  
**When to update**: When establishing permanent project conventions

**Examples**:
- Conventional commit format requirements
- Testing philosophy (unit/integration only, no e2e)
- Workflow patterns (TDD, lint resolution)

### Working Memory
**Location**: `.github/memory/` directory  
**Purpose**: Development discoveries, session notes, and active work  
**Committed**: Partial (history committed, active work ephemeral)  
**When to update**: During development sessions

---

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md            # Historical record of completed sessions (COMMITTED)
├── patterns-discovered.md      # Accumulated code patterns and solutions (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active session work-in-progress (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed)
**What**: Historical summaries of completed sessions  
**When to use**: At the END of each development session  
**Content**: What was accomplished, key findings, decisions made, outcomes  
**Why committed**: Creates a searchable history of project evolution

#### `patterns-discovered.md` (Committed)
**What**: Reusable code patterns and solutions  
**When to use**: When you discover a pattern that applies broadly  
**Content**: Pattern templates with context, problem, solution, examples  
**Why committed**: Builds a pattern library for the entire team

#### `scratch/working-notes.md` (NOT Committed)
**What**: Active work-in-progress notes for the current session  
**When to use**: Throughout the active session - real-time note-taking  
**Content**: Current task, approach, findings, decisions, blockers, next steps  
**Why NOT committed**: Keeps active work ephemeral; you'll summarize key parts at session end

---

## How to Use During Development Workflows

### During TDD (Test-Driven Development)

**As you work through Red-Green-Refactor cycles:**

1. **In `scratch/working-notes.md`** - Track your progress:
   ```markdown
   ## Current Task
   Implementing POST /api/todos endpoint
   
   ## Approach
   - RED: Test expects 201 status and todo object with id, title, completed, createdAt
   - GREEN: Implement minimal code to pass test
   - REFACTOR: Extract validation logic
   
   ## Key Findings
   - Request body validation needs to check for empty strings, not just missing fields
   - Auto-generated IDs should use Date.now() for simplicity
   
   ## Decisions Made
   - Using in-memory array instead of database for MVP
   - Returning ISO 8601 timestamps for createdAt field
   ```

2. **After completing a feature** - If you discovered a reusable pattern, add to `patterns-discovered.md`:
   ```markdown
   ## Pattern: Request Body Validation
   **Context**: REST API endpoints that accept JSON payloads
   **Problem**: Need to validate required fields and field types
   **Solution**: Middleware that checks req.body before handler execution
   ```

3. **At session end** - Summarize the session in `session-notes.md`:
   ```markdown
   ### Session: Implement Todo CRUD Endpoints
   **Date**: 2026-03-20
   
   **Accomplished**:
   - Implemented POST /api/todos with validation
   - All tests passing
   
   **Key Findings**:
   - Empty strings should be treated as invalid input
   - In-memory storage works fine for MVP scope
   ```

### During Lint Error Resolution

**As you fix lint errors systematically:**

1. **In `scratch/working-notes.md`** - Document the errors and fixes:
   ```markdown
   ## Current Task
   Resolving ESLint errors in backend/src/app.js
   
   ## Key Findings
   - 3 unused variables from old debugging code
   - 2 console.log statements flagged
   - 1 missing semicolon
   
   ## Decisions Made
   - Removed console.log statements - using proper error responses instead
   - Deleted unused variables from refactoring
   ```

2. **If pattern emerges** - Add to `patterns-discovered.md`:
   ```markdown
   ## Pattern: Proper Error Logging
   **Context**: Express endpoints need error visibility without console.log
   **Problem**: ESLint flags console statements; need production-safe logging
   **Solution**: Return error details in response object for client handling
   ```

### During Debugging

**As you troubleshoot issues:**

1. **In `scratch/working-notes.md`** - Track your investigation:
   ```markdown
   ## Current Task
   Debug: DELETE endpoint returns 200 but doesn't delete todo
   
   ## Approach
   - Check if ID parsing is correct
   - Verify array filter logic
   - Test with manual curl command
   
   ## Key Findings
   - IDs stored as numbers but request params are strings
   - Missing parseInt() conversion
   
   ## Decisions Made
   - Parse ID to integer before comparison: parseInt(req.params.id, 10)
   ```

2. **After fixing critical bugs** - Document in `patterns-discovered.md`:
   ```markdown
   ## Pattern: URL Parameter Type Coercion
   **Context**: Express routes with numeric IDs in URL parameters
   **Problem**: req.params.id is always a string, but IDs are stored as numbers
   **Solution**: Parse to integer before comparison: parseInt(req.params.id, 10)
   **Example**: `const id = parseInt(req.params.id, 10);`
   ```

---

## How AI Reads and Applies These Patterns

When you invoke Copilot or other AI agents in future sessions:

1. **AI loads persistent memory** (`.github/copilot-instructions.md`) automatically
2. **You reference working memory** when providing context:
   - "Check .github/memory/patterns-discovered.md for our validation pattern"
   - "See .github/memory/session-notes.md for why we chose in-memory storage"

3. **AI applies learned patterns**:
   - When you ask to implement a new endpoint, AI references your validation pattern
   - When debugging, AI recalls similar issues from session notes
   - When writing tests, AI follows patterns from patterns-discovered.md

4. **Pattern reinforcement**:
   - More patterns documented = more consistent code generation
   - More session notes = better context for future debugging
   - Memory system becomes your team's "second brain"

---

## Session Workflow Summary

### During Active Development
1. Open `scratch/working-notes.md`
2. Document current task, approach, findings as you work
3. Take notes freely - this is your scratchpad
4. Don't worry about formatting - it's temporary

### At End of Session
1. Review `scratch/working-notes.md` for key insights
2. Move important findings to `session-notes.md` as a summary
3. Extract reusable patterns to `patterns-discovered.md`
4. Commit session-notes.md and patterns-discovered.md
5. Leave scratch/working-notes.md uncommitted (it's automatically ignored)

### Starting Next Session
1. Clear or archive `scratch/working-notes.md` (since it's not committed, you can reset it)
2. Copy the working-notes.md template fresh if needed
3. Reference previous session-notes.md for context on where you left off
4. Continue building on patterns-discovered.md

---

## Best Practices

### ✅ DO
- Take notes in real-time during development
- Document surprises and "gotchas" immediately
- Extract patterns when you see repetition
- Write for your future self (or teammates)
- Keep session summaries concise but informative

### ❌ DON'T
- Wait until end of session to document everything (you'll forget)
- Document obvious patterns (e.g., "variables need to be declared")
- Copy-paste entire files into notes (link to them instead)
- Commit scratch/working-notes.md (it's meant to be ephemeral)
- Over-structure while working (polish at session end)

---

## Example: Complete Session Flow

**Start of session** - Create fresh working notes:
```markdown
## Current Task
Implement PATCH /api/todos/:id endpoint for editing todos

## Approach
- RED: Write test first
- GREEN: Implement to pass test
- REFACTOR: Clean up code
```

**During development** - Add findings as you go:
```markdown
## Key Findings
- Need to validate that at least one field is being updated
- Should return 404 if todo not found
- Title validation should apply here too (no empty strings)

## Decisions Made
- Allow partial updates (don't require all fields)
- Reuse validation logic from POST endpoint
```

**End of session** - Summarize in session-notes.md:
```markdown
### Session: Implement Todo Edit Functionality
**Date**: 2026-03-20

**Accomplished**:
- Implemented PATCH /api/todos/:id endpoint
- Added validation for partial updates
- All tests passing

**Key Findings**:
- Partial update endpoints need different validation than full creates
- Can reuse validation functions across endpoints

**Outcomes**:
- TODO app now supports full CRUD operations
```

**After session** - Extract pattern to patterns-discovered.md:
```markdown
## Pattern: Partial Update Validation
**Context**: PATCH endpoints that accept partial object updates
**Problem**: Need to validate only fields that are present, not require all fields
**Solution**: Check if field exists before validation: `if (req.body.title !== undefined) { validate(req.body.title); }`
**Related Files**: `backend/src/app.js` (PATCH /api/todos/:id)
```

---

## Questions?

This memory system is designed to grow with your project. Start simple:
1. Use scratch/working-notes.md for active work
2. Summarize sessions in session-notes.md
3. Document patterns when you find them

The more you use it, the more valuable it becomes! 🚀
