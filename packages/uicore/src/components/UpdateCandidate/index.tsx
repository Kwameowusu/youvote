import React from 'react'
import styles from './UpdateCandidate.module.css'
import { ElectCard } from '../ElectCard'

type ACandidateType = {
  id: string
  name: string
  portfolio: string
  profileUrl: string
  fuid: string
}

interface UpdateCandidateProps extends React.HTMLAttributes<HTMLDivElement> {
  AllCandidates: ACandidateType[]
  handleEdit: (aCandidate: ACandidateType) => void
  handleDelete: (aCandidateType: ACandidateType) => void
  portfolioList: {
    id: string
    name: string
    fuid: string
  }[]
}
export const UpdateCandidate = ({ AllCandidates, handleEdit, handleDelete, portfolioList, ...props }: UpdateCandidateProps) => {
  return (
    <>
      <div className={styles.root} {...props} >
        <span className={styles.heading}> All Candidates </span>
        <div className={styles.wrapper}>
          {
            Array.isArray(AllCandidates) && AllCandidates.length ?
              portfolioList.map((portfolio, index) => {
                return (
                  <div key={index} className={styles.container} >
                    <span className={styles.subHeading} >{portfolio.name}</span>
                    {
                      AllCandidates?.map((candidate,index) => (
                        candidate.portfolio === portfolio.name &&
                        <React.Fragment key={index} >
                            <ElectCard
                              profileUrl={candidate.profileUrl}
                              handleEdit={() => handleEdit!(candidate)}
                              handleDelete={() => handleDelete!(candidate)}
                              isEdit={true}
                              name={candidate.name}
                            // portfolio={candidate.portfolio}
                            />
                        </React.Fragment>
                       
                      )
                      )


                    }

                  </div>
                )
              })
              : null

          }
        </div>
      </div>
    </>
  )
}

UpdateCandidate.dispayName = "UpdateCandidate"