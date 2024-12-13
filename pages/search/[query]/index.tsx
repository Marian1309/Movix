import { useEffect, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'

import InfiniteScroll from 'react-infinite-scroll-component'

import { fetchFromTMDB } from '@utils/helpers'

import { ContentWrapper, Spinner } from '@components/common'
import { MovieCard } from '@components/screens/search'

import styles from './index.module.scss'

export const runtime = 'experimental-edge';

interface SearchPageProps {
  query: Object
}

type Data = {
  page: number
  results: {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }[]
  total_pages: number
  total_results: number
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: query }
}

const SearchPage: NextPage<SearchPageProps> = ({ query }) => {
  const [data, setData] = useState<Data | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchInitialData = async () => {
    setIsLoading(true)
    const data = await fetchFromTMDB(`/search/multi?query=${query}&page=${pageNum}`)
    setData(data)
    setPageNum((prev) => prev + 1)
    setIsLoading(false)
  }

  const fetchNextPageData = async () => {
    setIsLoading(true)
    const response = await fetchFromTMDB(`/search/multi?query=${query}&page=${pageNum}`)
    if (data?.results) {
      setData({ ...data, results: [...data.results, ...response.results] })
    } else {
      setData(response)
    }
    setPageNum((prev) => prev + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  if (isLoading || !data) {
    return <Spinner initial />
  }

  return (
    <div className={styles.searchResultsPage}>
      <ContentWrapper>
        {data?.results?.length > 0 ? (
          <>
            <div className={styles.pageTitle}>
              {`Search ${data.total_results > 1 ? 'results' : 'result'} of '${query}'`}
            </div>

            <InfiniteScroll
              className={styles.content}
              dataLength={data?.results.length}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
              next={fetchNextPageData}
            >
              {data?.results.map((item, index: number) => {
                if (item?.media_type === 'person') return

                return <MovieCard data={item} fromSearch={true} key={index} />
              })}
            </InfiniteScroll>
          </>
        ) : (
          <span className={styles.resultNotFound}>Sorry, Results not found!</span>
        )}
      </ContentWrapper>
    </div>
  )
}

export default SearchPage
