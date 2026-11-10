import { ABOUT_TEXT, ACHIEVEMENTS, EDUCATION, SKILL_GROUPS } from '../data';

function SkillBar({ name, value, valueCls, barCls }) {
  return (
    <div className="mb-4 sm:mb-5 group">
      <div className="flex justify-between text-xs sm:text-sm mb-2 font-medium">
        <span className="text-zinc-700 dark:text-zinc-300">{name}</span>
        <span className={valueCls}>{value}%</span>
      </div>
      <div
        className="h-[3px] w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-full overflow-hidden"
        role="progressbar"
        aria-label={name}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full bg-gradient-to-r ${barCls} rounded-full relative`}
          style={{ width: `${value}%` }}
        >
          <div className="absolute top-0 right-0 w-10 h-full bg-white/30 blur-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="pt-10 pb-16 sm:py-20 md:py-32 relative w-full bg-transparent overflow-x-clip">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
        {/* Left column */}
        <div className="flex flex-col">
          <div className="mb-10 sm:mb-14">
            <span className="reveal reveal-left inline-block px-3 py-1.5 mb-5 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-indigo-600 dark:text-indigo-400 border border-indigo-600/30 dark:border-indigo-400/30 rounded-full bg-indigo-500/5 uppercase">
              About Me
            </span>
            <h2 className="reveal reveal-left delay-100 text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-5 sm:mb-6 leading-tight">
              The person behind <br /> the{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 text-transparent bg-clip-text">
                code.
              </span>
            </h2>
            <p className="reveal reveal-left delay-200 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed w-full">
              {ABOUT_TEXT}
            </p>
          </div>

          <div className="reveal reveal-up delay-300">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-6 sm:mb-8">
              Technical Skills
            </h3>

            {SKILL_GROUPS.map((group, gi) => (
              <div key={group.title} className={gi === 0 ? 'mb-8 sm:mb-10' : undefined}>
                <h4 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-500 mb-4 sm:mb-5 uppercase">
                  {group.title}
                </h4>
                {group.items.map((item) => (
                  <SkillBar key={item.name} {...item} valueCls={group.valueCls} barCls={group.barCls} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col lg:pl-4 mt-8 lg:mt-0">
          <h3 className="reveal reveal-right text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-6 sm:mb-8">
            Education & Achievements
          </h3>

          <div className="reveal reveal-right delay-100 relative border-l border-zinc-200 dark:border-zinc-800 ml-3 pl-6 sm:pl-8 pb-4 space-y-8 sm:space-y-10">
            {EDUCATION.map((edu) => (
              <div key={edu.title} className="relative">
                <div
                  className={`absolute -left-[29px] sm:-left-[37.5px] top-1 h-3 w-3 ${edu.dotCls} rounded-full ring-4 ring-zinc-50 dark:ring-[#050505]`}
                />
                <span className={`text-[10px] sm:text-xs font-bold ${edu.periodCls} tracking-wider`}>
                  {edu.period}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mt-1.5">{edu.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-2 sm:mb-3 mt-1">{edu.place}</p>
                <span
                  className={`inline-block text-[9px] sm:text-[10px] font-bold ${edu.badgeCls} px-2 sm:px-2.5 py-1 rounded border`}
                >
                  {edu.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-8 sm:mt-10">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.title}
                className={`reveal reveal-up ${a.delay} flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group`}
              >
                <div
                  className={`p-2 sm:p-2.5 rounded-xl ${a.iconWrap} group-hover:scale-110 transition-transform flex-shrink-0`}
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {a.paths.map((d) => (
                      <path key={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
                    ))}
                  </svg>
                </div>
                <div>
                  <h5
                    className={`text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 ${a.hover} transition-colors`}
                  >
                    {a.title}
                  </h5>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">{a.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
