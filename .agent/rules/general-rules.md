---
trigger: always_on
---

---
applyTo: '**'
---
Use DRY principle 
Use SOLID Principles

Use standard naming conventions for files
Use standard project structure for backend code.

You can delete files and folders if needed to follow standard project structure.

We will use feature folder structure.

Use the theme provided in config/theme.js for styling


In the feature folder structure you can import only from the feature folder or from shared folder

So feature can't import from other feature folders directly


Before creating new function check in the features if the function already exists

If you need a function in feature that exists in another feature you CAN'T import it directly you have to pass it a prop and import it in page or any high level folder like shared or something.



use the theme provided in shared/theme.ts

Make sur to make components modulare and reusable


Make sure to write comments for complex logic


Make all the code scalable and maintainable and easy to read