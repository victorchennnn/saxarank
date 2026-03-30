import { type PageProps } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>saxarank</title>
        <link rel="icon" type="image/x-icon" href="/pixil-frame-0.png" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="ec05cf61-7e0b-47a3-bf1b-402edfd533a9"></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
        />
      </head>
      <body class="bg-background text-foreground">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center px-4">
          <Header />
          <Component />
          <Footer />
        </div>
      </body>
    </html>
  );
}
