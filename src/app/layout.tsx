import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/components/provider";
import TRPCProvider from "./api/_trpc/Provider";
import { SiteHeader } from "@/components/site-header";
import dynamic from 'next/dynamic'
import { Toaster } from "@/components/ui/toaster";
import { cn} from "@/lib/utils";
import { siteConfig } from "@/lib/config";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}-Students best research tool`,
    template: `%s - ${siteConfig.name}-Students best research tool`,
  },
  description: siteConfig.description,
  keywords: ["chat with pdf", 'chat with docs', 'chat with documents', 'chat pdf ai', 'chat ai'],
  authors: [
    {
      name: "ChatPaperz",
      url: "https://www.chatpaperz.com/",
    },
  ],
  creator:  "Jack",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@jack",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {

  const CrispWithNoSSR = dynamic(
    () => import('../components/crisp')
  )

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy',
            inter.className
          )}>
        <CrispWithNoSSR />
          <Provider>
           <TRPCProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex-col">
   <SiteHeader />
      <div className="flex flex-1">
              {children}
              </div>
              </div>
              <Toaster />
            </ThemeProvider>
            </TRPCProvider> 
          </Provider>
        </body>
      </html>
    </>
  );
}
