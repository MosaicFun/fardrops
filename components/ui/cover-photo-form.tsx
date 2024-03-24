'use client'

//import { kv } from "@vercel/kv"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DragAndDropUpload from '@/components/ui/draganddrop-upload';
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'


export default function CoverPhotoForm(props: any) {
  const [previewImage, setPreviewImage] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isValid, errors, touchedFields }
      } = useForm();

    const submitForm: any = async (formData: any) => {
        setLoading(true)
        //await kv.set("nft_artwork", formData)
        toast.success("Cover photo successfully uploaded!")
        router.push('/manager');
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} method="POST" className="space-y-3 divide-y divide-gray-200">

            <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-3 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="cover_photo" className="block text-lg font-bold text-gray-700 sm:pt-2">
                Cover Photo
                </label>
                <div className="sm:col-span-2 sm:mt-0">
                  <p>The image your users see on the frame. Upload an image to lets your fans know what this campaign is about. 
We recommend creating an image in 1:2 format (200px tall, 400 px wide) that includes your name or logo 
and a short description about the NFT drop.</p>
                <div>

                <button
              type="submit"
              className="mb-3 mt-3 justify-end rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Upload
            </button>

                </div>

          </div>
          <DragAndDropUpload
          title={'Business Logo'}
          hasImage={null}
          register={register}
          errors={errors}
          setValue={setValue}
        />
              </div>

      </form>
    )
  }