---
name: layout-editor-coherence-skill
description: Use when adding UI elements, buttons, forms, or interactive features - ensures every UI element has working backend functionality and prevents placeholder-only implementations
---

# Layout Editor Coherence

## Overview

Every interactive UI element MUST have working backend functionality. No placeholders.

**Core principle:** If a button exists, it must do something real.

**Violating the letter of this rule is violating the spirit of this rule.**

## The Iron Law

```
NO UI ELEMENT WITHOUT WORKING BACKEND FUNCTIONALITY
```

Adding a button that does nothing? Don't. Either implement the backend first, or ask the user if they want to skip this element entirely.

## When to Apply

**ALWAYS before adding:**

- Buttons (save, delete, submit, cancel)
- Forms and inputs
- Interactive elements (drag, resize, select)
- Context menu items
- Toolbar actions

## The Coherence Checklist

```
BEFORE adding any interactive element:

1. BACKEND FIRST: Does the backend functionality exist?
   - If NO: Implement backend FIRST, then UI
   - If YES: Wire UI to existing backend
2. VERIFY: Click the element → Does it work?
3. FEEDBACK: Does the user see feedback? (loading, success, error)
4. EDGE CASES: Empty state, error state, loading state
5. RELATED UX: Are there complementary features to suggest?

Skip any step = incomplete feature
```

## Good vs Bad Examples

### Bad: Placeholder Button

```tsx
// ❌ BAD: Button does nothing
<Button onClick={() => console.log('TODO: implement save')}>Save</Button>
```

### Good: Fully Wired Button

```tsx
// ✅ GOOD: Button with real functionality + feedback
;<Button onClick={handleSave} className="relative">
  <Save className="h-4 w-4 mr-2" />
  حفظ التغييرات
  {isDirty && (
    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
  )}
</Button>

// With real handler
const handleSave = useCallback(async () => {
  try {
    await flush()
    notify.success('تم حفظ التغييرات بنجاح')
  } catch (e) {
    notify.error('فشل في حفظ بعض التغييرات')
  }
}, [flush, notify])
```

### Bad: Missing Confirmation

```tsx
// ❌ BAD: Destructive action without confirmation
<Button onClick={() => deleteAll()}>Delete All</Button>
```

### Good: Proper Destructive Action

```tsx
// ✅ GOOD: Confirmation + undo support
const handleDeleteAll = useCallback(async () => {
  const confirmed = window.confirm('هل أنت متأكد من حذف جميع العناصر؟')
  if (!confirmed) return

  const previousElements = [...elements]
  await executeCommand({
    execute: () => deleteByPage(currentPage.id),
    undo: async () => {
      for (const el of previousElements) {
        await createElement({ pageId: currentPage.id, ...el })
      }
    }
  })
}, [...])
```

## Proactive UX Suggestions

When implementing a feature, PROPOSE (don't auto-implement) related features:

| Feature     | Suggest Also                                     |
| ----------- | ------------------------------------------------ |
| Save        | Cancel/discard, dirty indicator, unsaved warning |
| Delete      | Confirmation dialog, undo support                |
| Form submit | Validation feedback, loading state               |
| List        | Empty state, loading skeleton                    |
| Selection   | Deselect, multi-select, select all               |
| Edit        | Undo/redo, save shortcut (Ctrl+S)                |

**Ask before implementing:** "Should I also add [related feature]?"

## Red Flags - STOP

- `console.log('TODO')` in click handlers
- Empty arrow functions `onClick={() => {}}`
- "Design first, wire later"
- "I'll add the backend in the next PR"
- Buttons without loading/success/error states
- Destructive actions without confirmation

## Common Rationalizations

| Excuse                        | Reality                                   |
| ----------------------------- | ----------------------------------------- |
| "It's just for design review" | Create a Figma mockup instead             |
| "Backend team will add it"    | Wait for backend, then add UI             |
| "MVP doesn't need it working" | MVP needs working features, not broken UI |
| "I'll wire it up later"       | Technical debt from day 1                 |

## Verification Before Completion

Before claiming a UI feature is complete:

- [ ] Every button/action has a working handler
- [ ] Handlers call real backend (not console.log)
- [ ] Success/error feedback exists
- [ ] Loading states are handled
- [ ] Edge cases covered (empty, error)
- [ ] Destructive actions have confirmation
- [ ] Undo support where appropriate

**REQUIRED:** Use verification-before-completion skill to verify.

## Integration with Other Skills

- **brainstorming**: Explore full scope before implementing
- **verification-before-completion**: Verify all wiring works
- **test-driven-development**: Write tests for handlers before implementing
