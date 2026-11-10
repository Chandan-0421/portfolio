import { useState } from 'react';

/* ---------- fallback "screens" used until a real screenshot exists ---------- */

function DetectionLog({ items, compact }) {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-4 sm:p-6 font-mono overflow-hidden">
      <div className="text-[9px] sm:text-[10px] text-zinc-500 mb-4 tracking-widest uppercase font-bold">
        Detection Log
      </div>
      <ul className={`${compact ? 'space-y-2 text-[9px]' : 'space-y-3 sm:space-y-4 text-[10px] sm:text-sm'}`}>
        {items.map(({ url, safe }) => (
          <li key={url} className="flex items-center gap-2 sm:gap-3">
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
                safe
                  ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                  : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
              }`}
            />
            <span className="text-zinc-300 truncate">{url}</span>
            <span className="sr-only">{safe ? 'safe' : 'phishing'}</span>
            {safe && (
              <span aria-hidden="true" className="text-emerald-500 ml-auto font-sans">
                ✓
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockScreen({ project, compact }) {
  if (project.preview === 'detection-log') {
    return <DetectionLog items={project.detectionLog} compact={compact} />;
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 sm:p-6 flex flex-col gap-3 overflow-hidden">
      <div className="h-1.5 w-12 rounded-full bg-white/15" />
      <div
        className={`${
          compact ? 'text-[11px]' : 'text-base sm:text-xl'
        } font-black text-white uppercase tracking-wide leading-tight`}
      >
        {project.title}
      </div>
      <div className="space-y-2 mt-1">
        <div className="h-1.5 w-full rounded-full bg-white/10" />
        <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
        <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
      </div>
      <div className={`mt-auto grid ${compact ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
        <div className="h-10 sm:h-14 rounded-lg bg-white/[0.06] border border-white/10" />
        <div className="h-10 sm:h-14 rounded-lg bg-white/[0.06] border border-white/10" />
        {!compact && <div className="h-10 sm:h-14 rounded-lg bg-white/[0.06] border border-white/10" />}
      </div>
    </div>
  );
}

/** Shows the screenshot; if the file is missing, falls back to the mock screen. */
function Screen({ src, alt, project, compact }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <MockScreen project={project} compact={compact} />;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable="false"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

/* ---------- card shell (turns into a link when the project has one) ---------- */

function MediaCard({ project, className = '', decorative = false, children }) {
  const href = project.demo || project.code;
  const base = `relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${project.accentBg} shadow-xl dark:shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 ${className}`;

  if (!href) return <div className={base}>{children}</div>;

  const label = project.demo ? 'Visit site' : 'View code';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-label={label.toUpperCase()}
      className={`${base} block hover:-translate-y-1`}
      {...(decorative
        ? { 'aria-hidden': true, tabIndex: -1 }
        : { 'aria-label': `${label}: ${project.title}` })}
    >
      {children}
    </a>
  );
}

function hostOf(url, fallback) {
  try {
    return new URL(url).hostname;
  } catch {
    return fallback;
  }
}

export default function ProjectMedia({ project }) {
  const href = project.demo || project.code;
  const host = href ? hostOf(href, project.slug) : project.slug;
  const cardHeight = 'h-56 sm:h-80 lg:h-[420px]';

  return (
    <div className="reveal reveal-up grid grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
      {/* phone */}
      <MediaCard
        project={project}
        decorative
        className={`col-span-2 ${cardHeight} flex items-end justify-center px-3 pt-8 sm:px-5`}
      >
        <div className="relative w-[78%] max-w-[190px] aspect-[9/19] translate-y-[10%] rounded-[1.4rem] sm:rounded-[1.8rem] border-[4px] sm:border-[5px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden shrink-0">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1.5 rounded-full bg-zinc-900 z-10" />
          <Screen src={project.images?.mobile} alt={`${project.title} on mobile`} project={project} compact />
        </div>
      </MediaCard>

      {/* desktop */}
      <MediaCard project={project} className={`col-span-3 ${cardHeight} p-3 sm:p-5 lg:p-6`}>
        <div className="h-full flex flex-col rounded-lg sm:rounded-xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900/90 border-b border-white/10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-400/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
            <span className="w-2 h-2 rounded-full bg-green-400/80" />
            <span className="ml-2 px-3 py-0.5 rounded-md bg-white/5 text-[9px] sm:text-[10px] text-zinc-400 truncate">
              {host}
            </span>
          </div>
          <div className="relative flex-1 min-h-0">
            <Screen src={project.images?.desktop} alt={`${project.title} on desktop`} project={project} />
          </div>
        </div>
      </MediaCard>
    </div>
  );
}
