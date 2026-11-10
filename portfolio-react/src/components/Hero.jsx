import { useEffect, useRef } from 'react';
import { HERO_STATS, PROFILE, TECH_MARQUEE } from '../data';
import { CodeIcon, DownloadIcon } from './Icons';

/** Soft purple glow that trails the cursor (desktop only). Clipped to the hero so it can't widen the page. */
function MouseAura() {
  const ref = useRef(null);

  useEffect(() => {
    const aura = ref.current;
    const wantsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!aura || !wantsMotion || !window.matchMedia('(min-width: 768px)').matches) return undefined;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let raf;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const tick = () => {
      x += (targetX - x) * 0.05;
      y += (targetY - y) * 0.05;
      aura.style.left = `${x}px`;
      aura.style.top = `${y}px`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div ref={ref} className="mouse-aura hidden md:block" />
    </div>
  );
}

const WindowDots = () => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
  </div>
);

const cardBase =
  'absolute code-card p-5 rounded-2xl shadow-lg bg-white/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10';

function StatusBadge({ safe, url, className }) {
  return (
    <div
      className={`absolute ${className} flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-md shadow-lg text-xs font-mono ${
        safe
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
          : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${safe ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {url}
      <span className="font-sans font-semibold">{safe ? 'Safe' : 'Phishing'}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <main id="home" className="hero-container w-full relative overflow-x-clip">
      <MouseAura />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center px-5 sm:px-8 md:px-12">
        {/* Left: copy */}
        <div className="flex flex-col items-start text-left w-full min-w-0">
          <div className="reveal reveal-up px-3 py-1.5 sm:px-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-6 inline-flex items-center gap-2 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">
              Available for work
            </span>
          </div>

          <h1 className="reveal reveal-up delay-100 mb-5 font-extrabold tracking-tight text-zinc-900 dark:text-white">
            <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-zinc-500 dark:text-zinc-400 mb-2 sm:mb-3">
              Hi, I'm Chandan.
            </span>
            <span className="block text-[2.3rem] leading-[1.1] sm:text-5xl md:text-6xl xl:text-7xl text-balance">
              I build <span className="gradient-text">Intelligent Web</span> Experiences.
            </span>
          </h1>

          <p className="reveal reveal-up delay-200 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-8 leading-relaxed">
            A Full-Stack Developer & Machine Learning enthusiast. Specialized in creating secure web platforms and
            integrating NLP pipelines to solve real-world problems.
          </p>

          <div className="reveal reveal-up delay-300 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="glossy-cta px-8 py-3.5 rounded-full text-white text-[15px] font-semibold tracking-tight shadow-xl w-full sm:w-auto text-center"
            >
              Explore My Work
            </a>
            <a
              href={PROFILE.resume}
              download={PROFILE.resumeDownloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn px-8 py-3.5 rounded-full text-zinc-900 dark:text-white text-[15px] font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <DownloadIcon />
              Download Resume
            </a>
          </div>

          <dl className="reveal reveal-up delay-400 mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 w-full max-w-2xl border-t border-black/10 dark:border-white/10 pt-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                <dt className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                  {stat.label}
                </dt>
                <dd className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: floating cards (desktop only) */}
        <div
          className="reveal reveal-scale delay-200 relative hidden lg:block w-full max-w-[560px] h-[520px] mx-auto"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-purple-500/10 rounded-full blur-2xl" />

          <div className={`${cardBase} top-0 left-0 w-72 z-20 anim-float-1`}>
            <WindowDots />
            <code className="text-xs text-indigo-600 dark:text-indigo-300/90 font-mono leading-relaxed block">
              <span className="text-purple-500 dark:text-purple-400">import</span> NLP_Pipeline
              <br />
              <span className="text-blue-500 dark:text-blue-400">const</span> model = load(
              <span className="text-emerald-600 dark:text-green-300">"LLM_Engine"</span>)
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">// Processing prompt...</span>
              <br />
              await model.generateResponse()
            </code>
          </div>

          <div className={`${cardBase} bottom-0 right-0 w-64 z-10 anim-float-2`}>
            <WindowDots />
            <code className="text-xs text-blue-600 dark:text-blue-300/90 font-mono leading-relaxed block">
              app.post(<span className="text-emerald-600 dark:text-green-300">"/api/secure"</span>,
              <br />
              &nbsp;&nbsp;verifyJWT,
              <br />
              &nbsp;&nbsp;controller.initData
              <br />
              );
              <br />
              <span className="text-purple-500 dark:text-purple-400">return</span>{' '}
              <span className="text-blue-500 dark:text-blue-400">Success</span>;
            </code>
          </div>

          <StatusBadge safe={false} url="paypal-verify.ml" className="top-12 right-0 z-20 anim-float-2" />
          <StatusBadge safe url="github.com" className="top-[62%] left-0 z-20 anim-float-1" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] z-30">
            <div className="w-28 h-28 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(99,102,241,0.15)] flex items-center justify-center anim-float-3">
              <CodeIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Tech strip */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 z-10 tech-marquee" role="list" aria-label="Tech stack">
        <div className="tech-marquee__track">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => {
            const dup = i >= TECH_MARQUEE.length;
            return (
              <span
                key={`${tech}-${i}`}
                role={dup ? undefined : 'listitem'}
                aria-hidden={dup ? true : undefined}
                className={`tech-chip${dup ? ' tech-chip--dup' : ''}`}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </main>
  );
}
