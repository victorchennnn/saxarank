import { FreshContext } from "$fresh/server.ts";
import { getSupabaseClient } from "../../util/supabase.ts";

const ALLOWED_REQUESTS_PER_HOUR = 3000;
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

export const handler = async (
  _req: Request,
  ctx: FreshContext,
): Promise<Response> => {
  const ip = ctx.remoteAddr.hostname;
  const supabase = getSupabaseClient();
  const oneHourAgo = new Date(Date.now() - ONE_HOUR_IN_MILLISECONDS).toISOString();

  // ** OPTIMIZATION: Run Rate Limit check and Matchup query in parallel ** //
  const [rateLimitResult, matchupResult] = await Promise.all([
    supabase.from("battle_tokens")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", oneHourAgo),
    supabase.from("get_matchup").select(),
  ]);

  // Check Rate Limit Errors
  if (rateLimitResult.error) {
    return new Response(rateLimitResult.error.message, { status: 500 });
  }
  if (rateLimitResult.count === null) {
    return new Response("Couldn't retrieve request count", { status: 500 });
  }
  if (rateLimitResult.count >= ALLOWED_REQUESTS_PER_HOUR) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  // Check Matchup Errors
  if (matchupResult.error) {
    return new Response(matchupResult.error.message, { status: 500 });
  }
  const data = matchupResult.data;
  if (!data || data.length < 2) {
    return new Response("No matchup data found", { status: 404 });
  }

  const token = crypto.randomUUID();
  const { error: _create_token_error } = await supabase.from("battle_tokens")
    .insert({
      token,
      club_1: data[0].id,
      club_2: data[1].id,
      ip,
    });

  return new Response(JSON.stringify({ data, token }), { status: 200 });
};
