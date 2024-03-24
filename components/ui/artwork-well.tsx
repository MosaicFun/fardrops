import Image from "next/image"
import Link from "next/link"

export default function ArtworkWell(props: any) {
  const nft_artwork: any = props?.nftinfo ?? null;
    return nft_artwork ? (
        <div className="sm:gap-2">
          <h3 className="text-lg font-bold text-gray-900">NFT Reward</h3>
          <p>Create an NFT contract on Base using our no code builder. Have an image ready to upload to include
with your NFT. We recommend creating an image in 1:1 format (200px tall, 200 px wide).</p>
          <div className="mt-5">
            <div className="rounded-md bg-slate-100 px-6 py-5 sm:flex sm:items-start sm:justify-between">
              <h4 className="sr-only">NFT Information</h4>
              <div className="sm:flex sm:items-start">
                <Image
                className="rounded-md border-2 border-gray-300"
                src={nft_artwork.thumbnailurl}
                width={72} 
                height={72}
                alt={nft_artwork.title}
                />
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <div className="text-sm font-medium text-gray-900">Contract Address: <strong>{nft_artwork.contractaddress}</strong></div>
                  <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                    <div>Chain: <strong>{nft_artwork.chain}</strong></div>
                    <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                      &middot;
                    </span>
                    <div className="mt-1 sm:mt-0">Token ID: <strong>{nft_artwork.tokenid}</strong></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                <Link
                  href="/manager/update-artwork"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
      </div>
    ) : (
      <div className="bg-slate-100 shadow-lg sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">NFT Reward</h3>
          <div className="mt-5">
            <div className="rounded-md bg-slate-100 px-6 py-5 sm:flex sm:items-start sm:justify-between">
              <h4 className="sr-only">NFT Information</h4>
              <div className="sm:flex sm:items-start">
                <h3>No NFT artwork defined</h3>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                <Link
                  href="/manager/update-artwork"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>      
    )
  }