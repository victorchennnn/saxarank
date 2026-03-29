export const Footer = () => {
  return (
    <footer class="flex gap-6 w-full mt-28 mb-10 min-w-[320px] font-semibold text-xs tracking-widest text-foreground">
      <a class="hover:text-secondary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(200,200,200,0.8)]" href="/about">
        <p>about</p>
      </a>
      <a class="hover:text-secondary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(200,200,200,0.8)] hidden md:block" href="/message">
        <p>leave a message</p>
      </a>
      <a class="hover:text-secondary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(200,200,200,0.8)] md:hidden" href="/message">
        <p>message</p>
      </a>
    </footer>
  );
};
