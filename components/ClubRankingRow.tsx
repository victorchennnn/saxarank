import { Club } from "../util/types.ts";
import { ComponentProps } from "preact";
import { getColorValue } from "../util/club-ranking-colors.ts";

export const ClubRankingRow = (
  { club, ranking, showDropdown, setSelectedRanking, ...props }:
    & {
      club: Club;
      ranking: number;
      showDropdown: boolean;
      setSelectedRanking: (index: number | null) => void;
    }
    & ComponentProps<"li">,
) => {
  const colorTheme = getColorValue(ranking);

  return (
    <li
      class={`${colorTheme.bg} border ${colorTheme.border} rounded-xl shadow-md px-6 md:px-20 py-5 my-2 hover:cursor-pointer relative`}
      onClick={() => setSelectedRanking(showDropdown ? null : ranking)}
      {...props}
    >
      <div class="flex flex-row justify-between font-semibold">
        <div class="flex flex-row">
          {/* Ranking is 0-indexed - i.e. 0, 1, 2 but we want 1, 2, 3 */}
          <p class={`mr-4 ${colorTheme.text}`}>{ranking + 1}</p>
          <p class={`${colorTheme.text} mr-3`}>
            {club.previous_ranking > ranking + 1
              ? (
                <div class="flex items-center">
                  <img width="20" height="20" src="/up-arrow-green.svg" />
                  <p class="text-xs text-green ml-1">
                    {club.previous_ranking - (ranking + 1)}
                  </p>
                </div>
              )
              : club.previous_ranking < ranking + 1
              ? (
                <div class="flex items-center">
                  <img
                    width="20"
                    height="20"
                    class="rotate-180"
                    src="/up-arrow-red.svg"
                  />
                  <p class="text-xs text-red ml-1">
                    {ranking + 1 - club.previous_ranking}
                  </p>
                </div>
              )
              : <img width="20" height="20" src="/horizontal-line.svg" />}
          </p>

          <p class={`${colorTheme.text}`}>{club.name}</p>
        </div>
        <p class={`${colorTheme.text}`}>
          {Math.round(club.elo)}
        </p>
      </div>
      {showDropdown && (
        <div class="mt-4 text-sm text-left flex flex-col md:flex-row gap-6 items-start">
          {club.image_url && (
            <div class="w-32 h-32 flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <img
                src={club.image_url}
                alt={club.name}
                class="w-full h-full object-contain"
              />
            </div>
          )}
          <div class="flex-1">
            {club.website
              ? (
                <a
                  href={club.website}
                  target="_blank"
                  class="block mb-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p class={`${colorTheme.text} font-bold underline`}>
                    {club.name} ↗
                  </p>
                </a>
              )
              : (
                <p class={`${colorTheme.text} font-bold mb-2`}>
                  {club.name}
                </p>
              )}
            <p class={`${colorTheme.text} font-medium mb-1 italic`}>
              {club.description}
            </p>
            <p class={`${colorTheme.text} mt-2`}>
              Elo: {Math.round(club.elo)}
            </p>
            <p class={`${colorTheme.text}`}>
              Battles played: {club.battles}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};
