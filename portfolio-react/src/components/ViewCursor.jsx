import { useEffect, useRef, useState } from 'react';

/**
 * Round "VISIT SITE" cursor that follows the mouse while it is over any element with
 * a `data-cursor-label` attribute inside `containerRef`. Desktop (hover + fine pointer) only.
 */
export default function ViewCursor({ containerRef }) {
  const ringRef = useRef(null);
  const [label, setLabel] = useState('VISIT SITE');

  useEffect(() => {
    const container = containerRef.current;
    const ring = ringRef.current;
    if (!container || !ring) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.2;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let shown = false;
    let lastLabel = '';

    container.classList.add('has-view-cursor');

    const tick = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = shown ? requestAnimationFrame(tick) : 0;
    };

    const setShown = (value) => {
      shown = value;
      ring.dataset.show = value ? '1' : '0';
      if (value && !raf) raf = requestAnimationFrame(tick);
    };

    const check = (el) => {
      const target = el && el.closest ? el.closest('[data-cursor-label]') : null;
      if (target && container.contains(target)) {
        const next = target.getAttribute('data-cursor-label');
        if (next !== lastLabel) {
          lastLabel = next;
          setLabel(next);
        }
        if (!shown) {
          x = tx;
          y = ty;
          setShown(true);
        }
      } else if (shown) {
        setShown(false);
      }
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      check(e.target);
    };
    // the page can scroll under a stationary mouse, so re-check on scroll too
    const onScroll = () => check(document.elementFromPoint(tx, ty));
    const onLeave = () => setShown(false);

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      container.classList.remove('has-view-cursor');
    };
  }, [containerRef]);

  const text = `${label} • ${label} • `;

  return (
    <div ref={ringRef} className="view-cursor" data-show="0" aria-hidden="true">
      <div className="view-cursor__disc">
        <svg viewBox="0 0 96 96" className="view-cursor__text absolute inset-0 w-full h-full">
          <defs>
            <path id="view-cursor-path" d="M 48,48 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
          </defs>
          <text fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="1.5">
            <textPath href="#view-cursor-path" textLength="211" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </svg>
        <svg
          className="relative w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </div>
  );
}
