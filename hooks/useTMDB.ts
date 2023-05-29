import { useQuery } from '@tanstack/react-query'

import { fetchFromTMDB } from '@utils/helpers'

type UseAxiosQuery = (
  key: string,
  url: string
) => { data: any; isLoading: boolean; isError: boolean; error: any }

const useAxiosQuery: UseAxiosQuery = (key, url) => {
  const { data, isLoading, isError, error } = useQuery({
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
    error
  }
}

export default useAxiosQuery
