import "./globals.css"
import type { Metadata } from "next"
import PrivyProviderWrapper from "@/components/privy-provider-wrapper";
import { Poppins } from "next/font/google"
import getToastOptions from '@/lib/getToastOptions'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fardrops",
  description:
    "Fardrops gives creators easy to use tools that enable them to curate rewards and airdrop them to their biggest fans",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  const resolvedTheme = 'light'
  return (
    <html lang="en">
      <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />      
      <body className={poppins.className}>
      <PrivyProviderWrapper>
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Toaster
            position="top-right"
            toastOptions={getToastOptions(resolvedTheme)}
          />          
          {children}
        </div>
        </PrivyProviderWrapper>
      </body>
    </html>
  )
}
