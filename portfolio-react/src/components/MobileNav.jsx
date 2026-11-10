import { useCallback, useEffect, useRef } from 'react';
import { FolderIcon, HomeIcon, MailIcon, UserIcon } from './Icons';

const ICONS = {
  home: HomeIcon,
  about: UserIcon,
  projects: FolderIcon,
  contact: (props) => <MailIcon className="w-[22px] h-[22px]" {...props} />,
};

/**
 * Floating bottom pill for phones: icons only, the active section gets a sliding
 * "bubble" that grows to show its name. Active section comes from the scroll-spy.
 */
export default function MobileNav({ links, active, onNavigate }) {
  const bubbleRef = useRef(null);
  const itemRefs = useRef([]);
  const kickRef = useRef(() => {});
  const state = useRef({ x: 0, w: 0, ready: false, raf: 0, until: 0 });

  // The bubble chases the active item every frame (x and width at different speeds,
  // so it visibly stretches), until the item has finished growing.
  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return undefined;
    const s = state.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      bubble.style.transform = `translateX(${s.x}px)`;
      bubble.style.width = `${s.w}px`;
    };

    const step = () => {
      const item = itemRefs.current[active];
      if (!item) {
        s.raf = 0;
        return;
      }
      const tx = item.offsetLeft;
      const tw = item.offsetWidth;
      if (!s.ready || reduce) {
        s.x = tx;
        s.w = tw;
        s.ready = true;
      } else {
        s.x += (tx - s.x) * 0.24;
        s.w += (tw - s.w) * 0.17;
      }
      draw();
      if (performance.now() < s.until || Math.abs(tx - s.x) > 0.3 || Math.abs(tw - s.w) > 0.3) {
        s.raf = requestAnimationFrame(step);
      } else {
        s.x = tx;
        s.w = tw;
        draw();
        s.raf = 0;
      }
    };

    kickRef.current = () => {
      s.until = performance.now() + 650; // label grow/shrink transition length
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(step);
    };
    kickRef.current();
    return () => cancelAnimationFrame(s.raf);
  }, [active]);

  // re-measure on rotate / resize / once the web font has loaded
  const remeasure = useCallback(() => {
    state.current.ready = false;
    kickRef.current();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', remeasure);
    document.fonts?.ready.then(remeasure);
    return () => window.removeEventListener('resize', remeasure);
  }, [remeasure]);

  return (
    <nav className="mobile-nav md:hidden" aria-label="Main">
      <ul className="mobile-nav__list">
        <li ref={bubbleRef} className="mobile-nav__bubble" aria-hidden="true" />
        {links.map((link, i) => {
          const Icon = ICONS[link.id];
          return (
            <li key={link.id}>
              <a
                ref={(el) => (itemRefs.current[i] = el)}
                href={`#${link.id}`}
                onClick={(e) => onNavigate(e, i)}
                aria-current={i === active ? 'true' : undefined}
                className={`mobile-nav__item${i === active ? ' is-active' : ''}`}
              >
                <Icon />
                <span className="mobile-nav__label">{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
