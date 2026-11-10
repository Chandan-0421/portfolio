import { useEffect, useRef, useState } from 'react';
import { MORE_PROJECTS_URL, PROJECTS } from '../data';
import ProjectInfo from './ProjectInfo';
import ProjectMedia from './ProjectMedia';
import ViewCursor from './ViewCursor';

export default function Projects() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const railRef = useRef(null);
  const groupRefs = useRef([]);
  const [active, setActive] = useState(0);

  // The active project is whichever group is crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    groupRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress (0 → 1) through the project list, written to a CSS variable on the rail.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      const rail = railRef.current;
      if (!list || !rail) return;
      const rect = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - rect.top) / rect.height));
      rail.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i) =>
    groupRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-24 bg-transparent"
    >
      <div className="mb-10 sm:mb-16 text-center lg:text-left">
        <h2 className="reveal reveal-up text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          Featured <span className="gradient-text">Projects</span>.
        </h2>
        <p className="reveal reveal-up delay-100 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
          Real-world applications built with modern architectures, focusing on performance, security, and
          intelligent systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-16">
        {/* LEFT (desktop): sticky panel that swaps content with the active project */}
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen flex items-center">
            <div className="relative w-full pr-12 min-h-[440px] flex items-center">
              <div key={PROJECTS[active].slug} className="w-full">
                <ProjectInfo project={PROJECTS[active]} animate />
              </div>

              {/* progress rail */}
              <div ref={railRef} className="project-rail" style={{ '--p': 0 }}>
                <div className="project-rail__track" />
                <div className="project-rail__fill" />
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${p.title}`}
                    aria-current={i === active ? 'true' : undefined}
                    className={`project-rail__tick ${i === active ? 'is-active' : ''}`}
                    style={{ top: `${((i + 0.5) / PROJECTS.length) * 100}%` }}
                  />
                ))}
                <div className="project-rail__thumb" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: screenshots. On mobile each project shows its text first, then its cards. */}
        <div ref={listRef} className="flex flex-col gap-16 lg:gap-0">
          {PROJECTS.map((project, i) => (
            <article
              key={project.slug}
              ref={(el) => (groupRefs.current[i] = el)}
              data-index={i}
              className="flex flex-col justify-center lg:min-h-[85vh] lg:py-10"
            >
              <div className="reveal reveal-up mb-6 lg:hidden">
                <ProjectInfo project={project} />
              </div>
              <ProjectMedia project={project} />
            </article>
          ))}
        </div>
      </div>

      <div className="reveal reveal-up mt-12 sm:mt-16 flex justify-center">
        <a
          href={MORE_PROJECTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn px-7 py-3 rounded-full text-sm font-medium text-zinc-900 dark:text-white inline-flex items-center gap-2"
        >
          See more projects on GitHub <span aria-hidden="true">→</span>
        </a>
      </div>

      <ViewCursor containerRef={sectionRef} />
    </section>
  );
}
