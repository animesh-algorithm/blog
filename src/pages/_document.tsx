import { Html, Head, Main, NextScript } from "next/document";
import ubuntu from "utils/loadFonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={`
        ${ubuntu.className}
        bg-stone-200 dark:bg-zinc-900
        text-gray-900 dark:text-gray-100
      `}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
