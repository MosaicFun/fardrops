'use client'

import { kv } from "@vercel/kv"
import { sql } from "@vercel/postgres";
import { useState, useEffect } from 'react'
import { useUpdateEffect } from "usehooks-ts";
import CampaignTitle from "@/components/ui/campaign-title-form";
import CoverPhotoUpload from "@/components/ui/cover-photo-form";
import NftInfo from "@/components/ui/artwork-well";
import AllowlistTable from "@/components/allowedlist-table";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";

export default function NewCampaignForm() {
    const [loading, setLoading] = useState<boolean>(true)
    const [campaign, setCampaign] = useState<any>()
    const [nft, setNft] = useState<any>()
    const router = useRouter();
    const searchParams = useSearchParams();

    const getData = async (user_id: string|null, campaign_id: string|null) => {
        //const existing_people: any = await kv.get("allowed_list") ?? []
        const { rows } = await sql`
          SELECT * FROM campaigns WHERE user_id = ${user_id} AND campaign_id = ${campaign_id};
        `;
        if (rows) {
            setCampaign({ data: rows })
            setLoading(false)
        }
        const nft_info = await kv.get(`${campaign_id}_nft_artwork`)
        if ( nft_info) {
            setNft(nft_info)
        }
      }

      useEffect(() => {
        setLoading(true)
        if (searchParams && searchParams.get('id')) {
            getData(searchParams.get('user_id'), searchParams.get('id'))
        }
      }, []);
   

  return (
      <>
      <h3 className="font-bold text-emerald-700">New Campaign, type a name and save to continue...</h3>
      <CampaignTitle />
      </>
  )
 
}