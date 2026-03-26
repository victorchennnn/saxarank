import { useState } from "preact/hooks";

export function AddClub() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: Event) => {
    e.preventDefault();
    if (!name) return setError("Club name is required.");
    
    setLoading(true);
    setError("");

    const res = await fetch("/api/add-club", {
      method: "POST",
      body: JSON.stringify({ name, website }),
    });

    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div class="flex flex-col w-full max-w-md mt-10">
        <p class="font-semibold">submission received.</p>
        <button 
          onClick={() => { setSent(false); setName(""); setWebsite(""); }}
          class="mt-6 text-xs underline font-semibold hover:text-secondary text-left w-max"
        >
          submit another
        </button>
      </div>
    );
  }

  return (
    <div class="flex flex-col w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="club name..."
        class="px-3 py-2 mt-2 mb-3 rounded-xl font-semibold bg-background border border-foreground hover:border-secondary placeholder-secondary outline-none"
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
      />

      <input
        type="text"
        placeholder="website (optional)..."
        class="px-3 py-2 mb-3 rounded-xl font-semibold bg-background border border-foreground hover:border-secondary placeholder-secondary outline-none"
        value={website}
        onInput={(e) => setWebsite(e.currentTarget.value)}
      />

      <div class="flex justify-center">
        <button
          disabled={loading}
          class="w-48 font-semibold hover:text-secondary hover:border-secondary rounded-xl border border-foreground px-4 py-2 transition-all active:scale-95"
          onClick={submit}
        >
          {loading ? "loading..." : "submit request"}
        </button>
      </div>

      {error && <p class="text-red font-semibold h-4 mt-2 text-sm text-center">{error}</p>}
    </div>
  );
}
