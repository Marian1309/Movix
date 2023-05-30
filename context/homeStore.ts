import { create } from 'zustand'

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
  }
  // genres: {}
  getApiConfiguration: (payload: any) => void
  // getGenres: () => void
}

const useHomeStore = create<Home>((set) => {
  return {
    url: {},
    getApiConfiguration: (payload) => set(() => ({ url: payload }))
  }
})

export default useHomeStore
