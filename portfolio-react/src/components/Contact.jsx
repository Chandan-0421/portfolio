import { useState } from 'react';
import { PROFILE } from '../data';
import { GithubIcon, LinkedInIcon, MailIcon } from './Icons';
import Toast, { useToast } from './Toast';

// Web3Forms access keys are public by design. Prefer the env var; restrict the key
// to your domain in the Web3Forms dashboard so it can't be reused elsewhere.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '784bf8b7-00c4-4bf2-9e07-e76577e55764';

const cubeSize = 'cube-wrapper w-full sm:w-[calc(50%-0.5rem)] lg:w-[150px]';

function CubeLink({ href, icon, label, backLabel, backClass, external = true }) {
  return (
    <a
      href={href}
      className={cubeSize}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className="cube">
        <div className="cube-face cube-front">
          {icon}
          {label}
        </div>
        <div className={`cube-face cube-bottom ${backClass}`}>{backLabel}</div>
      </div>
    </a>
  );
}

const fieldLabel = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2';
const fieldInput = 'glass-input w-full px-4 py-3 rounded-xl text-base sm:text-sm';

export default function Contact() {
  const [sending, setSending] = useState(false);
  const { toast, show } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // grab before the first await
    setSending(true);

    const data = new FormData(form);
    data.append('access_key', ACCESS_KEY);
    data.append('subject', `💼 New Message from Portfolio: ${data.get('name')}`);
    data.append('from_name', "Chandan's Portfolio Notification");

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        show('Message sent successfully!', 'success');
        form.reset();
      } else {
        show(`Error: ${json.message}`, 'error');
      }
    } catch (err) {
      console.error(err);
      show('Network error. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 relative w-full bg-transparent">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start text-left">
        <div>
          <span className="reveal reveal-left inline-block px-3 py-1.5 mb-5 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-indigo-600 dark:text-indigo-400 border border-indigo-600/30 dark:border-indigo-400/30 rounded-full bg-indigo-500/5 uppercase">
            What's Next?
          </span>
          <h2 className="reveal reveal-left delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-5 sm:mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Touch.
            </span>
          </h2>
          <p className="reveal reveal-left delay-200 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-8 sm:mb-12">
            I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to
            say hi, I'll try my best to get back to you!
          </p>

          <div className="reveal reveal-up delay-300 mt-8 flex flex-wrap gap-3 sm:gap-4">
            <CubeLink
              href={PROFILE.linkedin}
              icon={<LinkedInIcon />}
              label="LinkedIn"
              backLabel="Connect →"
              backClass="linkedin"
            />
            <CubeLink
              href={PROFILE.github}
              icon={<GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="GitHub"
              backLabel="View Profile →"
              backClass="github"
            />
            <CubeLink
              href={`mailto:${PROFILE.email}`}
              icon={<MailIcon />}
              label="Email"
              backLabel="Say Hi 👋"
              backClass="email"
              external={false}
            />
          </div>
        </div>

        <div className="reveal reveal-scale delay-200 p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 shadow-2xl dark:shadow-none w-full mt-8 lg:mt-0">
          <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5">
            <div>
              <label htmlFor="contact-name" className={fieldLabel}>
                Your Name
              </label>
              <input id="contact-name" type="text" name="name" className={fieldInput} placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="contact-email" className={fieldLabel}>
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className={fieldInput}
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className={fieldLabel}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className={`${fieldInput} resize-none`}
                placeholder="Let's build something awesome..."
                required
              />
            </div>

            {/* Honeypot: real visitors never see/tick this, bots do */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              disabled={sending}
              className="glossy-cta mt-2 w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <Toast {...toast} />
    </section>
  );
}
