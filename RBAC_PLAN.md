# Role-Based Access Control (RBAC) Implementation Plan

This document outlines the steps to implement a role system with Admin, Manager, and User roles, allowing privileged access to manage `ModeleDemarche`.

## 1. Database Schema Updates
**File:** `prisma/schema.prisma`

*   **Define Role Enum:** Create a new enum `UserRole` with values `USER`, `MANAGER`, `ADMIN`.
*   **Update User Model:** Add a `role` field to the `User` model with a default value of `USER`.

```prisma
enum UserRole {
  USER
  MANAGER
  ADMIN
}

model User {
  // ... existing fields
  role UserRole @default(USER)
}
```

## 2. Type Definitions & NextAuth Configuration
**File:** `types/next-auth.d.ts` (Create if missing) & `auth.config.ts`

*   **Extend Types:** Extend the default NextAuth `Session` and `User` types to include the `role` property.
*   **Update JWT Callback:** Modify the `jwt` callback to persist the user's role into the JWT token.
*   **Update Session Callback:** Modify the `session` callback to pass the `role` from the token to the client-side session.

## 3. Middleware & Route Protection
**File:** `middleware.ts` & `auth.config.ts`

*   **Protect Admin Routes:** Update the `authorized` callback in `auth.config.ts` to check permissions for specific paths (e.g., `/admin`).
    *   If accessing `/admin/*`, ensure `user.role` is `ADMIN` or `MANAGER`.
    *   Redirect unauthorized users to the dashboard or a 403 page.

## 4. Backend Logic (Server Actions)
**File:** `features/admin/actions.ts` (New file)

*   **Secure Actions:** Create server actions for creating `ModeleDemarche`.
*   **Role Verification:** Inside every administrative server action, explicitly check the session role before performing the database operation.
    ```typescript
    const session = await auth();
    if (session?.user.role !== 'ADMIN' && session?.user.role !== 'MANAGER') {
      throw new Error("Unauthorized");
    }
    ```

## 5. Frontend Implementation
**Folder:** `app/admin/` (New Route Group)

*   **Admin Layout:** Create `app/admin/layout.tsx` that performs a server-side role check (double security) and renders the admin-specific sidebar/layout.
*   **ModeleDemarche Page:** Create `app/admin/modele-demarche/page.tsx` containing the form to add new models.
*   **Sidebar Update:** Update `features/sidebar/Sidebar.tsx` to conditionally render an "Admin Panel" link only if `user.role` is `ADMIN` or `MANAGER`.

## 6. Seed Script (Optional but Recommended)
**File:** `prisma/seed.ts`

*   Create a script to ensure at least one user is set as `ADMIN` so you don't lock yourself out of the new system.
