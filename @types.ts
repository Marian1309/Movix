export type Tab = 'Day' | 'Movies' | 'Week' | 'TV Shows'

export type Video = {
  id: number
  results: {
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    official: boolean
    published_at: Date
    site: string
    size: number
    type: string
  }[]
}

export type Credits = {
  id: number
  cast: {
    adult: boolean
    cast_id: number
    character: string
    credit_id: string
    gender: number
    id: number
    known_for_department: string
    name: string
    order: number
    original_name: string
    popularity: number
    profile_path: string
  }[]
  crew: {
    adult: boolean
    credit_id: number
    department: string
    gender: number
    id: number
    job: string
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }[]
}

export type Details = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null | boolean
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
