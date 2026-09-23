# CODE_STANDARDS.md

# Code Quality Standards

## 1. General

Code should be:

- readable
- predictable
- maintainable
- reusable
- typed
- appropriately documented

Prefer simple code over clever code.

---

# 2. TypeScript

Use TypeScript.

Avoid `any`.

If the type is genuinely unknown, prefer `unknown` and narrow it safely.

Define reusable domain types.

Example:

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
};

Do not repeatedly redefine the same structure in different files.

---

# 3. React Components

Use functional React components.

Keep components focused.

Bad:

One 800-line homepage component.

Better:

Homepage composed from individual sections.

---

# 4. Server vs Client Components

In Next.js App Router:

Prefer Server Components by default.

Add `"use client"` only when needed for:

- state
- effects
- event-driven browser interaction
- browser APIs
- client-only animation

Do not turn an entire page into a Client Component because one small carousel requires state.

Move the interactive portion into its own client component.

---

# 5. Component Responsibilities

Components should have clear responsibilities.

Example:

`ProductCard`

should render product information.

It should not also:

- fetch unrelated categories
- control the homepage
- contain global navigation logic

---

# 6. Component API

Prefer explicit typed props.

Bad:

`data: any`

Better:

`product: Product`

Keep component interfaces small.

---

# 7. Naming

Components:

PascalCase

Examples:

`ProductCard.tsx`

`HeroSection.tsx`

Functions:

camelCase

Examples:

`formatCurrency()`

`getFeaturedProducts()`

Booleans:

Use meaningful prefixes.

Examples:

`isLoading`

`isFeatured`

`hasDiscount`

Avoid unclear abbreviations.

---

# 8. File Naming

Follow the existing project convention.

Do not mix naming styles without reason.

For components, prefer consistent names such as:

`product-card.tsx`

or

`ProductCard.tsx`

based on the established project convention.

---

# 9. Constants

Avoid unexplained magic values.

Bad:

`setTimeout(..., 4370)`

Better:

Define an appropriately named constant where useful.

Do not over-abstract obvious values.

---

# 10. Styling

Use the project's styling system consistently.

Prefer Tailwind utilities and shared design tokens.

Avoid large amounts of arbitrary inline styling.

Avoid repeating the same long class groups across many components when a reusable abstraction would be clearer.

---

# 11. Design Tokens

Centralize important design values where appropriate:

- colours
- typography
- radius
- shadows
- containers
- animation timing

Do not hardcode slightly different versions of the same brand colour throughout the project.

---

# 12. Conditional Classes

Use the existing class utility where available.

Keep complex conditional class logic readable.

---

# 13. Data

Separate demo data from UI components.

Bad:

Hundreds of lines of product objects directly inside `page.tsx`.

Better:

`data/products.ts`

or an appropriate data module.

This makes future API/database replacement easier.

---

# 14. Business Logic

Avoid embedding business logic deeply inside presentation components.

Examples:

Currency formatting

Product discount calculations

Stock interpretation

should use reusable functions where appropriate.

---

# 15. Currency

Do not manually concatenate currency formatting everywhere.

Prefer a helper such as:

`formatCurrency(amount)`

This allows future currency changes.

---

# 16. Images

Use `next/image` where appropriate.

Always consider:

- width
- height
- sizes
- priority
- alt
- loading

Do not mark every image as priority.

Reserve priority for critical above-the-fold imagery.

---

# 17. Accessibility

Prefer native semantic elements.

Use:

`button`

instead of clickable `div`.

Use:

`a` / Next.js `Link`

for navigation.

ARIA should supplement semantic HTML, not replace it.

---

# 18. State

Keep state as local as possible.

Do not introduce global state for simple local interactions.

Global state may eventually be justified for:

- cart
- authentication
- wishlist

Use the simplest appropriate solution.

---

# 19. Effects

Avoid unnecessary `useEffect`.

Do not use effects to calculate values that can be derived during render.

Clean up:

- listeners
- timers
- observers

when necessary.

---

# 20. Animation

Keep animation logic separated enough that content remains understandable.

Avoid excessive React state updates for scroll animation.

Prefer efficient animation APIs/libraries.

Animate transform and opacity where possible.

---

# 21. Error Handling

Do not silently swallow errors.

Provide appropriate handling for future:

- failed API requests
- missing products
- invalid routes
- image failures

For demo data, avoid intentionally creating broken states unless demonstrating them.

---

# 22. Comments

Comments should explain WHY, not repeat WHAT the code obviously does.

Bad:

`// increment index`

Good:

`// Keep background and product carousels synchronized through one active index.`

---

# 23. Duplication

Avoid unnecessary duplication.

If the same UI pattern appears repeatedly, consider a reusable component.

Do not create abstractions prematurely for code used once.

---

# 24. Imports

Keep imports organized according to the project's linting conventions.

Remove unused imports.

Avoid fragile deeply nested relative imports if project aliases are available.

---

# 25. Dependencies

Do not install a library for trivial functionality.

Before installing:

- check existing dependencies
- check native browser capability
- check existing components
- consider bundle impact

---

# 26. Security

Never expose:

- secrets
- service role keys
- database passwords
- private API keys

Client-accessible environment variables must be intentionally public.

---

# 27. Console

Do not leave unnecessary:

`console.log`

statements in finished code.

Errors/warnings should be intentional.

---

# 28. Linting

New code should not introduce lint errors.

Do not disable lint rules merely to make warnings disappear without understanding them.

---

# 29. Type Errors

Do not suppress TypeScript errors with:

`@ts-ignore`

unless there is an exceptional, documented reason.

Fix the underlying type problem.

---

# 30. Refactoring

Do not refactor unrelated areas during a focused task unless required.

Small, safe changes are preferred.

---

# 31. Quality Standard

Before considering code complete, ask:

Would another developer understand this six months from now?

If not, simplify it.