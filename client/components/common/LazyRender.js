"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * LazyRender: Surgically defers the mounting/rendering of heavy components
 * until they are near the viewport. Essential for 90+ Lighthouse Performance.
 */
export default function LazyRender({ children, rootMargin = "400px", minHeight = "200px" }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: !isVisible ? minHeight : "auto" }}>
      {isVisible ? children : null}
    </div>
  );
}
