import { useQuery } from '@tanstack/react-query'

import { fetchFromTMDB } from '@utils/helpers'

type UseAxiosQuery = (
  key: string,
  url: string
) => { data: any; isLoading: boolean; isError: boolean; error: any; refetch: () => void }

const useAxiosQuery: UseAxiosQuery = (key, url) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const data = await fetchFromTMDB(url)
      return data
    }
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export default useAxiosQuery
