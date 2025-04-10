// SwipeableView.jsx
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SwipeableView = ({ onSwipeLeft, onSwipeRight, children, threshold = 100 }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const swipeAreaRef = useRef(null);

  // the minimum distance required before we recognize it as a swipe
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        onSwipeRight();
      } else if (e.key === 'ArrowRight') {
        onSwipeLeft();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSwipeLeft, onSwipeRight]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  // Mouse events for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    if (translateX > threshold) {
      onSwipeRight();
    } else if (translateX < -threshold) {
      onSwipeLeft();
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  const getStyle = () => {
    return {
      transform: `translateX(${translateX}px)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease',
      touchAction: 'pan-y',
    };
  };

  return (
    <div 
      className="swipeable-view"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={swipeAreaRef}
      style={getStyle()}
    >
      {children}
      <div className="swipe-indicators">
        <div className="swipe-left-indicator">Swipe for next location</div>
        <div className="swipe-right-indicator">Swipe for previous location</div>
      </div>
    </div>
  );
};

SwipeableView.propTypes = {
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number
};

export default SwipeableView;