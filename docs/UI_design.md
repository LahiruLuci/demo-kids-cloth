# UI_DESIGN.md

# Visual & Interaction Guidelines

## 1. Design Goal

Create a modern, premium and playful kids' fashion shopping experience.

The interface should feel:

- premium
- warm
- clean
- playful
- editorial
- modern
- trustworthy

The design should NOT feel:

- childish
- cartoon-heavy
- cheap
- cluttered
- template-like
- overly corporate

---

# 2. Visual Philosophy

Use:

- strong photography
- generous whitespace
- large typography
- clean layouts
- subtle playful details
- warm colour accents
- smooth motion
- clear shopping actions

The clothing and photography should provide much of the colour.

Avoid making every UI element brightly coloured.

---

# 3. Colour Direction

Possible base:

- warm white
- cream
- light neutral

Possible accents:

- soft yellow
- sage green
- powder blue
- peach
- coral
- muted pink

Primary text:

- dark charcoal
- dark navy

These are design directions, not mandatory hardcoded colours.

Define colours through the project's design tokens/theme.

Do not scatter arbitrary hex values throughout components.

---

# 4. Typography

Typography should combine:

- expressive fashion/editorial headings
- highly readable UI/body typography

Headings can be large and confident.

Body text must remain simple and readable.

Avoid:

- too many font families
- tiny body text
- excessive uppercase paragraphs
- decorative fonts for functional UI

---

# 5. Spacing

Use generous spacing.

Major homepage sections should feel intentionally separated.

Avoid:

- cramped product grids
- random padding values
- inconsistent vertical rhythm

Use a consistent spacing system.

---

# 6. Header

Desktop header may include:

LEFT:
Logo

CENTER:
New
Baby
Girls
Boys
Collections
Sale

RIGHT:
Search
Account
Wishlist
Cart

Mobile:

- menu
- logo
- search/cart

Do not squeeze desktop navigation onto small screens.

Use an appropriate mobile menu/drawer.

---

# 7. Hero Section

## Direction

Create an independently implemented dual-carousel fashion hero inspired by modern editorial e-commerce experiences.

Do not copy proprietary source code.

The hero should combine:

- full-width / full-screen lifestyle image
- collection information
- CTA
- foreground products/thumbnails
- carousel navigation
- synchronized slide changes

Possible slide content:

- collection label
- title
- short description
- CTA
- background image
- product preview(s)

Example copy:

NEW COLLECTION

Little Styles.
Big Adventures.

Comfortable everyday pieces made for play, discovery and everything in between.

[SHOP COLLECTION]

---

# 8. Hero Behaviour

Desktop can use:

- large background
- content overlay
- product preview carousel
- arrows
- progress indicator
- subtle background zoom
- slide transition

Mobile should simplify.

Do not force the desktop composition into mobile.

Mobile can use:

- portrait-friendly image
- readable text position
- smaller product carousel
- touch interaction
- large CTA
- minimal overlay

Text must remain readable over images.

Use overlays/gradients when necessary.

---

# 9. Carousel Rules

Carousels must:

- support previous/next controls
- support touch where appropriate
- avoid extremely fast autoplay
- pause or behave predictably
- maintain accessible controls
- work without hover

If autoplay is used:

- give users control
- avoid aggressive timing
- pause where appropriate
- respect reduced motion

---

# 10. Category Cards

Category cards should be highly visual.

Possible categories:

BABY

TODDLERS

GIRLS

BOYS

NEW ARRIVALS

Each card can include:

- image
- label
- subtle CTA
- hover image scale on pointer devices

Mobile:

Use grid or horizontal scrolling depending on content.

---

# 11. Product Cards

Product imagery is the priority.

Product cards should feel minimal.

Include only useful information.

Possible structure:

Image

Badge

Product Name

Price

Colour indicators

Wishlist

Quick Add

Hover behaviour may reveal:

- second image
- quick action

Mobile must expose important actions without requiring hover.

---

# 12. Product Images

Use consistent aspect ratios within product collections.

Possible ratio:

4:5

Do not mix random image heights in standard product grids unless intentionally using an editorial layout.

Use object-fit carefully.

---

# 13. Featured Collection

Create a strong editorial break between commerce sections.

Possible structure:

Large lifestyle image

Small label

Large title

Short copy

CTA

Animation can include:

- image reveal
- subtle parallax
- text reveal

Do not overanimate.

---

# 14. Shop The Look

Use a large lifestyle photograph.

Place accessible product hotspots over clothing items.

Selecting a hotspot can reveal:

- product thumbnail
- product name
- price
- view product action

On mobile:

Do not rely on tiny hotspots alone.

Provide an associated product list/cards beneath or beside the image.

---

# 15. Shop By Colour

Possible colour choices:

- Pink
- Red
- Orange
- Yellow
- Green
- Blue
- Purple
- Neutral

Selecting a colour can:

- update products
- navigate to a filtered collection
- update preview content

The colour name must be visible.

Do not communicate meaning using colour alone.

---

# 16. Social / Lifestyle Gallery

Create an editorial image strip or controlled marquee.

Possible behaviour:

- slow movement
- pause on interaction
- image reveal
- product link

Avoid extremely fast infinite movement.

---

# 17. Buttons

Primary CTA should be obvious.

Examples:

SHOP NOW

SHOP COLLECTION

EXPLORE NEW ARRIVALS

Buttons must have:

- hover state
- focus state
- active state
- disabled state where applicable

Avoid excessive button styles.

---

# 18. Micro-interactions

Good examples:

- image scale 1.00 → 1.03
- underline reveal
- icon movement of a few pixels
- card image crossfade
- button arrow movement
- subtle opacity transition

Avoid:

- dramatic bouncing
- 3D spinning products without purpose
- cursor effects that interfere with usability
- animation on every text element

---

# 19. Scroll Animation

Scroll animation can be used for:

- section reveal
- editorial image movement
- heading reveal
- subtle parallax

Animation should never prevent users from quickly reaching products.

---

# 20. Loading States

Where dynamic content is used, provide appropriate:

- skeletons
- image placeholders
- loading states

Avoid major layout shifts.

---

# 21. Empty States

Future commerce features should have designed empty states.

Examples:

Cart:
"Your bag is waiting for something lovely."

Wishlist:
"Save your favourites here."

Keep wording simple.

---

# 22. Consistency

Every page should feel part of the same brand.

Maintain consistent:

- typography
- buttons
- spacing
- cards
- image treatment
- icon style
- colour system
- border radius
- animation timing