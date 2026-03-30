import { FreshContext } from "$fresh/server.ts";
import { ClubRankings } from "../islands/ClubRankings.tsx";
import { getSupabaseClient } from "../util/supabase.ts";

export default async function Home(req: Request, _ctx: FreshContext) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = userAgent.includes("Mobile");
  const searchString = isMobile
    ? ""
    : (userAgent.includes("Mac") ? " (⌘ + k)" : " (ctrl + k)");

  const supabase = getSupabaseClient();

  const { data, error } = await supabase.from("clubs").select().order(
    "elo",
    { ascending: false },
  );
  if (error) {
    return <p>Sorry, we encountered an error: {error.message}</p>;
  }

  return (
    <div class="w-full">
      <div class="text-center my-8">
        <p class="text-2xl font-semibold">the hilltop hierarchy</p>
        <p class="text-sm mt-2 font-semibold w-full md:w-3/4 mx-auto">
          which club on campus is the best?
        </p>
        <p class="text-sm font-semibold w-full md:w-3/4 mx-auto">
        rankings are updated daily and completely community-driven by head-to-head {" "}
          <a href="/battle" class="underline hover:text-primary">battles</a>
          {""} 
        </p>
        <p class="text-sm font-semibold w-full md:w-3/4 mx-auto">
          {/* we all see the results. */}
        </p>
        {/* <p class="text-[12px] italic mt-10">
        a standard elo system is used to determine the ranking of each club. 
        </p> */}
        {/* <p class="text-[10px] font-light mt-1 w-full md:w-3/4 mx-auto opacity-70 italic">
          made by your average stinky cs major
        </p> */}
      </div>
      <ClubRankings data={data} searchString={searchString} />
    </div>
  );
}
