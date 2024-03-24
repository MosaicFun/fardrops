import CampaignTitle from "@/components/ui/campaign-title-form";
import CoverPhotoUpload from "@/components/ui/cover-photo-form";
import NftInfo from "@/components/ui/artwork-well";
import AllowlistTable from "@/components/allowedlist-table";
//import SessionData from "@/components/session-data"
//import { auth } from "auth";

export default async function ManagerPage() {
  //const session = await auth()

  return (
    <div className="space-y-3">
      <CampaignTitle />
      <CoverPhotoUpload />
      <NftInfo />
      <AllowlistTable />
    </div>
  )
}
