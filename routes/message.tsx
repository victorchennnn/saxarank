import { MessageBox } from "../islands/MessageBox.tsx";

export default function Message() {
  return (
    <div>
      <div class="w-full mx-auto text-center">
        <p class="font-semibold mt-16">
          any feedback?
        </p>
      </div>
      <MessageBox />
    </div>
  );
}
