import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { Assistant, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import AppWrapper from "./appWrapper";
import "./globals.css";

export const metadata = {
  title: "Cre8ive 4mula",
  description:
    "Cre8ive 4mula offers bespoke web design, content management, graphic design, and website management services. Elevate your brand with our innovative, client-focused solutions. Whether you're an artist, content creator, or business, we transform your vision into creative reality.",
};

const arcade = localFont({
  src: "../public/fonts/arcade.woff2",
  variable: "--font-arcade",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      className={`${arcade.variable} ${assistant.variable} ${montserrat.variable}`}
      lang="en"
    >
      <head></head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
