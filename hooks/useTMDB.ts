import { useQuery } from '@tanstack/react-query'

import { fetchFromTMDB } from '@utils/helpers'

type Key = 'trending' | 'popular' | 'top-rated' | 'recommendations' | 'similar' | 'genre'

type UseAxiosQuery = <T>(
  key: Key,
  url: string
) => { data: T; isLoading: boolean; isError: boolean; error: any; refetch: () => void }

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
