

import { useState } from "react";
import Pagination from "./Pagination";
import { shouldTransitionToLeft } from "../utils";

function ImageCarousel({ data }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [incomingImageIndex, setIncomingImageIndex] = useState(null);
  const [isTransition, setIsTransition] = useState(false);

  // Calculate direction fresh every render — no direction state!
  const goLeft = incomingImageIndex !== null && 
    shouldTransitionToLeft(currentImageIndex, incomingImageIndex, data.length);

  const exitClass = goLeft ? 'off-left' : 'off-right';
  const enterClass = goLeft ? 'off-right' : 'off-left';

  const currentImageClass = isTransition ? exitClass : '';
  const incomingImageClass = isTransition ? '' : enterClass;

  const changeImageIndex = (index) => {
    setIncomingImageIndex(index);
    requestAnimationFrame(() => {
      setIsTransition(true);
    });
  }

  const handleNext = () => {
    const index = (currentImageIndex + 1) % data.length;
    changeImageIndex(index);
  }

  const handlePrev = () => {
    const index = (currentImageIndex - 1 + data.length) % data.length;
    changeImageIndex(index);
  }

  const handleTransitionEnd = () => {
    setCurrentImageIndex(incomingImageIndex);
    setIncomingImageIndex(null);
    setIsTransition(false);
  }

  return (
    <div className="images-carousel-container">
      <button className="carousel-btn left" onClick={handlePrev} disabled={isTransition}>{"<"}</button>
      <img
        key={data[currentImageIndex].src}
        src={data[currentImageIndex].src}
        alt={data[currentImageIndex].alt}
        className={`img ${currentImageClass}`}
      />
      {incomingImageIndex !== null && (
        <img
          key={data[incomingImageIndex].src}
          src={data[incomingImageIndex].src}
          alt={data[incomingImageIndex].alt}
          className={`img ${incomingImageClass}`}
          onTransitionEnd={handleTransitionEnd}
        />
      )}
      <button className="carousel-btn right" onClick={handleNext} disabled={isTransition}>{">"}</button>
      <Pagination data={data} currentImageIndex={currentImageIndex} changeImageIndex={changeImageIndex} />
    </div>
  )
}

export default ImageCarousel;