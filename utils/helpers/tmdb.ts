import axios from 'axios'

import type { FetchFromTMDB } from '@types'

const BASE_URL = 'https://api.themoviedb.org/3'

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`
}

const fetchFromTMDB: FetchFromTMDB = async (url, params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, { headers, params })
    return data
  } catch (err: any) {
    console.log(err)
    return err
  }
}

export default fetchFromTMDB
