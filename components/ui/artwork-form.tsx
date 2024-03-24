'use client'

import { kv } from "@vercel/kv"
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'
import { useSearchParams } from 'next/navigation';

// validation schema
const schema = yup.object().shape({
    title: yup
    .string()
    .min(3)
    .max(150)
    .required('Please enter a title'),
    chain: yup.string(),
    description: yup
      .string()
      .max(200),
    contractaddress: yup
      .string()
      .required('A NFT contract address is required.'),
    tokenid: yup
      .string()
      .required('Please enter nft token id'),
    thumbnailurl: yup
      .string()
      .required('A NFT thumbnail url is required.')
      .url('Please enter a VALID thumbnail url')
  });

export default function ArtworkForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [chain, setChain] = useState<string>('zora');
    const router = useRouter()
    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { isValid, errors, touchedFields }
      } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const submitForm: any = async (formData: any) => {
      if (searchParams.get('id')) {
        setLoading(true)
        const campaignId = searchParams.get('id');
        await kv.set(`${campaignId}_nft_artwork`, formData)
        toast.success("NFT information saved successfully!")
        //router.push('/manager');
        router.back();
      }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} noValidate className="mt-12 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">NFT Reward</h3>
              <p>Create an NFT contract on Base using our no code builder. Have an image ready to upload to include
with your NFT. We recommend creating an image in 1:1 format (200px tall, 200 px wide).</p>
            </div>
  
            <div className="space-y-6 sm:space-y-5">

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Title
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                        A Title is required.
                        </p>
                    )}                  
                </div>
              </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="chain" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Chain Network
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    {...register('chain', { required: true })}
                    onChange={(e) => setChain(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="zora">Zora Network</option>
                    <option value="base">Base Network</option>
                    {/*<option>Mainfold</option>
                    <option>Other</option>*/}
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="contractaddress" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Contract Address
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    {chain}:
                    </span>
                    <input
                      type="text"
                      {...register('contractaddress', { required: true })}
                      className="block w-full max-w-lg flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />                  
                  </div>
                  {errors.contractaddress && (
                        <p className="mt-1 text-sm text-red-500">
                        {errors.contractaddress.message}
                        </p>
                    )}  
                </div>
              </div>
  

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="tokenid" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Token ID
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="number"
                    {...register('tokenid', { required: true })}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                {errors.tokenid && (
                    <p className="mt-1 text-sm text-red-500">
                    A NFT token ID is required.
                    </p>
                )}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="thumbnailurl" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Thumbnail Url
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    {...register('thumbnailurl', { required: true })}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                {errors.thumbnailurl && (
                    <p className="mt-1 text-sm text-red-500">
                    {errors.thumbnailurl.message ?? 'A NFT thumbnail url is required.'}
                    </p>
                )}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Description (opcional)
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    {...register('description', { required: false })}
                    rows={3}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                  <p className="mt-2 text-sm text-gray-500">Write a few words about the nft collection.</p>
                </div>
              </div>
  
            </div>

          </div>

          {/* MORE FORM ELEMENTS HERE IF NEEDED */}

        </div>
  
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }