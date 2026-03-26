import { Club, Matchup } from "../util/types.ts";
import { ClubBattleCard } from "../components/ClubBattleCard.tsx";
import { useEffect, useState } from "preact/hooks";

export function BattleIsland() {
  const [data, setData] = useState<Club[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMatchup = async () => {
    setLoading(true);

    const data: Matchup = await fetch("/api/getmatchup").then((res) =>
      res.json()
    ).catch(
      (error) => setError(error.message),
    );

    setData(data.data);
    setToken(data.token);
    setLoading(false);
  };

  const handleBattle = (
    { winner_id, loser_id }: { winner_id: number; loser_id: number },
  ) => {
    fetch("/api/battle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winner_id, loser_id, token }),
    });
    fetchMatchup();
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
