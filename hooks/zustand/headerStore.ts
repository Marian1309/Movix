import { create } from 'zustand'

interface Search {
  show: 'top' | 'show' | 'hide'
  setShow: (show: 'top' | 'show' | 'hide') => void
  lastScrollY: number
  setLastScrollY: (lastScrollY: number) => void
  mobileMenu: boolean
  setMobileMenu: (mobileMenu: boolean) => void
  query: string
  setQuery: (query: string) => void
  showSearch: boolean
  setShowSearch: (showSearch: boolean) => void
}

const useSearchStore = create<Search>((set) => {
  return {
    show: 'top',
    setShow: (show) => set({ show }),
    lastScrollY: 0,
    setLastScrollY: (lastScrollY) => set({ lastScrollY }),
    mobileMenu: false,
    setMobileMenu: (mobileMenu) => set({ mobileMenu }),
    query: '',
    setQuery: (query) => set({ query }),
    showSearch: false,
    setShowSearch: (showSearch) => set({ showSearch })
  }
})

export default useSearchStore
