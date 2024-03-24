import NewCampaignForm from "@/components/new-campaign-form";
import { Suspense } from "react"
//import SessionData from "@/components/session-data"
//import { auth } from "auth";

export default async function NewCampaignPage() {
  //const session = await auth()
  return (
    <div className="space-y-3">
      <Suspense>
      <NewCampaignForm />
      </Suspense>
    </div>
  )
}
