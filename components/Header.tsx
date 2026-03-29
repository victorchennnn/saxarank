export const Header = () => {
  return (
    <header class="flex items-center max-screen-w-md mx-auto justify-between h-14 min-w-[320px] w-full font-mono font-semibold">
      <a href="/">
        <div class="flex items-center hover:text-secondary group">
          <span class="text-xl">
            <span class="text-primary ">saxarank</span>
            {/* <span class="ml-1">SaxaRank</span> */}
          </span>
        </div>
      </a>
      <div class="flex justify-right w-1/2 ml-12 text-xs tracking-widest items-center">
        <div class="flex mr-10">
          <a class="hover:text-secondary ml-1" href="/">rankings</a>
        </div>
        <div class="flex mr-10">
          <a class="hover:text-secondary ml-1" href="/battle">battle</a>
        </div>
        <div class="flex">
          <a class="hover:text-secondary ml-1" href="/add">add</a>
        </div>
      </div>
    </header>
  );
};
