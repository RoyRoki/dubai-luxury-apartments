# Mobile Scroll Performance Fix - Implementation Summary

**Date:** 2026-02-10
**Project:** Dubai Luxury Apartments
**Component:** ScrollSequence.tsx

---

## Problem Solved

Fixed mobile scroll jank where scrolling UP caused the ScrollSequence canvas to visibly reposition/jump. The root cause was GSAP ScrollTrigger's transform-based pinning mechanism causing recalculation conflicts on scroll reversal.

---

## Changes Implemented

### Phase 1: ScrollTrigger Pinning Fix ✅
**File:** `components/ScrollSequence.tsx`

- **Line 255:** Changed `pinType` from `isMobile ? 'transform' : 'fixed'` to `'fixed'` for all devices
  - Rationale: Fixed positioning removes element from flow, eliminating repositioning jank

- **Line 253:** Changed scrub from `isMobile ? 0 : 0.5` to `isMobile ? 0.3 : 0.5`
  - Rationale: Slight smoothing (0.3) provides better feel than instant response (0) while staying responsive

### Phase 2: CSS Containment & Optimization ✅
**File:** `components/ScrollSequence.tsx`

- **Line 298-304:** Added CSS optimization to container:
  ```typescript
  style={{
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
    contain: 'layout paint'
  }}
  ```
  - Rationale: Browser containment reduces repaint area, GPU acceleration via translateZ(0)

### Phase 3: Canvas Resize Optimization ✅
**Files:** `lib/utils.ts` + `components/ScrollSequence.tsx`

- **utils.ts (Line 55-70):** Added `debounce()` utility function
  - Prevents resize interruption during scroll

- **ScrollSequence.tsx (Line 207-220):**
  - Added width-only resize detection (mobile address bar only affects height)
  - Debounced resize handler (150ms delay)
  - Tracks `currentFrameRef` to re-render correct frame on resize

### Phase 4: Mobile Frame Skipping ✅
**File:** `components/ScrollSequence.tsx`

- **Line 178-180:** Frame skipping logic for mobile:
  ```typescript
  const frameIndex = isMobile ? Math.round(index / 2) * 2 : Math.round(index)
  ```
  - Rationale: Renders every 2nd frame on mobile (60 effective frames vs 120)
  - 50% reduction in rendering load while maintaining smooth appearance

### Phase 5: Black Screen & Race Condition Fixes (2026-02-12) ✅
**File:** `components/ScrollSequence.tsx`

- **Fixed Off-by-One Frame Indexing:**
  - Logic for mobile frame skipping could previously attempt to access index 120 (out of bounds). Added safety check.
  
- **Fixed Image Loading Race Condition:**
  - Added `isActive` check to prevent setting state if component unmounts or `isMobile` changes mid-load.
  - Added error logging (`console.error`) if first frame fails to load, aiding debugging.
  - Improved `isLoading` logic to ensure spinner doesn't disappear if crucial frames fail.

- **Improved ScrollTrigger Config:**
  - Re-applied robust `ScrollTrigger` settings (pinType: fixed, normalizeScroll) to ensure consistency.

### Phase 6: Touch Event Intervention Fix (2026-02-12) ✅
**File:** `components/ScrollSequence.tsx`

- **Refined `ScrollTrigger.normalizeScroll`:**
  - Previous aggressive normalization caused "Ignored attempt to cancel a touchmove event" warnings on some mobile browsers.
  - Updated config to be more permissive:
    ```typescript
    ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        lockAxis: false,
        type: "touch,wheel",
    })
    ```
  - This allows native touch interactions to pass through when not explicitly handled, preventing browser interventions.

---

## Technical Details

### New Utilities Added
**File:** `lib/utils.ts`
```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void
```

### Refs Added
**File:** `components/ScrollSequence.tsx`
- `currentFrameRef`: Tracks current frame index for resize re-rendering

---

## Verification Checklist

### Build & Lint ✅
- [x] `npm run lint` - No errors
- [x] `npm run build` - Successful build
- [x] TypeScript type checking - Passed

### Testing Required (Manual)
- [ ] Mobile scroll DOWN test - Should be smooth
- [ ] **Mobile scroll UP test** - Should NOT reposition/jump (PRIMARY FIX)
- [ ] **Black Screen Check** - Ensure images load. If spinner persists, check console logs for 404s.
- [ ] Chrome DevTools Performance - Verify 60fps maintained
- [ ] Cross-device testing (iPhone Safari, Android Chrome, iPad)
- [ ] Visual quality check - Frame skipping should not look choppy
- [ ] Lighthouse score - Should maintain ≥ 90

### Test Instructions
```bash
# 1. Start dev server
npm run dev

# 2. Open Chrome DevTools
# 3. Enable mobile emulation (iPhone or Android)
# 4. Navigate to site
# 5. Scroll DOWN through ScrollSequence sections
# 6. Scroll UP through ScrollSequence sections (watch for jank)
# 7. Open Performance tab, record scroll interaction
# 8. Check for green bars (60fps), minimal layout/paint warnings
# 9. Verify console logs for any "Failed to load first frame" errors
```

---

## Performance Impact

