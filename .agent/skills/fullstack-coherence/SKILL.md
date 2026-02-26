---
name: fullstack-coherence
description: Use when adding UI elements, buttons, forms, or interactive features to ANY page - ensures every UI element has working backend functionality and prevents placeholder-only implementations
---

# Fullstack Coherence

## Overview

Every interactive UI element MUST have working backend functionality. No placeholders.

**Core principle:** If a button exists, it must do something real.

## The Iron Law

```
NO UI ELEMENT WITHOUT WORKING BACKEND FUNCTIONALITY
```

Adding a button that does nothing? Don't. Either implement the backend first, or ask the user if they want to skip this element entirely.

## When to Apply

**ALWAYS before adding:**

- Buttons (save, delete, submit, cancel, etc.)
- Forms and inputs
- Interactive elements (drag, resize, select, toggle)
- Context menu items
- Toolbar actions
- Links that trigger actions
- Any clickable/interactive element

## The Coherence Checklist

```
BEFORE adding any interactive element:

1. BACKEND FIRST: Does the backend functionality exist?
   - If NO → Implement backend FIRST, then UI
   - If YES → Wire UI to existing backend

2. VERIFY: Click/interact with the element → Does it work?

3. FEEDBACK: Does the user see feedback?
   - Loading state while processing
   - Success confirmation
   - Error handling with clear message

4. EDGE CASES: Are these handled?
   - Empty state
   - Error state
   - Loading state
   - Disabled state (when action unavailable)

5. RELATED UX: Are there complementary features to suggest?
```

## Good vs Bad Examples

### ❌ Bad: Placeholder Button

```tsx
<Button onClick={() => console.log('TODO: implement')}>Save</Button>
```

### ✅ Good: Fully Wired Button

```tsx
;<Button onClick={handleSave} disabled={isLoading}>
  {isLoading ? <Spinner /> : <Save />}
  Save
</Button>

const handleSave = async () => {
  try {
    setIsLoading(true)
    await api.save(data)
    notify.success('Saved successfully')
  } catch (e) {
    notify.error('Failed to save')
  } finally {
    setIsLoading(false)
  }
}
```

### ❌ Bad: Destructive Without Confirmation

```tsx
<Button onClick={() => deleteItem(id)}>Delete</Button>
```

### ✅ Good: Safe Destructive Action

```tsx
const handleDelete = async () => {
  const confirmed = await confirm('Are you sure?')
  if (!confirmed) return

  await deleteItem(id)
  notify.success('Deleted')
}
```

## Proactive UX Suggestions

When implementing a feature, PROPOSE (don't auto-implement) related features:

| Feature     | Suggest Also                             |
| ----------- | ---------------------------------------- |
| Save        | Cancel, dirty indicator, unsaved warning |
| Delete      | Confirmation, undo support               |
| Form submit | Validation, loading state                |
| List        | Empty state, loading skeleton            |
| Selection   | Deselect, multi-select                   |
| Edit        | Undo/redo, keyboard shortcuts            |
| Toggle      | Persist state, loading feedback          |

**Always ask:** "Should I also add [related feature]?"

## Red Flags - STOP

- `console.log('TODO')` in handlers
- Empty functions: `onClick={() => {}}`
- "Design first, wire later"
- Buttons without loading/error states
- Destructive actions without confirmation
- Forms without validation feedback

## Common Rationalizations

| Excuse                 | Reality                    |
| ---------------------- | -------------------------- |
| "It's just for design" | Use Figma for mockups      |
| "Backend will add it"  | Wait for backend first     |
| "MVP doesn't need it"  | MVP needs working features |
| "I'll wire it later"   | Technical debt from day 1  |

## Verification Checklist

Before claiming complete:

- [ ] Every button/action has working handler
- [ ] Handlers call real backend
- [ ] Success/error feedback exists
- [ ] Loading states handled
- [ ] Edge cases covered
- [ ] Destructive actions have confirmation

## Integration

- **brainstorming**: Explore scope before implementing
- **verification-before-completion**: Verify all wiring works
- **test-driven-development**: Write tests for handlers first
