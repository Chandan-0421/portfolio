import ProjectLinks from './ProjectLinks';

/**
 * Text side of a project: title, description, highlights, tech chips, links.
 * `animate` makes the children fade up one after another (used by the sticky panel
 * which is re-mounted with a new `key` every time the active project changes).
 */
export default function ProjectInfo({ project, animate = false }) {
  return (
    <div className={animate ? 'project-info' : undefined}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`h-[3px] w-7 rounded-full shrink-0 ${project.accentBar}`} aria-hidden="true" />
        <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          {project.title}
        </h3>
      </div>

      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 max-w-xl">
        {project.description}
      </p>

      <ul className="space-y-2.5 mb-6 max-w-xl">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
            <span className="text-indigo-500 dark:text-indigo-400 font-bold" aria-hidden="true">
              +
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-7 max-w-xl">
        {project.stack.map((t) => (
          <span
            key={t}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      <ProjectLinks demo={project.demo} code={project.code} />
    </div>
  );
}