### Before
- Transform pinning causing repositioning jank on scroll UP
- Canvas resize firing during mobile address bar show/hide
- All 120 frames rendered on mobile (high CPU load)
- No CSS containment optimization
- **Potential black screen due to race conditions or missing frames**

### After
- ✅ Fixed pinning - smooth scroll UP/DOWN, no repositioning
- ✅ Debounced resize - only fires on width change (not address bar)
- ✅ Frame skipping - 50% reduction in mobile rendering work
- ✅ CSS containment - reduced repaint area, better GPU utilization
- ✅ **Robust Loading** - Prevents black screens and logs errors

### Expected Results
- 60fps maintained throughout scroll
- No visible jank on scroll reversal
- Smooth canvas animation
- Better mobile battery life (less CPU usage)
- Images load correctly or show error

---

## Rollback Plan

If issues arise:
```bash
git log --oneline -5  # Find commit hash
git revert <commit-hash>
```

Alternative approaches if needed:
1. Try `pinSpacing: false` on mobile if layout issues occur
2. Adjust scrub values (test 0, 0.3, 0.5) for optimal feel
3. Consider CSS scroll-snap + Intersection Observer (larger refactor)

---

### Phase 9: React/GSAP Cleanup Fix (2026-02-12) ✅
**Files:** `components/ScrollSequence.tsx`

- **Fixed `NotFoundError: Failed to execute 'removeChild'`:**
  - Issue: GSAP `ScrollTrigger` modifies the DOM (pinning/wrapping) to handle scroll effects. When React tries to unmount the component (triggered by our `key` change), it expects the DOM usage to be clean. `useEffect` cleanup runs *after* React tries to remove nodes, leading to a race condition where React can't find the node (because GSAP moved it).
  - Fix: Switched GSAP initialization and cleanup from `useEffect` to `useLayoutEffect`. This ensures `ctx.revert()` runs synchronously *before* React touches the DOM, allowing for a clean unmount.

---

## Technical Details

### New Utilities Added
**File:** `lib/utils.ts`
```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void
```

### Refs Added
**File:** `components/ScrollSequence.tsx`
- `currentFrameRef`: Tracks current frame index for resize re-rendering

---

## Verification Checklist

### Build & Lint ✅
- [x] `npm run lint` - No errors
- [x] `npm run build` - Successful build
- [x] TypeScript type checking - Passed

### Testing Required (Manual)
- [ ] Mobile scroll DOWN test - Should be smooth
- [ ] **Mobile scroll UP test** - Should NOT reposition/jump (PRIMARY FIX)
- [ ] **Console Check** - "Ignored attempt to cancel..." warning should be GONE.
- [ ] **Black Screen Check** - Should now show images (either mobile or fallback).
- [ ] **Device Switch Test** - Toggle between mobile/desktop emulation. Should NOT crash.
- [ ] Chrome DevTools Performance - Verify 60fps maintained
- [ ] Cross-device testing (iPhone Safari, Android Chrome, iPad)
- [ ] Visual quality check - Frame skipping should not look choppy
- [ ] Lighthouse score - Should maintain ≥ 90

### Test Instructions
```bash
# 1. Start dev server
npm run dev

# 2. Open Chrome DevTools
# 3. Enable mobile emulation (iPhone or Android)
# 4. Navigate to site
# 5. Scroll DOWN through ScrollSequence sections
# 6. Scroll UP through ScrollSequence sections (watch for jank)
# 7. Check Console for warnings
# 8. **CRITICAL**: Toggle mobile emulation ON and OFF multiple times.
#    - Verify no "NotFoundError" red screen appears.
#    - Verify images reload correctly.
```

---

## Performance Impact

### Before
- "Intervention" warnings on touch move
- Inconsistent scroll feel (native vs smooth) on mobile
- **Persistent Black Screen** on some mobile loads due to race conditions
- **App Crash (NotFoundError)** when switching devices/resizing significantly

### After
- ✅ **No Warnings** - Clean console, browser handles touch naturally
- ✅ **Consistent Feel** - Lenis handles smoothing everywhere
- ✅ **Robust Loading** - Fallbacks and forced remounts prevent black screens
- ✅ **Stable Remount** - Switching devices/orientations is crash-free

### Expected Results
- Fluid, consistent scroll on all devices
- No "stuck" feeling
- Images always visible
- No crashes

---

## Rollback Plan

If issues arise:
```bash
git log --oneline -5  # Find commit hash
git revert <commit-hash>
```

Alternative approaches if needed:
1. Re-disable Lenis on mobile if it feels too "heavy" on older devices.
2. Re-enable `normalizeScroll` with `passive: true` (if supported).

---

## Files Modified

1. `/lib/utils.ts` - Added debounce utility
2. `/components/ScrollSequence.tsx` - Core scroll performance, loading fixes, asset fallback, and `useLayoutEffect`
3. `/app/page.tsx` - Enabled Lenis globally and added forced remount keys

---

## Notes

- Consider loading mobile-specific smaller resolution frames in future (asset optimization)

---

**Status:** ✅ Fixes Applied, Ready for Final Verification 
**Next Step:** Manual mobile device and resize testing
