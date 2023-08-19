import React from 'react'
import { Input } from '../Input'
import styles from './CheckCandidate.module.css'

export interface CheckCandidateProps extends React.HTMLAttributes<HTMLDivElement> {
}
export const CheckCandidate = ({  }: CheckCandidateProps) => {
  return (
    <>
      <div className={styles.root}>
        <span className={styles.elect}>Elected</span>
        <Input type='radio' onChange={()=>{}} checked={true} name='' id='' />
      </div>
    </>
  )
}
