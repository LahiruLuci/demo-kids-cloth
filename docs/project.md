# PROJECT.md

# Kids' Clothing E-Commerce Project

## 1. Project Overview

This project is a modern e-commerce website for a kids' clothing business.

The website should provide a premium online shopping experience while remaining playful and appropriate for children's fashion.

The current stage is a DEMO.

The demo will be used to:

- demonstrate the visual direction
- demonstrate customer shopping flow
- demonstrate interactive homepage ideas
- demonstrate responsive behaviour
- demonstrate potential e-commerce functionality
- present the project before full production development

The architecture should still allow the demo to grow into a complete production system later.

---

# 2. Long-Term System

The complete project may eventually include:

## Customer Website

- Homepage
- Shop
- Categories
- Collections
- Product details
- Search
- Filtering
- Wishlist
- Shopping cart
- Checkout
- Customer accounts
- Order history
- Promotions
- Contact
- About
- Policies

## Administration System

Future administration functionality may include:

- product management
- category management
- collection management
- size management
- colour management
- product variants
- inventory quantities
- stock adjustments
- low-stock alerts
- order management
- customer management
- discount management
- sales reporting
- inventory reporting
- website content management

Do not implement the complete administration system during the demo unless specifically requested.

---

# 3. Current Demo Goal

The current demo should focus primarily on:

- homepage
- navigation
- product presentation
- category presentation
- collection presentation
- product cards
- interactive hero
- visual storytelling
- responsive experience

Additional pages can be created separately as development continues.

The homepage architecture must therefore NOT make future pages difficult to add.

---

# 4. Target Customers

The website primarily targets:

- parents
- guardians
- gift buyers
- family members shopping for children

The design is for adults purchasing children's clothing.

Therefore:

Do not design the interface as if children themselves are the primary users.

The website can be playful, but purchasing information must remain clear and trustworthy.

---

# 5. Product Categories

Demo categories may include:

- New Arrivals
- Baby
- Toddlers
- Girls
- Boys
- Tops
- T-Shirts
- Dresses
- Sets
- Shorts
- Bottoms
- Sleepwear
- Accessories
- Best Sellers
- Sale

Exact categories can change later.

---

# 6. Age-Based Shopping

Age is important for kids' clothing.

The UI should be capable of supporting age-based browsing such as:

- 0–12 months
- 1–2 years
- 2–4 years
- 4–6 years
- 6–8 years
- 8–10 years
- 10–12 years

Do not hard-wire the entire system around these exact values.

They should be configurable data.

---

# 7. Product Data

A product may eventually contain:

- id
- slug
- name
- description
- price
- sale price
- category
- collection
- images
- colours
- sizes
- age ranges
- stock
- SKU
- status
- badges
- material
- care instructions
- featured status

Demo data should imitate this structure where useful.

---

# 8. Currency

The primary market can use:

LKR

Example:

LKR 3,490

Keep currency formatting centralized so another currency can be supported later.

---

# 9. Homepage

The intended homepage can contain:

## Announcement Bar

Examples:

- Free delivery above a selected order value
- New collection available
- Seasonal promotion

## Header

Possible navigation:

- New
- Baby
- Girls
- Boys
- Collections
- Sale

Actions:

- Search
- Account
- Wishlist
- Cart

## Hero

Primary visual experience.

Requirements are documented in `UI_DESIGN.md`.

## Shop by Category / Age

Large visual category cards.

## New Arrivals

Interactive product carousel.

## Featured Collection

Editorial campaign section.

## Shop the Look

Lifestyle image with clickable product hotspots.

## Best Sellers

Product discovery.

## Shop by Colour

Interactive colour browsing.

## Brand Values

Examples:

- Comfortable fabrics
- Designed for everyday play
- Quality materials
- Easy shopping

Avoid unsupported claims.

## Lifestyle / Social Gallery

Visual customer/brand content.

## Newsletter

Simple subscription CTA.

## Footer

Navigation, support, policies and social links.

---

# 10. Product Card

A reusable product card should be capable of supporting:

- product image
- optional second hover image
- name
- price
- sale price
- badge
- available colours
- wishlist
- quick action
- product link

The mobile experience must not depend on hover.

---

# 11. Future Product Page

Plan architecture so a future product page can support:

- image gallery
- product name
- price
- colour
- size
- age/fit information
- stock availability
- quantity
- add to cart
- wishlist
- description
- material
- care
- delivery information
- related products

---

# 12. Future Cart

Potential features:

- product
- variant
- quantity
- price
- subtotal
- remove
- update quantity
- estimated total

The demo may simulate cart behaviour if required.

---

# 13. Future Checkout

Possible production checkout:

- customer details
- phone
- email
- address
- delivery method
- payment method
- order summary
- confirmation

Payment gateway implementation is outside the initial visual demo unless specifically requested.

---

# 14. Inventory Future

Inventory should eventually operate at product variant level where required.

Example:

Product:
Classic Kids T-Shirt

Variants:

Blue / Age 4–6 / 5 units

Blue / Age 6–8 / 3 units

Red / Age 4–6 / 7 units

This future requirement should be considered when designing product data.

---

# 15. SEO Future

The production site should eventually support:

- meaningful page titles
- descriptions
- clean URLs
- product metadata
- category metadata
- canonical URLs
- sitemap
- robots rules
- structured product data
- social sharing metadata

The demo does not need a complex SEO system.

---

# 16. Important Principle

The website should feel like a REAL brand.

Do not make it feel like:

- an admin template
- a generic marketplace
- a default Tailwind template
- a collection of unrelated UI components
- a children's school website

The final visual identity should be cohesive.