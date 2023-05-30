import type { FC } from 'react'
import { useState } from 'react'

import clsx from 'clsx'

import styles from './SwitchTabs.module.scss'

interface SwitchTabsProps {
  data: string[]
  onTabChange: (tab: string) => void
}

const SwitchTabs: FC<SwitchTabsProps> = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [left, setLeft] = useState(0)

  const activeTab = (tab: string, i: number) => {
    setLeft(i * 100)
    setTimeout(() => {
      setSelectedTab(i)
    }, 300)
    onTabChange(tab)
  }

  return (
    <div className={styles.switchingTabs}>
      <div className={styles.tabItems}>
        {data.map((tab, i) => (
          <span
            className={clsx(styles.tabItem, selectedTab === i && styles.active)}
            key={i}
            onClick={() => activeTab(tab, i)}
          >
            {tab}
          </span>
        ))}

        <span className={styles.movingBg} style={{ left }} />
      </div>
    </div>
  )
}

export default SwitchTabs
