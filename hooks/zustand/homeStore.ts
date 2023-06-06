import { create } from 'zustand'

import { fetchFromTMDB } from '@utils/helpers'

interface Home {
  url: {
    page?: number
    results?: {
      adult: boolean
      backdrop_path: string
      genre_ids: number[]
      id: number
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
    total_pages?: number
    total_results?: number
    backdrop?: string
    poster?: string
    profile?: string
  }
  genres: any[]
  getApiConfiguration: () => void
  getGenres: () => void
}

type Genre = {
  id: number
  name: string
}

const useHomeStore = create<Home>((set) => {
  return {
    url: {},
    genres: [],
    getApiConfiguration: async () => {
      const { images } = await fetchFromTMDB('/configuration')

      const original = `${images?.secure_base_url}original`

      const url = {
        backdrop: original,
        poster: original,
        profile: original
      }

      set({ url })
    },
    getGenres: async () => {
      const promises: Promise<{ genres: Genre[] }>[] = []
      const endPoints: ['tv', 'movie'] = ['tv', 'movie']
      const genres: { [id: number]: Genre }[] = []

      endPoints.forEach((endPoint) =>
        promises.push(fetchFromTMDB(`/genre/${endPoint}/list`))
      )

      const data = await Promise.all(promises)

      data.map(({ genres }) => genres?.map((genre) => (genres[genre.id] = genre)))

      set({ genres })
    }
  }
})

type HeroBanner = {
  background: string
  setBackground: (color: string) => void
  query: string
  setQuery: (query: string) => void
}

const useHeroBannerStore = create<HeroBanner>((set) => {
  return {
    background: '',
    query: '',
    setBackground: (color) => set({ background: color }),
    setQuery: (query) => set({ query })
  }
})

type SwitchTabs = {
  selectedTab: number
  setSelectedTab: (selectedTab: number) => void
  left: number
  setLeft: (left: number) => void
}

const useSwitchTabsStore = create<SwitchTabs>((set) => {
  return {
    selectedTab: 0,
    setSelectedTab: (selectedTab) => set({ selectedTab }),
    left: 0,
    setLeft: (left) => set({ left })
  }
})

export { useHomeStore, useHeroBannerStore, useSwitchTabsStore }
