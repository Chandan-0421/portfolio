const Sun = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const Moon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/** Sliding sun / moon switch (used on mobile). Styling lives in index.css (.theme-switch). */
export default function ThemeSwitch({ dark, onToggle, className = '' }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={onToggle}
      className={`theme-switch ${className}`}
    >
      <Sun className="theme-switch__icon theme-switch__icon--sun" />
      <Moon className="theme-switch__icon theme-switch__icon--moon" />
      <span className="theme-switch__knob" aria-hidden="true">
        <Sun className="k-sun" />
        <Moon className="k-moon" />
      </span>
    </button>
  );
}
