import { FreshContext } from "$fresh/server.ts";
import { getSupabaseClient } from "../../util/supabase.ts";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ALLOWED_MESSAGES_PER_DAY = 1;

export const handler = async (
  req: Request,
  ctx: FreshContext,
): Promise<Response> => {
  const { message } = await req.json();
  const ip = ctx.remoteAddr.hostname;
  const supabase = getSupabaseClient();

  const { count, error: countError } = await supabase.from("messages")
    .select("*", { count: "exact", head: true }).eq(
      "ip",
      ip,
    ).gte(
      "created_at",
      (new Date(Date.now() - ONE_DAY_IN_MILLISECONDS)).toISOString(),
    );

  if (countError) {
    return new Response(JSON.stringify({ error: countError.message }), {
      status: 500,
    });
  }
  if (count === null) {
    return new Response(
      JSON.stringify({ error: "couldn't retrieve message count." }),
      { status: 500 },
    );
  }
  if (count >= ALLOWED_MESSAGES_PER_DAY) {
    return new Response(
      JSON.stringify({ error: "you can only send one message a day." }),
      {
        status: 429,
      },
    );
  }

  const { error } = await supabase.from("messages").insert({
    message,
    ip,
  });
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify({ error: null }), { status: 200 });
};
