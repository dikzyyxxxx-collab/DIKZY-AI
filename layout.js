import "./globals.css";
import TapEffect from "../components/TapEffect";

export const metadata = {
  title: "Dikzy AI",
  description: "Dikzy AI — Asisten AI dengan 3 tipe pemikiran, bergaya komik.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TapEffect />
        {children}
      </body>
    </html>
  );
}
