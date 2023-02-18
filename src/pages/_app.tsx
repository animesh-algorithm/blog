import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "components/Header";

import { Ubuntu } from "@next/font/google";
import Footer from "components/Footer";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <main className={`${ubuntu.variable} font-sans`}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
