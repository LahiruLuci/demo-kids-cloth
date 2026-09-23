# AGENTS.md

## Purpose

This file contains the primary instructions for any AI coding agent working on this project.

Read this file completely before making changes.

This project is a modern kids' clothing e-commerce website demo built with Next.js.

The current priority is to create a highly polished, interactive, responsive customer-facing website that can later grow into a complete e-commerce and inventory management system.

---

# Required Documentation

Before implementing changes, read the relevant documentation:

- `docs/PROJECT.md`
  - Project purpose
  - Business context
  - Features
  - Pages
  - Current demo scope

- `docs/UI_DESIGN.md`
  - Visual direction
  - Homepage design
  - Animation rules
  - Component styling

- `docs/RESPONSIVE.md`
  - Mobile
  - Tablet
  - Desktop
  - Responsive behaviour

- `docs/CODE_STANDARDS.md`
  - TypeScript standards
  - React standards
  - Component standards
  - Naming
  - Maintainability

- `docs/ARCHITECTURE.md`
  - Folder structure
  - Component architecture
  - Data architecture
  - Future backend integration

- `docs/VERIFICATION.md`
  - Required checks before considering work complete

Do not ignore these files.

---

# Core Agent Rules

## 1. Understand Before Editing

Before making changes:

1. Inspect the existing project.
2. Understand the current implementation.
3. Identify reusable components.
4. Identify existing styles and dependencies.
5. Check whether similar functionality already exists.
6. Avoid unnecessary rewrites.

Do not replace working architecture without a clear reason.

---

## 2. Demo First

This is currently a demo project.

Prioritize:

- visual quality
- realistic shopping experience
- responsive design
- reusable components
- smooth interactions
- realistic demo data
- clean architecture

Do not build unnecessary production infrastructure unless requested.

Examples:

Do not add a real payment gateway unless requested.

Do not build a complete inventory database unless requested.

Do not add authentication infrastructure just because a login button exists.

Demo interactions can use local/mock data where appropriate.

However, the code must be structured so real APIs and databases can be connected later.

---

## 3. Do Not Copy Protected Components

External websites and premium components may be used as visual or interaction references.

Do NOT copy inaccessible, proprietary or paid source code.

Recreate the required behaviour independently.

The design can be inspired by references while the implementation must be our own.

---

# Primary Technology Direction

Prefer:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui where useful
- Motion / Framer Motion where animation is justified
- Lucide icons

Before adding another package:

1. Check whether the project already contains a suitable solution.
2. Check whether the feature can reasonably be implemented without another dependency.
3. Avoid unnecessary packages.

---

# Homepage Priority

The homepage is currently the highest-priority customer-facing page.

Expected homepage direction:

1. Announcement bar
2. Main navigation
3. Interactive dual-carousel hero
4. Shop by category / age
5. New arrivals
6. Featured collection
7. Shop the look
8. Best sellers
9. Shop by colour
10. Brand/value section
11. Social/lifestyle gallery
12. Newsletter
13. Footer

These sections should remain modular.

Do not create one massive homepage component.

---

# Hero Direction

The main hero should be inspired by the interaction concept of:

Shadcnblocks Ecommerce Hero 8 / Dual Carousel Collection Hero.

We are NOT copying its source code.

Recreate the concept independently.

The hero should support:

- large lifestyle background imagery
- collection/product slides
- foreground product cards or thumbnails
- synchronized slide state
- previous/next navigation
- smooth transitions
- clear CTA
- product/collection information
- responsive layouts
- touch/swipe support where appropriate
- accessible controls
- reduced-motion support

The hero should feel premium and editorial rather than like a generic banner slider.

---

# Reusability

Build reusable components.

Bad:

`HomePageEverything.tsx`

Better:

- `AnnouncementBar`
- `Header`
- `HeroSection`
- `HeroSlide`
- `CategoryCard`
- `ProductCard`
- `ProductCarousel`
- `CollectionBanner`
- `ShopTheLook`
- `ColorSelector`
- `LifestyleGallery`
- `Newsletter`
- `Footer`

Sections should be independently editable and reusable.

---

# Responsive Design Is Mandatory

Never design desktop first and leave mobile as an afterthought.

Every feature must be checked on:

- small mobile
- normal mobile
- large mobile
- tablet
- laptop
- desktop
- wide desktop

Read:

`docs/RESPONSIVE.md`

before completing UI work.

---

# Images

Images are extremely important for this project.

Maintain:

- correct aspect ratios
- responsive sizing
- good cropping
- object positioning
- optimized loading
- minimal layout shift

Use `next/image` where appropriate.

Do not stretch images.

Do not use low-quality images for major visual sections.

Hero and collection images should remain visually strong across device sizes.

---

# Animation

Animation must improve the experience.

Use:

- subtle entrance animation
- image zoom
- parallax where appropriate
- carousel transitions
- hover states
- micro-interactions
- scroll reveals

Avoid:

- excessive bouncing
- unnecessary rotation
- constant distracting movement
- long animation delays
- effects that interfere with shopping
- heavy animation on every element

Respect:

`prefers-reduced-motion`.

Performance is more important than decorative animation.

---

# Accessibility

Interactive elements must remain usable.

Requirements:

- semantic HTML
- buttons for actions
- links for navigation
- keyboard-accessible controls
- visible focus states
- useful image alt text
- sufficient contrast
- meaningful labels
- no important information available only through hover

---

# Performance

Avoid sacrificing performance for visual effects.

Pay attention to:

- large images
- unnecessary JavaScript
- unnecessary client components
- excessive animation
- layout shifts
- unnecessary re-renders
- oversized dependencies

Use Server Components by default where practical.

Use Client Components only when browser-side state or interaction requires them.

---

# Content

This is a kids' clothing brand.

The tone should feel:

- warm
- modern
- playful
- trustworthy
- premium
- family-friendly

Avoid childish visual overload.

Do not fill the website with emojis or cartoon decorations.

Use realistic product names, categories and pricing for demo content.

Do not use Lorem Ipsum for visible final demo sections.

---

# Safety When Editing

Do not:

- delete unrelated functionality
- rewrite unrelated files
- rename large parts of the project unnecessarily
- change dependencies unnecessarily
- modify configuration without understanding the impact
- expose secrets
- commit credentials
- hardcode private keys

Make the smallest clean change that correctly solves the task.

---

# Completion Requirement

A task is NOT complete simply because the code was written.

Before completion:

1. Review the changed files.
2. Run relevant linting.
3. Run TypeScript checks where available.
4. Run the production build when appropriate.
5. Check responsive behaviour.
6. Check browser console errors.
7. Check interaction states.
8. Check obvious accessibility issues.
9. Check that unrelated functionality still works.

Read `docs/VERIFICATION.md`.

---

# Reporting

After completing a significant task, provide a concise report containing:

## Files Created

## Files Modified

## What Was Implemented

## Responsive Behaviour

## Verification Performed

## Remaining Issues

Do not claim something was tested if it was not actually tested.
