import React from 'react'
import styles from "./ElectGroup.module.css"


type ElectGroupWrapperProps = {
  children?: React.ReactNode
}

const ElectGroupWrapper = ({ children }: ElectGroupWrapperProps) => {
  return (
    <>
      <div className={styles.root}>
        <span className={styles.heading} >Final Results</span>
        <div className={styles.group} >
          {children}

        </div>
      </div>
    </>
  )
}

export default ElectGroupWrapper