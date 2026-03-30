import { FreshContext } from "$fresh/server.ts";

export default function Battle(_req: Request, _ctx: FreshContext) {
  // Redirect to home since home is now the battle page
  return (
    <div class="text-center mt-20">
      <p>Redirecting to home...</p>
      <script dangerouslySetInnerHTML={{ __html: "window.location.href = '/';" }} />
    </div>
  );
}
