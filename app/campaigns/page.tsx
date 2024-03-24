//import NftInfo from "@/components/ui/artwork-well";
import CampaignsTable from "@/components/campaigns-table";
//import SessionData from "@/components/session-data"
//import { auth } from "auth";

export default async function ManagerPage() {
  //const session = await auth()

  return (
    <div className="space-y-3">
      <CampaignsTable />
    </div>
  )
}
