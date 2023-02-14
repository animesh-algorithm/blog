import { Ubuntu } from "@next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700", "300", "500"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
});

export default ubuntu;
