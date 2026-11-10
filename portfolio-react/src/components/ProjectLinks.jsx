import { ExternalIcon, GithubIcon } from './Icons';

const primary =
  'flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full transition-colors w-full sm:w-auto';

/** Renders only the links a project actually has — never a dead "#" button. */
export default function ProjectLinks({ demo, code }) {
  if (!demo && !code) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={primary}>
          <ExternalIcon />
          Visit Site
        </a>
      )}

      {code && (
        <a
          href={code}
          target="_blank"
          rel="noopener noreferrer"
          className={
            demo
              ? 'flex items-center justify-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors w-full sm:w-auto'
              : primary
          }
        >
          <GithubIcon className="w-4 h-4" />
          {demo ? 'Source Code' : 'View Source'}
        </a>
      )}
    </div>
  );
}
