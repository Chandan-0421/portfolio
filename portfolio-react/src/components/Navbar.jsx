import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_LINKS, PROFILE } from '../data';
import useScrollSpy from '../hooks/useScrollSpy';
import useTheme from '../hooks/useTheme';
import { DownloadIcon, MoonIcon, SunIcon } from './Icons';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

const IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [active, setActive] = useScrollSpy(IDS);
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  const navRef = useRef(null);
  const bubbleRef = useRef(null);
  const itemRefs = useRef([]);
  const bubble = useRef({ x: 0, w: 0, index: 0, ready: false, t1: null, t2: null });

  // ---------- logo + pill: move when page is scrolled ----------
  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;
    const update = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 120);

      if (currentY <= 20) {
        accumulatedDelta = 0;
        setHeaderVisible(true);
      } else {
        accumulatedDelta += currentY - lastY;
        if (accumulatedDelta >= 8) {
          setHeaderVisible(false);
          accumulatedDelta = 0;
        } else if (accumulatedDelta <= -8) {
          setHeaderVisible(true);
          accumulatedDelta = 0;
        }
      }

      lastY = currentY;
    };
    const onResize = () => {
      setScrolled(window.scrollY > 120);
      if (window.innerWidth >= 768) setHeaderVisible(true);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ---------- desktop: sliding "bubble" behind the active link ----------
  const moveBubble = useCallback((index, snap = false) => {
    const el = bubbleRef.current;
    const item = itemRefs.current[index];
    if (!el || !item || window.innerWidth < 768) return;

    const s = bubble.current;
    const targetW = item.offsetWidth;
    const targetX = item.parentElement.offsetLeft;
    const set = (x, w) => {
      el.style.setProperty('--bubble-x', `${x}px`);
      el.style.setProperty('--bubble-width', `${w}px`);
    };

    clearTimeout(s.t1);
    clearTimeout(s.t2);

    // first paint / same item / resize → jump straight to the target
    if (!s.ready || snap || index === s.index) {
      set(targetX, targetW);
      Object.assign(s, { x: targetX, w: targetW, index, ready: true });
      return;
    }

    // moving to a different item → stretch, wobble, snap
    const movingRight = targetX > s.x;
    const stretch = Math.min(Math.abs(targetX - s.x) * 0.5, 50);
    el.classList.remove('is-snapping');

    if (movingRight) set(s.x, s.w + stretch);
    else set(s.x - stretch, s.w + stretch);

    s.t1 = setTimeout(() => {
      const wobble = targetW * 0.2;
      set(movingRight ? targetX - wobble : targetX, movingRight ? targetW + wobble : targetW);
    }, 150);

    s.t2 = setTimeout(() => {
      el.classList.add('is-snapping');
      set(targetX, targetW);
    }, 250);

    Object.assign(s, { x: targetX, w: targetW, index });
  }, []);

  useEffect(() => {
    moveBubble(active);
  }, [active, moveBubble]);

  useEffect(() => {
    const s = bubble.current;
    const onResize = () => {
      if (window.innerWidth >= 768) {
        bubbleRef.current?.classList.add('is-snapping');
        moveBubble(s.index, true);
      }
    };
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(() => moveBubble(s.index, true));
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(s.t1);
      clearTimeout(s.t2);
    };
  }, [moveBubble]);

  // ---------- desktop: spotlight glow that follows the cursor ----------
  const onNavMove = (e) => {
    const nav = navRef.current;
    const rect = nav.getBoundingClientRect();
    nav.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    nav.classList.add('is-hovered');
  };
  const onNavLeave = () => navRef.current.classList.remove('is-hovered');

  // ---------- navigation (shared by desktop + mobile) ----------
  const go = (e, index) => {
    e.preventDefault();
    setActive(index);
    document.getElementById(IDS[index])?.scrollIntoView({ behavior: 'smooth' });
  };

  const desktopLink = (isActive) =>
  `nav-item px-4 py-2 text-[14px] font-medium transition-colors duration-200 rounded-full ${
    isActive
      ? 'text-black dark:text-white'
      : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
  }`;

  return (
    <>
      {/* Fixed logo */}
      <a
        href="#home"
        id="fixed-logo"
        className={`group ${scrolled ? 'scrolled' : ''} ${headerVisible ? '' : 'mobile-header-hidden'}`}
        aria-label={`${PROFILE.name} — back to top`}
        onClick={(e) => go(e, 0)}
      >
        <div className="logo-mark flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-full w-10 h-10 shadow-lg shrink-0">
          CS
        </div>
        <div id="logo-text" className="flex flex-col justify-center">
          <span className="text-[14px] sm:text-[15px] font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight">
            {PROFILE.name}
          </span>
          <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-bold tracking-[0.1em] uppercase mt-0.5">
            {PROFILE.tagline}
          </span>
        </div>
      </a>

      {/* Desktop / tablet: sliding nav pill */}
      <header id="sliding-nav" className={scrolled ? 'scrolled' : ''}>
        <nav
          ref={navRef}
          aria-label="Main"
          className="spotlight-nav hidden md:flex items-center h-10 relative overflow-hidden rounded-full px-1"
          onMouseMove={onNavMove}
          onMouseLeave={onNavLeave}
        >
          <ul className="relative flex items-center h-full gap-1 z-10 m-0 p-0 list-none">
            <li ref={bubbleRef} className="active-bubble" aria-hidden="true" />
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} className="h-full flex items-center nav-item-container">
                <a
                  ref={(el) => (itemRefs.current[i] = el)}
                  href={`#${link.id}`}
                  className={desktopLink(i === active)}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={(e) => go(e, i)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="spotlight-layer" />
        </nav>

        <div className="flex items-center gap-2 pr-1 pl-2">
          <a
            href={PROFILE.resume}
            download={PROFILE.resumeDownloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-full hover:scale-105 transition-transform duration-300 shadow-sm ml-1"
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            Resume
          </a>

          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-all"
          >
            <MoonIcon />
            <SunIcon />
          </button>
        </div>
      </header>

      {/* Phones: theme switch (top-right) + floating icon pill (bottom) */}
      <ThemeSwitch
        dark={dark}
        onToggle={toggle}
        className={`md:hidden ${headerVisible ? '' : 'mobile-header-hidden'}`}
      />
      <MobileNav links={NAV_LINKS} active={active} onNavigate={go} />
    </>
  );
}
