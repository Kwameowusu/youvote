
import React from 'react'
import styles from './CandidateGroup.module.css'
import { ElectCard } from '../ElectCard'
import { useVoteCandidate } from '../../libs/hooks/useVoteCandidate'

type aPortfolioType = {
  id: string;
  fuid: string;
  name: string;
};

interface CandidateGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  candidatesGroups?: {
    id: string,
    fuid: string
    name: string
    portfolio: string
    profileUrl: string,

  }[],
  portfolioList: aPortfolioType[]
  getSelectedChoice: (a: any) => void
}
export const CandidateGroup = ({
  candidatesGroups,
  getSelectedChoice,
  portfolioList,
  ...props }: CandidateGroupProps) => {
  const { VoteFunc, aCandidate } = useVoteCandidate(getSelectedChoice)


  return (
    <>
      <div className={styles.root} {...props}>
        <span className={styles.heading} >Choose your leaders</span>
        <div className={styles.container}>
          {
            Array.isArray(portfolioList) && portfolioList?.length ?
              portfolioList?.map((portfolio, index) => {
                return (
                  <div key={index}>
                    <span className={styles.portfolio} >
                      {
                        portfolio.name?.charAt(0)
                          ?.toUpperCase()
                      }
                      {portfolio.name?.substring(1)
                        ?.toLowerCase()}
                    </span>
                    <div className={styles.elect}>
                      {
                        candidatesGroups?.map((candidate, index) => (
                          candidate.portfolio === portfolio.name &&
                          <React.Fragment key={index}>
                            <ElectCard
                              name={candidate.name}
                              profileUrl={candidate.profileUrl}
                              isElect={true}
                              isVoted={aCandidate?.some((e) => e.fuid === candidate.fuid)}
                              // aCandidate={aCandidate}
                              handleVote={() => {
                                VoteFunc!({
                                  fuid: candidate.fuid as string,
                                  portfolio: candidate.portfolio as string,
                                  name: candidate.name as string,

                                })
                              }}
                            />
                          </React.Fragment>
                        )

                        )}
                    </div>
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

CandidateGroup.dispayName = "CandidateGroup"
