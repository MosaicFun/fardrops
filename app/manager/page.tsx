import CampaignForm from "@/components/campaign-form";
import { Suspense } from "react"
//import SessionData from "@/components/session-data"
//import { auth } from "auth";

export default async function ManagerPage() {
  //const session = await auth()
  return (
    <div className="space-y-3">
      <Suspense>
      <CampaignForm />
      </Suspense>
    </div>
  )
}
