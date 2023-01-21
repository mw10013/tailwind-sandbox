import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export type ContextType = {};

export const loader = (async () => {
  return json({
    data: "data",
  });
}) satisfies LoaderFunction;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Pkt Remix",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useLoaderData<typeof loader>();
  const context: ContextType = {};

  // <div> with min-h-full help register layout correctly.
  // Mimics nextjs: #__next { min-height: 100%; }

  return (
    <html lang="en" className="h-full bg-gray-50 antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col">
        <div className="min-h-full">
          <Outlet context={context} />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
