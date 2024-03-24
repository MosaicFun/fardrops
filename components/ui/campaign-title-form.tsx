'use client'

import { kv } from "@vercel/kv"
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'

// validation schema
const schema = yup.object().shape({
  campaign_name: yup
    .string()
    .min(3)
    .max(150)
    .required('Please enter a campaign name'),
  });

export default function CampaignNameForm(props: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { isValid, errors, touchedFields }
      } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const submitForm: any = async (formData: any) => {
        setLoading(true)
        //await kv.set("nft_artwork", formData)
        toast.success("Campaign information saved successfully!")
        router.push('/manager');
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} noValidate className="space-y-3 divide-y divide-gray-200">

            <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-2 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="campaign_name" className="block text-lg font-bold text-gray-700 sm:pt-2">
                Campaign Name
                </label>
                <div className="sm:col-span-2 sm:mt-0">

                <div className="inline-flex w-3/5">

                  <input
                    type="text"
                    {...register('campaign_name', { required: true })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                    {errors.campaign_name && (
                        <p className="mt-1 text-sm text-red-500">
                        A Campaign Name is required.
                        </p>
                    )}  
                    <div className="ml-6">

<button
              type="submit"
              className="justify-end rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
            </div>

                </div>
          </div>

              </div>

      </form>
    )
  }