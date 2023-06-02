import { useEffect, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'

import InfiniteScroll from 'react-infinite-scroll-component'

import { ICONS } from '@utils/constants'
import { fetchFromTMDB } from '@utils/helpers'

import { ContextWrapper, Spinner } from '@components/common'

import styles from './index.module.scss'

interface SearchPageProps {
  query: Object
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: query }
}

const SearchPage: NextPage<SearchPageProps> = ({ query }) => {
  const [data, setData] = useState<any | null>(null)
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
  }

  useEffect(() => {
    fetchInitialData()
  }, [query])

  if (isLoading) {
    return <Spinner initial />
  }

  return (
    <div className={styles.searchResultsPage}>
      <ContextWrapper>
        {data?.results.length > 0 ? (
          <>
            <div className={styles.pageTitle}>
              {`Search ${data.total_results > 1 ? 'results' : 'result'} of ${query}`}
            </div>
          </>
        ) : (
          <span className={styles.resultNotFound}>Sorry, Results not found!</span>
        )}
      </ContextWrapper>
    </div>
  )
}

export default SearchPage
