export function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={small ? "h-8 w-8" : "h-11 w-11"}>
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full drop-shadow-[0_0_18px_rgba(99,91,255,.5)]">
          <defs>
            <linearGradient id="g" x1="18" y1="78" x2="84" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D5BFF" />
              <stop offset=".55" stopColor="#635BFF" />
              <stop offset="1" stopColor="#3DD9C5" />
            </linearGradient>
          </defs>
          <path d="M19 70C27 53 36 34 43 22C47 15 55 15 59 22C68 39 77 55 84 70C88 78 80 86 72 81L51 69C49 68 47 68 45 69L28 81C20 86 15 78 19 70Z" fill="url(#g)" />
          <path d="M38 63L51 56C54 54 58 55 61 57L75 68" stroke="#06101F" strokeOpacity=".42" strokeWidth="9" strokeLinecap="round" />
          <path d="M44 27C52 42 62 59 73 80" stroke="#2E1A83" strokeOpacity=".28" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>
      <span className={small ? "text-lg tracking-[.32em] font-semibold" : "text-2xl tracking-[.35em] font-semibold"}>AVAION</span>
    </div>
  );
}
