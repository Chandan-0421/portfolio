import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast(duration = 3500) {
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = useCallback(
    (message, type = 'success') => {
      clearTimeout(timer.current);
      setToast({ message, type, visible: true });
      timer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), duration);
    },
    [duration]
  );

  return { toast, show };
}

export default function Toast({ message, type, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-28 right-5 md:bottom-10 md:right-10 px-6 py-4 rounded-2xl shadow-2xl font-semibold text-sm sm:text-base z-[100] transform transition-all duration-500 pointer-events-none flex items-center gap-3 text-white ${
        type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
      } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <span className="text-xl" aria-hidden="true">
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span>{message}</span>
    </div>
  );
}
