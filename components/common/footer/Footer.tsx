import type { FC } from 'react'

import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

import { ContextWrapper } from '@components/common'

import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <ContextWrapper>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>Terms Of Use</li>
          <li className={styles.menuItem}>Privacy-Policy</li>
          <li className={styles.menuItem}>About</li>
          <li className={styles.menuItem}>Blog</li>
          <li className={styles.menuItem}>FAQ</li>
        </ul>

        <div className={styles.infoText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.
        </div>
        <div className={styles.socialIcons}>
          <span className={styles.icon}>
            <FaFacebookF />
          </span>
          <span className={styles.icon}>
            <FaInstagram />
          </span>
          <span className={styles.icon}>
            <FaTwitter />
          </span>
          <span className={styles.icon}>
            <FaLinkedin />
          </span>
        </div>
      </ContextWrapper>
    </footer>
  )
}

export default Footer
