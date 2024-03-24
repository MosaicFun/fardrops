'use client'

import { kv } from "@vercel/kv"
import { sql } from "@vercel/postgres";
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { usePrivy } from "@privy-io/react-auth";
import TableWithCampaigns from "@/components/ui/table-campaign"
import { useUpdateEffect } from "usehooks-ts";
import { useRouter } from "next/navigation";

export default function CampaignsTable() {
    const [loading, setLoading] = useState<boolean>(true)
    const [queryParams, setQueryParams] = useState<any>()
    const [campaigns, setCampaigns] = useState<any>()
    const { ready, user, authenticated } = usePrivy();
    const router = useRouter();

    const getData = async (user_id: string) => {
      //const existing_people: any = await kv.get("allowed_list") ?? []
      const { rows } = await sql`
        SELECT * FROM campaigns WHERE user_id = ${user_id};
      `;
      if (rows) {
        setCampaigns({ data: rows })
        setLoading(false)
      }
    }

    useEffect(() => {
      setLoading(true)
      if (ready && !authenticated) {
        router.push("/");
      }
      if (ready &&  user) {
        getData(user?.id)
      }
    }, [ready, user, authenticated]);

    useUpdateEffect(() => {
    },[campaigns])

    return (
      <div className="pt-1">

        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Campaigns</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all campaigns.
            </p>
          </div>
          {!loading ? (<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => router.push('/manager?new=true')}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              New Campaign
            </button>
          </div>):null}
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <TableWithCampaigns campaigns={campaigns?.data} loading={loading} />
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }