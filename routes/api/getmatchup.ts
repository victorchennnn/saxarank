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

  // ** RATE LIMITING ** //
  const { count, error } = await supabase.from("battle_tokens")
    .select("*", { count: "exact", head: true }).eq(
      "ip",
      ip,
    ).gte(
      "created_at",
      (new Date(Date.now() - ONE_HOUR_IN_MILLISECONDS)).toISOString(),
    );
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  if (count === null) {
    return new Response("Couldn't retrieve request count", { status: 500 });
  }
  if (count >= ALLOWED_REQUESTS_PER_HOUR) {
    return new Response("Rate limit exceeded", { status: 429 });
  }
  // ** RATE LIMITING ** //

  const { data, error: get_matchup_error } = await supabase.from("get_matchup")
    .select();
  if (get_matchup_error) {
    return new Response(get_matchup_error.message, { status: 500 });
  }
  if (!data) {
    return new Response("No data found", { status: 404 });
  }

  const token = crypto.randomUUID();
  // TODO: should we do something with this error?
  const { error: _create_token_error } = await supabase.from("battle_tokens")
    .insert({
      token,
      club_1: data[0].id,
      club_2: data[1].id,
      ip,
    });

  return new Response(JSON.stringify({ data, token }), { status: 200 });
};
