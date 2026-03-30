import { AddClub } from "../islands/AddClub.tsx";

export default function AddPage() {
  return (
    <div class="w-full">
      <div class="text-center my-8">
        <p class="text-2xl font-semibold">add a club</p>
        <p class="text-sm mt-2 font-semibold w-full md:w-3/4 mx-auto">
          want to see your club on the hierarchy?
        </p>
        <p class="text-sm font-semibold w-full md:w-3/4 mx-auto">
          submit the name and website for review.
        </p>
      </div>
      <AddClub />
    </div>
  );
}
