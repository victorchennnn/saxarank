import { FreshContext } from "$fresh/server.ts";
import { BattleIsland } from "../islands/BattleIsland.tsx";

export default function Home(_req: Request, _ctx: FreshContext) {
  return (
    <>
      <div class="mt-8 mb-6 text-center w-full">
        <p class="text-2xl font-semibold italic">welcome to saxarank</p>
        <p class="text-sm font-semibold w-full md:w-3/4 mx-auto mt-2">
          which club on campus is better?
        </p>
        <p class="text-[10px] font-semibold w-full md:w-1/2 mx-auto mt-2 opacity-70">
          click on your favorite club to cast your vote.
        </p>
      </div>
      
      <div class="w-full flex justify-center">
        <BattleIsland />
      </div>
      
      <p class="text-sm font-semibold w-full md:w-1/2 mx-auto text-center mt-12 mb-8">
        {/* see the current leaderboard <a href="/rankings" class="underline hover:text-secondary transition-all">here</a>
         */}
         vote to help determine the <a href="/rankings" class="underline hover:text-secondary transition-all">hilltop hierarchy</a>.
      </p>
    </>
  );
}
