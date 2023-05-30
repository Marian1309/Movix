import type { FC, KeyboardEvent} from 'react';
import { useEffect } from 'react'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlMenu } from 'react-icons/sl'
import { VscChromeClose } from 'react-icons/vsc'

import { ICONS } from '@utils/constants'

import { ContextWrapper } from '@components/common'

import styles from './Header.module.scss'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [show, setShow] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.addEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide')
      } else {
        setShow('show')
      }
    } else {
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  }

  const searchQueryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length > 0) {
      router.push(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000)
    }
  }

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const navigationHandler = (type: 'movie' | 'tv') => {
    if (type === 'movie') {
      router.push('/explore/movie')
    } else {
      router.push('/explore/tv')
    }
    setMobileMenu(false)
  }

  return (
    <header
      className={clsx(styles.header, mobileMenu && styles.mobileView, styles[show])}
    >
      <ContextWrapper className='flex justify-between items-center'>
        <Link className={styles.logo} href='/'>
          <Image
            alt='logo'
            height={100}
            src={ICONS.logo}
            style={{ width: 'auto', height: 'auto' }}
            width={100}
          />
        </Link>

        <div className={styles.menuItems}>
          <li className={styles.menuItem} onClick={() => navigationHandler('movie')}>
            Movies
          </li>
          <li className={styles.menuItem} onClick={() => navigationHandler('tv')}>
            TV Shows
          </li>
          <li className={styles.menuItem}>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </div>

        <div className={styles.mobileMenuItems}>
          <HiOutlineSearch />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContextWrapper>

      {showSearch && (
        <div className={styles.searchBar}>
          <ContextWrapper>
            <div className={styles.searchInput}>
              <input
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                placeholder='Search for a movie or TV show ...'
                type='text'
              />

              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContextWrapper>
        </div>
      )}
    </header>
  )
}

export default Header
