import { useEffect, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'

import clsx from 'clsx'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'

import { fetchFromTMDB } from '@utils/helpers'

import { useTMDB } from '@hooks'

import { ContentWrapper, Spinner } from '@components/common'
import { MovieCard } from '@components/screens/search'

import styles from './index.module.scss'

interface ExplorePageProps {
  mediaType: 'movie' | 'tv'
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      mediaType: query.mediaType
    }
  }
}

let filters: any = {}

const sortbyData = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending'
  },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'original_title.asc', label: 'Title (A-Z)' }
]

const ExplorePage: NextPage<ExplorePageProps> = ({ mediaType }) => {
  const [data, setData] = useState<any>(null)
  const [pageNum, setPageNum] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState(null)
  const [sortBy, setSortBy] = useState(null)

  const { data: genresData } = useTMDB('genre', `/genre/${mediaType}/list`) as any

  const fetchInitialData = async () => {
    setIsLoading(true)
    const response = await fetchFromTMDB(`/discover/${mediaType}`, filters)
    setData(response)
    setPageNum((prev) => prev + 1)
    setIsLoading(false)
  }

  const fetchNextPageData = async () => {
    setIsLoading(true)
    const response = await fetchFromTMDB(
      `/discover/${mediaType}?page=${pageNum}`,
      filters
    )
    if (response.results) {
      setData({ ...data, results: [...data.results, ...response.results] })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    filters = {}
    setData(null)
    setPageNum(1)
    setSortBy(null)
    setGenres(null)
    fetchInitialData()
  }, [mediaType])

  const onChange = (selectedItems: any, action: any) => {
    if (action.name === 'sortby') {
      setSortBy(selectedItems)
      if (action.action !== 'clear') {
        filters.sort_by = selectedItems.value
      } else {
        delete filters.sort_by
      }
    }

    if (action.name === 'genres') {
      setGenres(selectedItems)
      if (action.action !== 'clear') {
        let genreId = selectedItems.map((g: any) => g.id)
        genreId = JSON.stringify(genreId).slice(1, -1)
        filters.with_genres = genreId
      } else {
        delete filters.with_genres
      }
    }

    setPageNum(1)
    fetchInitialData()
  }

  if (isLoading) {
    return <Spinner initial />
  }

  return (
    <div className={styles.explorePage}>
      <ContentWrapper>
        <div className={styles.pageHeader}>
          <div className={styles.pageTitle}>
            {mediaType === 'tv' ? 'Explore TV Shows' : 'Explore Movies'}
          </div>

          <div className={clsx(styles.filters, 'text-[#04152d]')}>
            <Select
              className={clsx(styles['react-select-container'], styles.genresDD)}
              classNamePrefix='react-select'
              closeMenuOnSelect={false}
              getOptionLabel={(option: { name: string; id: number }) => option.name}
              getOptionValue={(option: { name: string; id: any }) => option.id}
              isMulti
              name='genres'
              onChange={onChange}
              options={genresData?.genres}
              placeholder='Select genres'
              value={genres}
            />
            <Select
              className={clsx(styles['react-select-container'], styles.sortbyDD)}
              classNamePrefix='react-select'
              isClearable={true}
              name='sortby'
              onChange={onChange}
              options={sortbyData}
              placeholder='Sort by'
              value={sortBy}
            />
          </div>
        </div>

        {data?.results?.length > 0 ? (
          <InfiniteScroll
            className={styles.content}
            dataLength={data.results.length}
            hasMore={pageNum <= data.total_pages}
            loader={<Spinner />}
            next={fetchNextPageData}
          >
            {data.results.map((item: any, index: number) => {
              if (item.media_type === 'person') return

              return (
                <MovieCard
                  data={item}
                  fromSearch={false}
                  key={index}
                  mediaType={mediaType}
                />
              )
            })}
          </InfiniteScroll>
        ) : (
          <span className={styles.resultNotFound}>Sorry, Results not found!</span>
        )}
      </ContentWrapper>
    </div>
  )
}

export default ExplorePage
