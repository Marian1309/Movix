import type { FC } from 'react'

import clsx from 'clsx'

import type { Tab } from '@types'

import { useSwitchTabsStore } from '@hooks/zustand'

import styles from './SwitchTabs.module.scss'

interface SwitchTabsProps {
  data: [Tab, Tab]
  onTabChange: (tab: Tab) => void
}

const SwitchTabs: FC<SwitchTabsProps> = ({ data, onTabChange }) => {
  const { left, setLeft, selectedTab, setSelectedTab } = useSwitchTabsStore()

  const activeTab = (tab: Tab, i: number) => {
    onTabChange(tab)
    setLeft(i * 100)
    setTimeout(() => {
      setSelectedTab(i)
    }, 300)
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
