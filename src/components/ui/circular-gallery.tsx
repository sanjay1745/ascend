import React, { useState, useEffect, useRef, type HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  centerContent?: React.ReactNode;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, centerContent, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const lastRotation = useRef(0);

    // --- Mouse drag (desktop) ---
    const mouseStartX = useRef<number | null>(null);

    const onMouseDown = (e: React.MouseEvent) => {
      mouseStartX.current = e.clientX;
      lastRotation.current = rotation;
      setIsDragging(true);
    };

    const onMouseMove = (e: React.MouseEvent) => {
      if (mouseStartX.current === null) return;
      const dx = e.clientX - mouseStartX.current;
      const delta = (dx / window.innerWidth) * 180;
      setRotation(lastRotation.current - delta);
    };

    const onMouseUp = () => {
      mouseStartX.current = null;
      setIsDragging(false);
    };

    // --- Touch drag (mobile) ---
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const isDraggingH = useRef<boolean | null>(null);

    useEffect(() => {
      const el = document.getElementById('circular-gallery-touch');
      if (!el) return;

      const onTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isDraggingH.current = null;
        lastRotation.current = rotation;
      };

      const onTouchMove = (e: TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const dx = e.touches[0].clientX - touchStartX.current;
        const dy = e.touches[0].clientY - touchStartY.current;

        if (isDraggingH.current === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
          isDraggingH.current = Math.abs(dx) > Math.abs(dy);
        }

        if (isDraggingH.current) {
          e.preventDefault();
          const delta = (dx / window.innerWidth) * 180;
          setRotation(lastRotation.current - delta);
          setIsDragging(true);
        }
      };

      const onTouchEnd = () => {
        touchStartX.current = null;
        touchStartY.current = null;
        isDraggingH.current = null;
        setIsDragging(false);
      };

      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchmove', onTouchMove, { passive: false });
      el.addEventListener('touchend', onTouchEnd);

      return () => {
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
      };
    }, [rotation]);

    // --- Auto-rotate when idle ---
    useEffect(() => {
      const autoRotate = () => {
        if (!isDragging) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isDragging, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        id="circular-gallery-touch"
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        {...props}
      >
        {centerContent && (
          <div
            className="absolute pointer-events-none select-none"
            style={{ transform: 'translateZ(0px)' }}
          >
            {centerContent}
          </div>
        )}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute w-[300px] h-[400px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-200px',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
