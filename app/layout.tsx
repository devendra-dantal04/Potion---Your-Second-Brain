
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "sonner";

import { ThemeProvider } from '@/components/providers/theme-provider'
import ConvexClientProvider from "@/components/providers/convex-provider"
import { ModalProvider } from '@/components/providers/modal-provider'

import './globals.css'
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Potion',
  description: 'Your goal tracker',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg"
      },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`inter.className dark:bg-[#1F1F1F]`} >
        <ConvexClientProvider >
          <EdgeStoreProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='potion-theme-2'
            >
              <ModalProvider />
              {children}
              <Toaster position="bottom-center" />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
