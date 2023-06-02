import type { FC } from 'react'

import type { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

import { ContentWrapper } from '@components/common'

import styles from './Footer.module.scss'

const Footer: FC = () => {
  const menuItems: { title: string }[] = [
    { title: 'Terms Of Use' },
    { title: 'Privacy-Policy' },
    { title: 'About' },
    { title: 'Blog' },
    { title: 'FAQ' }
  ]

  const socialIcons: { icon: IconType }[] = [
    { icon: FaFacebookF },
    { icon: FaInstagram },
    { icon: FaTwitter },
    { icon: FaLinkedin }
  ]

  return (
    <footer className={styles.footer}>
      <ContentWrapper>
        <ul className={styles.menuItems}>
          {menuItems.map(({ title }, index) => (
            <li className={styles.menuItem} key={index}>
              {title}
            </li>
          ))}
        </ul>

        <div className={styles.infoText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.
        </div>

        <div className={styles.socialIcons}>
          {socialIcons.map(({ icon: Icon }, index) => (
            <span className={styles.icon} key={index}>
              <Icon />
            </span>
          ))}
        </div>
      </ContentWrapper>
    </footer>
  )
}

export default Footer
