import { PROFILE } from '../data';

export default function Footer() {
  return (
    <footer className="pt-6 pb-28 md:py-8 text-center bg-zinc-50 dark:bg-[#050505]">
      <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm px-4">
        © {new Date().getFullYear()} {PROFILE.name}. Designed & Built with ❤️
      </p>
    </footer>
  );
}
