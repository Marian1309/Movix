import axios from 'axios'

export const BASE_URL = 'https://api.themoviedb.org/3'

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`
}

type FetchFromTMDB = (url: string, params?: any) => Promise<any>

const fetchFromTMDB: FetchFromTMDB = async (url, params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, { headers, params })
    return data
  } catch (err: any) {
    return err
  }
}

export default fetchFromTMDB
