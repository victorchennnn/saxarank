import { FreshContext } from "$fresh/server.ts";
import { getSupabaseClient } from "../../util/supabase.ts";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ALLOWED_PER_DAY = 1;

export const handler = async (
  req: Request,
  ctx: FreshContext,
): Promise<Response> => {
  try {
    const { name, website } = await req.json();
    const ip = ctx.remoteAddr.hostname;
    const supabase = getSupabaseClient();

    // Check rate limit
    const { count, error: countError } = await supabase.from("club_submissions")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", (new Date(Date.now() - ONE_DAY_IN_MILLISECONDS)).toISOString());

    if (countError) throw countError;
    if (count !== null && count >= ALLOWED_PER_DAY) {
      return new Response(JSON.stringify({ error: "you can only submit one club request a day." }), {
        status: 429,
      });
    }

    const { error } = await supabase.from("club_submissions").insert({
      name,
      website,
      ip,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ error: null }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
