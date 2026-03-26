import { Club, Matchup } from "../util/types.ts";
import { ClubBattleCard } from "../components/ClubBattleCard.tsx";
import { useEffect, useState } from "preact/hooks";

export function BattleIsland() {
  const [data, setData] = useState<Club[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [nextMatchup, setNextMatchup] = useState<{ data: Club[]; token: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to call the API
  const getNextMatchupFromApi = async (): Promise<{ data: Club[]; token: string } | null> => {
    try {
      const res = await fetch("/api/getmatchup");
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (err) {
      console.error("Fetch Matchup Error:", err);
      return null;
    }
  };

  const fetchMatchup = async () => {
    // If we already have a pre-fetched matchup, use it!
    if (nextMatchup) {
      setData(nextMatchup.data);
      setToken(nextMatchup.token);
      setLoading(false);
      
      // Immediately start pre-fetching the NEXT one in the background
      getNextMatchupFromApi().then((res) => {
        if (res) setNextMatchup(res);
      });
      return;
    }

    // Fallback if no pre-fetched matchup exists (e.g., first load)
    setLoading(true);
    const res = await getNextMatchupFromApi();
    if (res) {
      setData(res.data);
      setToken(res.token);
      
      // Now pre-fetch the next one
      getNextMatchupFromApi().then((next) => {
        if (next) setNextMatchup(next);
      });
    } else {
      setError("Failed to load matchup");
    }
    setLoading(false);
  };

  const handleBattle = async (
    { winner_id, loser_id }: { winner_id: number; loser_id: number },
  ) => {
    // 1. Instantly swap to the next matchup (it's already in memory!)
    if (nextMatchup) {
      const currentToken = token;
      
      // Swap UI state immediately
      setData(nextMatchup.data);
      setToken(nextMatchup.token);
      // Reset nextMatchup so we don't reuse it
      setNextMatchup(null);

      // 2. Fire and forget the battle submission in the background
      fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winner_id, loser_id, token: currentToken }),
      }).catch(err => console.error("Battle submission failed:", err));

      // 3. Pre-fetch the NEXT next one in the background
      getNextMatchupFromApi().then((res) => {
        if (res) setNextMatchup(res);
      });
    } else {
      // Fallback if user clicks too fast before pre-fetch finishes
      setLoading(true);
      await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winner_id, loser_id, token }),
      });
      await fetchMatchup();
    }
  };

  const getBattleHtml = (loading: boolean, data: Club[]) => {
    if (loading) {
      return (
        <div class="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-4xl min-h-[300px]">
          <p class="font-semibold text-xl animate-pulse italic">loading matchup...</p>
        </div>
      );
    }
    if (data.length === 2) {
      return (
        <ul class="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full max-w-4xl mx-auto list-none p-0 cursor-pointer">
          <ClubBattleCard
            onClick={() =>
              handleBattle({ winner_id: data[0].id, loser_id: data[1].id })}
            club={data[0]}
          />
          <div class="flex items-center justify-center">
            <span class="text-2xl font-black italic text-gray-400">VS</span>
          </div>
          <ClubBattleCard
            onClick={() =>
              handleBattle({ winner_id: data[1].id, loser_id: data[0].id })}
            club={data[1]}
          />
        </ul>
      );
    }
    return <p>sorry, we couldn't find a matchup</p>;
  };

  useEffect(() => {
    fetchMatchup();
  }, []);

  if (error) {
    return <p>sorry, we encountered an error: {error}</p>;
  }

  return (
    <div class="w-full flex flex-col items-center min-h-[400px] mb-4">
      <button
        type="button"
        class="font-bold mt-1 mb-8 hover:text-secondary  tracking-[0.2em] transition-all active:scale-95 underline underline-offset-4 decoration-1"
        onClick={fetchMatchup}
      >
        skip
      </button>
      {getBattleHtml(loading, data)}
    </div>
  );
}
