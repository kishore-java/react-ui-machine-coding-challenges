// src/utils.js
export function shouldTransitionToLeft(currIndex, nextIndex, total) {
  if (currIndex === total - 1 && nextIndex === 0) {
    return true;
  }
  if (currIndex === 0 && nextIndex === total - 1) {
    return false;
  }
  return currIndex < nextIndex;
}