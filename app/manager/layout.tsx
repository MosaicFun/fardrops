import Header from "@/components/header"
import Footer from "@/components/footer"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-auto w-full max-w-7xl px-4 py-4 mx-auto sm:px-6 md:py-6">
        {children}
      </main>
      <Footer />
    </>
  )
}
