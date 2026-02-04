import "./globals.css";
import { ReactNode } from "react";
import AppProvider from "./provider";
import Header from "@/components/layout/Header";  // 追加

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="ja">
        <body>
          <Header />
          <main
            style={{ background: "#F1F3F7", width: "100%", height: "100vh" }}
          >
            <AppProvider>{children}</AppProvider>
          </main>
        </body>
      </html>
    </>
  );
}