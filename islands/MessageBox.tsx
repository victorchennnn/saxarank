import { useState } from "preact/hooks";

export function MessageBox() {
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitMessage = async () => {
    if (message === "") {
      setError("message can't be empty.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessageSent(true);
    } else {
      setError(data.error ?? "couldn't send message.");
    }

    setLoading(false);
  };

  return (
    messageSent ? <p class="font-semibold mt-10">message sent.</p> : (
      <div class="flex flex-col w-full max-w-md">
        <textarea
          class="px-3 py-2 mt-10 mb-3 rounded-xl font-semibold min-h-[150px] max-h-[50vh] bg-background border border-foreground hover:border-secondary placeholder-secondary"
          value={message}
          placeholder="leave a message..."
          maxlength={511}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
        <div class="flex justify-center">
          <button
            disabled={loading}
            class="w-32 font-semibold hover:text-secondary hover:border-secondary rounded-xl border border-foreground px-4 py-2 transition-all active:scale-95"
            type="submit"
            onClick={submitMessage}
          >
            {loading ? "loading..." : "send"}
          </button>
        </div>
        <p class="text-red font-semibold h-4 mt-2 text-sm text-center">{error}</p>
      </div>
    )
  );
}
