# Discovered Code Patterns

This file documents reusable code patterns discovered during development. Each pattern captures a problem, solution, and example that can be referenced in future work.

## Purpose
- Create a pattern library for consistent code
- Help AI agents apply learned solutions automatically
- Document "gotchas" and best practices specific to this codebase
- Reduce time debugging the same issues repeatedly

## Pattern Template

Use this template when documenting a new pattern:

```markdown
## Pattern: [Descriptive Name]
**Context**: [When/where this pattern applies]  
**Problem**: [What issue does this solve]  
**Solution**: [How to solve it]  
**Example**:
```
[Code example]
```
**Related Files**: [Where this pattern is used]  
**See Also**: [Links to related patterns]
```

---

## Patterns

### Pattern: Service Initialization with Empty Collections
**Context**: Backend services that store data in memory  
**Problem**: Deciding between `null` and empty array `[]` for initial state  
**Solution**: Use empty array `[]` for collections to avoid null checks throughout the code

**Example**:
```javascript
// ✅ Good - No null checks needed
let todos = [];
app.get('/api/todos', (req, res) => {
  res.json(todos); // Works even when empty
});

// ❌ Problematic - Requires null checks everywhere
let todos = null;
app.get('/api/todos', (req, res) => {
  res.json(todos || []); // Need to handle null case
});
```

**Related Files**: `packages/backend/src/app.js` (todos array initialization)  
**Benefits**:
- Eliminates null pointer errors
- Simplifies array operations (filter, find, map)
- Consistent return types in API responses

---

## Notes

- Add new patterns as you discover them during development
- Include clear code examples showing both good and bad approaches
- Reference specific files where the pattern is applied
- Group related patterns together with "See Also" links
- This file is committed to git and grows over time
