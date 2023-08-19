import React from 'react'
import InsightGroupWrapper from './InsightGroupWrapper';
import { InsightCard } from '../InsightCard';

export interface InsightGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  portfolios?: number
  votes?: number
  voters?: number
  isPortfolioListLoading: boolean
  isVotesLoading: boolean
  isVotersLoading: boolean
  isCandidatesLoading: boolean
  candidates?: number

}
export const InsightGroup = ({
  portfolios,
  votes,
  voters,
  isPortfolioListLoading,
  isVotesLoading,
  isVotersLoading, isCandidatesLoading, candidates }: InsightGroupProps) => {



  return (
    <InsightGroupWrapper>

      <InsightCard
        isValueLoading={isPortfolioListLoading}
        title={"Portfolio"}
        value={portfolios}
        hexColor={"#900B0B"} />
      <InsightCard
        isValueLoading={isVotesLoading}
        title={"Total votes"}
        value={votes}
        hexColor={"#1E900B"} />
      <InsightCard
        isValueLoading={isVotersLoading}
        title={"Registered voters"}
        value={voters}
        hexColor={"#0B5090"} />
      <InsightCard
        isValueLoading={isCandidatesLoading}
        title={"Registered candidates"}
        value={candidates}
        hexColor={"#453922"} />
    </InsightGroupWrapper>
  )
}

InsightGroup.displayName = 'InsightGroup';

{/* {
        Array.isArray(Insights) && Insights.length ?
          Insights?.map((element, index) => {
            return (
              <React.Fragment key={index}>
                <InsightCard
                  title={element.title}
                  value={element.value}
                  hexColor={element.hexColor} />
              </React.Fragment>
            )
          }
          ) : null
      } */}