# Whisper of the Ghost -- Implementation Specification

## Goal

Create an environmental lore inscription on the **right side** of the
landing page. It is **not** a UI card, panel, or modal. It should feel
like an ancient magical inscription suspended in Midgard.

The inscription is visible immediately after the loading screen and
remains in the world. Whenever the center Codex opens, the Codex should
render **above** this inscription so the text becomes partially or fully
hidden behind it.

------------------------------------------------------------------------

# Layer Hierarchy

Background ↓ Environment (tree, mountains) ↓ Whisper of the Ghost
inscription ↓ Particles & rune effects ↓ Codex (higher z-index) ↓ Cursor
/ overlays

Suggested z-index: - Background: 0 - Ghost inscription: 8 - Particle
layer: 9 - Codex: 20+

------------------------------------------------------------------------

# Step 1 -- Position

-   Place in the empty right third of the viewport.
-   Keep generous margins.
-   Width: 380--460px.
-   Vertically centered.
-   Never overlap relic tiles.

------------------------------------------------------------------------

# Step 2 -- Typography

Heading: THE CHRONICLES

Body: Every battle leaves a mark. Every project tells a story.

I build intelligent systems where AI meets craftsmanship.

Driven by curiosity. Fueled by discipline. Guided by purpose.

This is my path. This is my story.

--- Parth

Use elegant serif fonts resembling Norse inscriptions.

------------------------------------------------------------------------

# Step 3 -- Visual Style

Not a rectangle. No background. No border.

The text should appear to float inside mist.

Opacity: 40--60%

Color: Cold blue-white.

Very soft outer glow.

------------------------------------------------------------------------

# Step 4 -- Runes

Place faint vertical runes left and right.

Opacity: 10--20%

Animate: Very slow upward drift.

Occasional blue pulse.

------------------------------------------------------------------------

# Step 5 -- Particles

Add: - drifting snow - floating dust - tiny rune sparks

Particles move independently.

------------------------------------------------------------------------

# Step 6 -- Reveal Sequence

Loading

↓

0 ms opacity = 0

↓

500 ms fade begins

↓

Heading engraves left → right

↓

Body engraves line by line

↓

Signature appears last

↓

Rune pulse

↓

Idle animation

------------------------------------------------------------------------

# Step 7 -- Engraving Reveal

Do NOT fade each letter.

Instead:

Reveal text with a left-to-right mask.

As the mask moves: - brightness increases - tiny sparks - subtle frost
trail - final letters settle into lower opacity

------------------------------------------------------------------------

# Step 8 -- Idle Animation

Loop forever:

-   opacity gently changes (45% → 60% → 45%)
-   glow breathes
-   runes pulse
-   snow drifts

Cycle: 8--12 seconds

------------------------------------------------------------------------

# Step 9 -- Mouse Interaction

Cursor near text:

-   inscription shifts 3--5 px
-   glow slightly increases
-   nearby particles accelerate

No aggressive movement.

------------------------------------------------------------------------

# Step 10 -- Codex Integration

The inscription always exists.

Opening Codex: - Codex slides in above inscription. - Ghost text remains
rendered underneath. - No fade-out. - No layout shift.

Closing Codex: - Ghost text is immediately visible again.

------------------------------------------------------------------------

# Step 11 -- Performance

Use: - CSS transforms - opacity animations - requestAnimationFrame only
for particles - avoid expensive filters

------------------------------------------------------------------------

# Desired Emotional Effect

The visitor should feel this is an ancient magical memory lingering in
Midgard rather than another website component.

It should resemble Odin's lingering knowledge carried by wind and frost.
