'use client'

import { useEffect } from 'react'
import { usePrivy } from "@privy-io/react-auth";
import Footer from "@/components/footer"
import Header from "@/components/header-login"
import { useRouter } from "next/navigation";
//import { auth } from "auth"

export default function Page() {
  //const session = await auth()
  const { ready, user, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    //setLoading(true)
    if (ready && authenticated) {
      router.push("/campaigns");
    }

  }, [ready, user, authenticated]);

  return (
    <>
    <Header />
    <main className="flex-auto w-full max-w-7xl px-4 py-4 mx-auto sm:px-6 md:py-6">
    <div className="flex flex-col space-y-1 text-center items-center">
      <img src="/fardrops-logo-big.png" alt="fardrops"/>
      <h1 className="text-5xl sm:text-8xl font-bold">fardrops</h1>
      <div className="pt-6 text-lg sm:text-3xl font-bold">
      the easiest way to reward your fans on farcaster
      </div>
      
    </div>
    </main>
    <Footer />
    </>
  )
}
