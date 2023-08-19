import React from 'react'
import styles from "./ResultsModal.module.css"
import { TimesIcon } from '../../assets/IconPack';
import { ElectCard } from '../ElectCard';

export interface ResultsModalProps extends React.HTMLAttributes<HTMLDivElement> {
  candidates?: {
    name?: string
    profileUrl?: string
    votes?: string
    votePercentage?: string
  }[]
  handleClose?: () => void
  portfolio?: string
}


export const ResultsModal = React.forwardRef<HTMLDivElement, ResultsModalProps>(({ candidates, portfolio, handleClose, ...props }, ref) => {
  return (
    <>
      <div className={styles.root} ref={ref} {...props}>
        <div className={styles.container}  >
          <div className={styles.times} onClick={handleClose} >
            <TimesIcon />
          </div>
          <span className={styles.heading}>
            {
              portfolio?.charAt(0)
                ?.toUpperCase()
            }
            {portfolio?.substring(1)
              ?.toLowerCase()}
          </span>
          <div className={styles.cardContainer}>
            {
              Array.isArray(candidates) && candidates.map((candidate, index) => {
                return (
                  <ElectCard
                    style={{ color: "var(--yov-light-text-color1)" }}
                    key={index}
                    isList={true}
                    name={candidate.name}
                    profileUrl={candidate.profileUrl}
                    votes={candidate.votes}
                    votePercentage={candidate.votePercentage} />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
})
ResultsModal.displayName = 'ResultsModal';
