import { FreshContext } from "$fresh/server.ts";
import { BattleIsland } from "../islands/BattleIsland.tsx";

export default function Battle(_req: Request, _ctx: FreshContext) {
  return (
    <>
      <div class="mt-8 mb-6 text-center w-full">
        <p class="text-2xl font-semibold">battle</p>
        <p class="text-sm font-semibold w-full md:w-1/2 mx-auto">
          which club is better? click to choose.
        </p>
        <p class="text-[10px] font-semibold w-full md:w-1/2 mx-auto">
          all battles are randomly generated.
        </p>

      </div>
      <div class="w-full flex justify-center">
        <BattleIsland />
      </div>
    </>
  );
}
