import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Petals - Beautiful CSS Grid Maker",
  description: "Create beautiful CSS grids without touching code",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${space.variable} ${space.variable} font-['Space_Grotesk'] antialiased`}>
      <body
        // className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
