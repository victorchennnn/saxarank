import { useState } from "preact/hooks";

export default function HeaderIsland() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header class="relative flex items-center max-screen-w-md mx-auto justify-between h-16 min-w-[320px] w-full font-mono font-semibold z-50">
      {/* LOGO */}
      <a href="/">
        <div class="flex items-center hover:text-secondary group">
          <span class="text-xl">
            <span class="text-primary">saxarank</span>
          </span>
        </div>
      </a>

      {/* MOBILE HAMBURGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
        aria-label="Toggle Menu"
      >
        <span class={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
        <span class={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
        <span class={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>

      {/* DESKTOP MENU (HIDDEN ON MOBILE) */}
      <div class="hidden md:flex justify-end space-x-10 text-xs tracking-widest items-center">
        <a class="hover:text-secondary transition-all" href="/">battle</a>
        <a class="hover:text-secondary transition-all" href="/rankings">rankings</a>
        <a class="hover:text-secondary transition-all" href="/add">add a club</a>
      </div>

      {/* MOBILE DROPDOWN MENU (HIDDEN ON DESKTOP) */}
      <div 
        class={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 text-lg tracking-[0.2em] transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <a onClick={() => setIsOpen(false)} class="hover:text-secondary active:scale-95 transition-all" href="/">battle</a>
        <a onClick={() => setIsOpen(false)} class="hover:text-secondary active:scale-95 transition-all" href="/rankings">rankings</a>
        <a onClick={() => setIsOpen(false)} class="hover:text-secondary active:scale-95 transition-all" href="/add">add a club</a>
        <div class="pt-8 flex flex-col items-center space-y-4 text-sm opacity-60">
            <a onClick={() => setIsOpen(false)} href="/about">about</a>
            <a onClick={() => setIsOpen(false)} href="/message">leave a message</a>
        </div>
      </div>
    </header>
  );
}
