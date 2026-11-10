import { useCallback, useState } from 'react';

// The saved theme is applied in index.html before first paint,
// so here we only read the current <html> class and toggle it.
export default function useTheme() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage blocked — ignore */
    }
    setDark(next);
  }, []);

  return { dark, toggle };
}
