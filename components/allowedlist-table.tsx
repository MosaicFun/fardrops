'use client'

import { kv } from "@vercel/kv"
import { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { usePrivy } from "@privy-io/react-auth";
import TableWithAvatar from "@/components/ui/table-avatar"
import { useEffectOnce } from "usehooks-ts";
import { useRouter } from "next/navigation";

// validation schema
const schema = yup.object().shape({
  channel: yup
  .string()
  .required('Please enter a channel'),
  fname: yup
  .string()
  .required('Please enter a farcaster account name'),
  maxfid: yup
  .number()
  .required('Please enter a maximum FID number'),
  mincasts: yup
  .number()
  .required('Please enter a minimal casts number')
});

export default function AllowedListTable(props: any) {
    const [loading, setLoading] = useState<boolean>(true)
    const [queryParams, setQueryParams] = useState<any>()
    const [people, setPeople] = useState<any>()
    //const [campaignId, setCampaignId] = useState<any>()
    const { ready, user, authenticated } = usePrivy();
    const router = useRouter();
    const campaignId = props?.campaignid;
    console.log('campaignId ', campaignId)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isValid, errors, touchedFields }
      } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const uniqueId = user?.id;

    const submitForm: any = async (formData: any) => {
      setLoading(true)
      console.log('Submit Form ', formData)

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/dune`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          user_input_channel: formData?.channel,  
          user_input_fname: formData?.fname,
          user_input_maxfid: formData?.maxfid,
          user_input_mincasts: formData?.mincasts
        }),
      })
      const people = await res.json()
      if (campaignId) {
      setPeople(people)
      await kv.set(`${campaignId}_allowed_list_params`, { 
        user_input_channel: formData?.channel,  
        user_input_fname: formData?.fname,
        user_input_maxfid: formData?.maxfid,
        user_input_mincasts: formData?.mincasts
      })
      if (people.data.length > 0) {
        try {
          await kv.set(`${campaignId}_allowed_list`, people.data)
        } catch (error) {
          setLoading(false)
        }
      }
      setLoading(false)
    }
    }

    const getData = async () => {
      if (campaignId) {
      const existing_people: any = await kv.get(`${campaignId}_allowed_list`) ?? []
      if (existing_people?.length > 0) {
        setPeople({ data: existing_people })
      }
      const query_params: any = await kv.get(`${campaignId}_allowed_list_params`) ?? null
      if (query_params !== null) {
        console.log(`${campaignId}_allowed_list_params`)
        setQueryParams(query_params)
        setValue('channel', query_params?.user_input_channel, { shouldValidate: true })
        setValue('fname', query_params?.user_input_fname, { shouldValidate: true })
        setValue('maxfid', query_params?.user_input_maxfid, { shouldValidate: true })
        setValue('mincasts', query_params?.user_input_mincasts, { shouldValidate: true })
      }
      setLoading(false)
    }
    }

    useEffect(() => {
      if (ready && !authenticated) {
        router.push("/");
      }
    }, [ready, user, authenticated]);

    useEffectOnce(() => {
      setLoading(true)
      getData()
    })

    return (
      <div className="pt-16">

        <form onSubmit={handleSubmit(submitForm)} noValidate>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Playlist</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the eligible users based on the defined criteria.
            </p>
          </div>
          {!loading ? (<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Reload query
            </button>
          </div>):null}
        </div>

        {!loading ? (
          <div className="w-full grid sm:grid-cols-2">
        <div className="grid grid-cols-6 gap-3 mt-6">
        <div className="col-span-3 sm:col-span-3 lg:col-span-6">
    <fieldset className="space-y-5">
      <legend className="sr-only">Notifications</legend>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
          follows my channel
          </label>
          <p id="comments-description" className="text-gray-500">
            Get notified when someones posts a comment on a posting.
          </p>
        </div>
      </div>
      
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="candidates"
            aria-describedby="candidates-description"
            name="candidates"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="candidates" className="font-medium text-gray-700">
          min casts in channel
          </label>
          <p id="candidates-description" className="text-gray-500">
            Get notified when a candidate applies for a job.
          </p>
        </div>
      </div>
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="offers"
            aria-describedby="offers-description"
            name="offers"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="offers" className="font-medium text-gray-700">
          follows me
          </label>
          <p id="offers-description" className="text-gray-500">
            Get notified when a candidate accepts or rejects an offer.
          </p>
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="candidates"
            aria-describedby="candidates-description"
            name="candidates"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="candidates" className="font-medium text-gray-700">
          holds my nft
          </label>
          <p id="candidates-description" className="text-gray-500">
            Get notified when a candidate applies for a job.
          </p>
        </div>
      </div>


      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="candidates"
            aria-describedby="candidates-description"
            name="candidates"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="candidates" className="font-medium text-gray-700">
          max fid
          </label>
          <p id="candidates-description" className="text-gray-500">
            Get notified when a candidate applies for a job.
          </p>
        </div>
      </div>

    </fieldset>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 mt-6">
          <div className="col-span-3 sm:col-span-3 lg:col-span-3">
            <label htmlFor="channel" className="block text-sm font-medium text-gray-700">
            Farcaster Channel URL
            </label>
            <input
              type="text"
              {...register('channel', { required: true })}

              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-3 sm:col-span-6 lg:col-span-1">
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
              FC Name
            </label>
            <input
              type="text"
              {...register('fname', { required: true })}

              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-3 sm:col-span-3 lg:col-span-1">
            <label htmlFor="maxfid" className="block text-sm font-medium text-gray-700">
              Max. FID
            </label>
            <input
              type="number"
              {...register('maxfid', { required: true })}

              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-3 sm:col-span-3 lg:col-span-1">
            <label htmlFor="mincasts" className="block text-sm font-medium text-gray-700">
              Min. Casts
            </label>
            <input
              type="number"
              {...register('mincasts', { required: true })}

              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6">
          {errors.channel && (
              <p className="text-sm text-red-500">
              {errors?.channel.message}
              </p>
          )}

          {errors.fname && (
              <p className="text-sm text-red-500">
              {errors?.fname.message}
              </p>
          )}

          {errors.maxfid && (
              <p className="text-sm text-red-500">
              {errors?.maxfid.message}
              </p>
          )}

          {errors.mincasts && (
              <p className="text-sm text-red-500">
              {errors?.mincasts.message}
              </p>
          )}
          </div>
        </div>
        </div>
        ):null}

        </form>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <TableWithAvatar people={people?.data} loading={loading} />
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }