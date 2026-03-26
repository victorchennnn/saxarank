// This file is meant to be used server-side

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let devClient: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (Deno.env.get("SAXARANK_DEV") === undefined) {
    // PROD
    return createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
  } else {
    // DEV
    if (devClient === null) {
      devClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
      );
    }
    return devClient;
  }
};
