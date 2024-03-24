  export default function TableWithCampaign(props: any) {
    const { campaigns, loading } = props
    console.log('loading', loading)
    console.log('campaigns', campaigns)
    /*if (campaigns) {
      return (

        <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-6">
              Campaign Name
            </th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        <tr>
        <td colSpan={4} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
          {loading ? (
            <div className="mx-auto items-center space-y-6 sm:px-6 lg:col-span-12 lg:px-0">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50">
                <svg
                  className="text-navy-300 h-20 w-20 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Querying, please wait...
                </h3>
              </div>
            </div>
            </div>
          ) : (
          <h3 className="text-gray-900 text-lg">No active campaigns</h3>
          )}
        </td>
        </tr>
        </tbody>
        </table>
      )
    }*/

    return (
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-6">
              Campaign Name
            </th>
            <th scope="col" className="py-3.5 pr-3 text-center text-sm font-bold text-gray-900">
              Published At
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              
            </th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
            <td colSpan={4} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
            <div className="mx-auto items-center space-y-6 sm:px-6 lg:col-span-12 lg:px-0">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50">
                <svg
                  className="text-navy-300 h-20 w-20 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Querying, please wait...
                </h3>
              </div>
            </div>
            </div>
            </td>
            </tr>
            </tbody>
          ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          {campaigns?.length > 0 ? campaigns?.map((campaign: any) => (
            <tr key={campaign.campaign_id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={campaign.cover_image} alt={`${campaign.name} cover`} />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{campaign.name} <span className="text-gray-500">({campaign.name})</span></div>
                    <div className="text-gray-500">{campaign.description}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-900 text-center">{campaign.published_at ?? 'Not published'}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <button
              type="button"
              className="inline-flex items-right justify-end rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Update
            </button>
            </td>
            </tr>
          )) : (
            <tr>
            <td colSpan={4} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
              <h3 className="text-lg text-red-500">No active campaigns</h3>
            </td>
            </tr>
          )}
        </tbody>
        )}
      </table>
    )
  }