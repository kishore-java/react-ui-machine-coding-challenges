## Image Carousel III

### State
- `currentIndex` → to show the current image on preview
                   updates only AFTER transition ends
- `incomingIndex` → to track which image to be rendered in DOM
                    null when idle
                    has value only during transition
- `isTransitioning` → true — animation playing, buttons disabled,
                             two images in DOM simultaneously
                      false — animation done, buttons enabled,
                              one image in DOM, ready for next click
- NOTE: direction is NOT stored in state — calculated fresh every render!

### Logic

#### shouldTransitionToLeft(currIndex, nextIndex, total)
- Lives in utils.js — pure function, no state
- Last → First (currIndex === total-1 && nextIndex === 0) → true (go left)
- First → Last (currIndex === 0 && nextIndex === total-1) → false (go right)
- Normal case → currIndex < nextIndex (going forward = left)
- Why needed? Simple index comparison breaks at loop boundaries
  e.g. last(5) → first(0): 5 > 0 = 'right' ❌ should be 'left'!

#### changeImageIndex(index)
- Single entry point for Next, Prev AND pagination dots
- Only sets incomingIndex — does NOT set direction state!
- Uses single requestAnimationFrame to delay setIsTransitioning(true)
- Why rAF? React batches state updates — without rAF, incoming image
  never gets a chance to render at off-screen position first,
  so transition has nothing to animate from → jumps instead of slides

#### handleNext()
- Calculates nextIdx = (currentIndex + 1) % data.length
- Calls changeImageIndex(nextIdx)

#### handlePrev()
- Calculates prevIdx = (currentIndex - 1 + data.length) % data.length
- Why + data.length? Without it, index 0 - 1 = -1 → crashes!
- Calls changeImageIndex(prevIdx)

#### handleTransitionEnd()
- Goes on INCOMING image — its arrival signals animation is complete
- Sets currentIndex = incomingIndex
- Resets incomingIndex = null (removes second image from DOM)
- Resets isTransitioning = false

### Class Logic
- Direction calculated fresh every render:
  const goLeft = incomingIndex !== null && 
    shouldTransitionToLeft(currentIndex, incomingIndex, data.length)
  const exitClass = goLeft ? 'off-left' : 'off-right'
  const enterClass = goLeft ? 'off-right' : 'off-left'

- currentImageClass:
  - isTransitioning → exitClass (slides out)
  - idle → '' (no class = center)

- incomingImageClass:
  - isTransitioning → '' (no class = slides into center)
  - NOT transitioning → enterClass (placed off-screen waiting)

- Key insight: 
  - current gets class DURING transition (to slide out)
  - incoming gets class BEFORE transition (to start off-screen)

### UI
- App
  - div.wrapper → centers carousel on screen
  - ImageCarousel → (data)
    - div.images-carousel-container → position relative, overflow hidden
    - button.left → onClick handlePrev, disabled during transition
    - img (currentIndex) → always in DOM, key={src}
    - img (incomingIndex) → only during transition, key={src}, onTransitionEnd
    - button.right → onClick handleNext, disabled during transition
    - Pagination → (data, currentImageIndex, changeImageIndex)
      - pagination-dot × data.length, active class on currentIndex

### CSS
- .images-carousel-container → position relative, overflow hidden,
                                width min(600px, 100vw), height 400px
- .img → position absolute, inset 0, width 100%, height 100%,
         object-fit cover, transition: transform 0.5s linear
- .off-left → translateX(-100%)
- .off-right → translateX(100%