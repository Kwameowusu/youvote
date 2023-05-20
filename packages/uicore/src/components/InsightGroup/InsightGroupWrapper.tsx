import React from 'react'
import styles from './InsightGroup.module.css'

export interface InsightGroupProps extends React.HTMLAttributes<HTMLDivElement> {

}
const InsightGroupWrapper = ({ children }: InsightGroupProps) => {
  return (
    <>
      <div className={styles.root}>
        <span className={styles.heading}>Insight</span>
        <div className={styles.group}>
          {children}
        </div>
    </div>
    </>
  )
}

export default InsightGroupWrapper