export default function About() {
  return (
    <div class="w-2/3 mx-auto text-center">
      <p class="font-semibold mt-16">hello chat.</p>
      <p class="font-semibold mt-10">
        we already know how competitive clubs are on campus. but does that truly
        mean they're the best? let's see :)
      </p>
      <p class="font-semibold mt-10">
        rankings are determined by head-to-head{" "}
        <a href="/" class="underline hover:text-primary">
          battles
        </a>{" "}
        between clubs. in these battles, i display two random clubs and ask you
        to choose which is better.
      </p>
      <p class="font-semibold mt-10">
        you should make this decision based upon your own perspective. there's
        no right answer. look deep into your soul.
      </p>
      <p class="mt-10 font-semibold">best, a bored stinky cs major on campus</p>
      <p class="text-[12px] italic mt-16">
        each club has an{" "}
        <a
          href="https://en.wikipedia.org/wiki/Elo_rating_system"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
        >
          elo rating 
        </a>{" "}
        which is used to determine rankings.
      </p>
      <p class="text-[10px] italic mt-2 text-gray-400 whitespace-nowrap overflow-hidden">
        the purpose of this project is only fun. please don't take anything too
        seriously.
      </p>
    </div>
  );
}
