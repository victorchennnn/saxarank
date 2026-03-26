import { Club } from "../util/types.ts";
import { ComponentProps } from "preact";

export const ClubBattleCard = (
  { club, ...props }:
    & { club: Club }
    & ComponentProps<"div">,
) => {
  return (
    <li
      class="flex-1 min-w-[300px] flex flex-col items-center bg-transparent transition-all active:scale-95 group"
      {...props}
    >
      <div class="w-64 h-64 flex items-center justify-center p-4">
        {club.image_url
          ? (
            <img
              src={club.image_url}
              alt={club.name}
              class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          )
          : (
            <div class="text-gray-400 text-xs italic">No photo available</div>
          )}
      </div>
      <div class="h-20 px-4 mt-2 w-full max-w-[280px] flex items-center justify-center bg-white border-2 border-foreground rounded-xl group-hover:border-secondary transition-colors shadow-sm">
        <p class="font-bold tracking-tight text-base group-hover:text-secondary transition-colors text-center leading-tight">
          {club.name}
        </p>
      </div>
    </li>
  );
};
