import { useEffect, useState } from 'react';

// Returns [activeIndex, setActiveIndex] for the section currently in view.
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = ids.indexOf(entry.target.id);
            if (index !== -1) setActive(index);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive];
}
