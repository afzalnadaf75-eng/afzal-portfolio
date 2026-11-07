import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing physics loop
    const followLoop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationId = requestAnimationFrame(followLoop);
    };
    animationId = requestAnimationFrame(followLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${
          isHovered ? 'bg-[#42D9FF] scale-150' : 'bg-[#9B5CFF]'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isClicked ? 0.7 : 1})`,
        }}
      />

      {/* Radiant Trailing Cosmic Halo Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-200 ${
          isHovered
            ? 'w-10 h-10 border border-[#42D9FF]/70 bg-[#42D9FF]/10 shadow-[0_0_15px_rgba(66,217,255,0.4)]'
            : 'w-7 h-7 border border-[#9B5CFF]/50 bg-transparent shadow-[0_0_10px_rgba(155,92,255,0.2)]'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${isClicked ? 0.8 : 1})`,
        }}
      />
    </>
  );
};
