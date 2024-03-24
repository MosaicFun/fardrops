  export default function TableWithAvatar(props: any) {
    const { people, loading } = props

    if (!people || people?.message) {
      return (

        <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-6">
              Display Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Casts
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Followers
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Following
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
          <h3 className="text-gray-900 text-lg">Allowed list empty</h3>
          )}
        </td>
        </tr>
        </tbody>
        </table>
      )
    }

    return (
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-6">
              Display Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Casts
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Followers
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Following
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
          {people?.length > 0 ? people?.map((person: any) => (
            <tr key={person.user_fid}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={person.avatar} alt={`${person.username} avatar`} />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{person.display_name} <span className="text-gray-500">({person.username})</span></div>
                    <div className="text-gray-500">FID :{person.user_fid}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-900">{person.total_casts}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-900">{person.total_followers}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-900">{person.total_following}</div>
              </td>
            </tr>
          )) : (
            <tr>
            <td colSpan={4} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
              <h3 className="text-lg text-red-500">None user found, please try again using other parameters.</h3>
            </td>
            </tr>
          )}
        </tbody>)}
      </table>
    )
  }