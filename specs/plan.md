# Test Plan for https://www.saucedemo.com

This document describes the end‑to‑end test scenarios covering normal flows, edge cases,
accessibility and network resilience for the Swag Labs demo application.  The existing
smoke tests (`auth.spec.ts`, `home.spec.ts`, `inventory.spec.ts`) exercise the happy paths.
The additional specs in `src/tests` reference this plan for context.

## 1. Authentication

1. Valid login (standard_user)
2. Locked‑out user receives appropriate error message
3. Blank username, blank password, and both blank
4. Invalid credentials produce error helper
5. Malformed input (special characters)
6. Problem user: should still reach inventory but with broken assets
7. Performance‑glitch user: login is slow but eventually lands on inventory

## 2. Home Page

1. Hamburger/menu accessibility and keyboard navigation
2. Reset App State returns to clean inventory
3. About link opens external page
4. Logout returns to login screen
5. Title and logo text verify

## 3. Inventory / Products

1. Sorting options (A→Z, Z→A, price low→high, high→low)
2. Add one or many items to cart and verify badge count
3. Remove items and ensure badge updates or disappears
4. Navigate to product detail page and confirm name/description/price
5. Verify data consistency between list view and detail view
6. Cart contents persist when navigating back and forth
7. Sorting remains applied after add/remove operations

## 4. Cart

1. Add multiple distinct products, then remove individually
2. Use "Continue Shopping" to return to inventory
3. Ensure badge matches number of items added
4. Clicking an item in cart leads to its detail page
5. Cart state cleared after checkout or via reset state

## 5. Checkout

1. Fill in first/last name and postal code with valid values and complete purchase
2. Attempt to continue with missing fields; validation errors appear
3. Use "Cancel" to go back to cart without losing contents
4. Verify order confirmation page text and ability to go back to inventory

## 6. Data Consistency

1. Product names, descriptions and prices do not change across views [data‑consistency.spec.ts]
2. Cart total equals sum of item prices plus any tax (if applicable)
3. Sorting order is preserved when returning from cart or details

## 7. UI Resilience & Accessibility

1. Verify responsive layout at mobile, tablet and desktop breakpoints [ui‑resilience.spec.ts]
2. Tab navigation focuses actionable elements in sequence
3. Simulate network failure during add‑to‑cart; badge should not increment
4. Intercept inventory request to return 500 and confirm application doesn’t crash
5. Performance‑glitch user eventually loads inventory despite delays

## 8. Edge Cases

1. Use problem_user to exercise missing/broken images or server errors on assets
2. Clear local storage/session mid‑flow to simulate session expiration
3. Ensure no uncaught exceptions appear when unexpected DOM events occur


> **Note:** existing specs cover normal happy-paths; use the plan to understand why
additional tests were added and to locate related scenarios.
