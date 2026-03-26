import { Club } from "../util/types.ts";
import { ClubRankingRow } from "../components/ClubRankingRow.tsx";
import { useEffect, useRef, useState } from "preact/hooks";

function useCommandKFocus(ref: { current: HTMLInputElement | null }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [ref]);
}

export function ClubRankings(
  { data, searchString }: { data: Club[]; searchString: string },
) {
  const [selectedRanking, setSelectedRanking] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  useCommandKFocus(searchInputRef);

  const clubRankings = data
    // Generate club ranking
    ?.map((club: Club, ranking: number) => ({ club, ranking }))
    // Filter by potential search query
    .filter(({ club }) =>
      search === "" ||
      club.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <input
        ref={searchInputRef}
        class="w-full py-2 px-3 mb-2 rounded-xl font-semibold shadow-md bg-background border border-foreground hover:border-secondary placeholder-secondary"
        value={search}
        placeholder={`search${searchString}`}
        onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
      />
      <ul>
        {
          // Display either top 10 or all depending on showAll
          clubRankings.map(({ club, ranking }, index) => (
            (showAll || index < 10)
              ? (
                <ClubRankingRow
                  club={club}
                  ranking={ranking}
                  showDropdown={selectedRanking !== null &&
                    ranking === selectedRanking}
                  setSelectedRanking={setSelectedRanking}
                />
              )
              : null
          ))
        }
      </ul>
      {clubRankings.length === 0 && (
        <p class="text-center font-semibold mt-2">no clubs found</p>
      )}
      {clubRankings.length > 10 &&
        (
          <div class="w-full flex justify-center">
            <button
              type="button"
              class="w-1/3 bg-background rounded-xl py-2 mt-4 font-semibold shadow-md hover:cursor-pointer border border-foreground hover:border-secondary hover:text-secondary"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "show less" : "show more"}
            </button>
          </div>
        )}
    </>
  );
}
