import NftUpdateForm from "@/components/ui/artwork-form";
import { Suspense } from "react"

export default async function NftUpdateFormPage() {
  return (
    <div className="space-y-3">
      <Suspense>
      <NftUpdateForm />
      </Suspense>
    </div>
  )
}
