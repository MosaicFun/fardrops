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

export default function CampaignForm() {
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

      if (!searchParams.get('id')) {
          router.push('/campaigns')
      }


      useEffect(() => {
        setLoading(true)
        if (searchParams && searchParams.get('id')) {
            getData(searchParams.get('user_id'), searchParams.get('id'))
        }
      }, []);
   

if (searchParams.get('id')) {
return (
    <>
    <CampaignTitle title={campaign?.data[0]?.name} />
    <CoverPhotoUpload campaignid={searchParams.get('id')} />
    <NftInfo nftinfo={nft ?? null} campaignid={searchParams.get('id')} />
    <AllowlistTable campaignid={searchParams.get('id')} />
    </>
)
} else {
  return <div>Campaign not found</div>
}

      
}