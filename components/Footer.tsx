export const Footer = () => {
  return (
    <footer class="flex gap-6 w-full mt-28 mb-10 min-w-[320px] font-semibold">
      <a class="hover:text-primary" href="/about">
        <p>about</p>
      </a>
      <a class="hover:text-primary hidden md:block" href="/message">
        <p>leave a message</p>
      </a>
      <a class="hover:text-primary md:hidden" href="/message">
        <p>message</p>
      </a>
    </footer>
  );
};
