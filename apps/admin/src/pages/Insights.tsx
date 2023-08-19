// Date: 09/04/21
import { InsightGroup, ResultsModal, Spinner } from 'uicore'
import { ElectGroup } from 'uicore';
import Layout from '../Layout';
import React from 'react';
import { useCandidateProvider } from '../contextapi/CandidateProvider';
import { GetRequest } from '../lib/request/GetRequest';
import { useInsight } from '../lib/hooks/useInsight';

const Insights = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [results, setResults] = React.useState<any>([])
  const { CandidateState } = useCandidateProvider();
  const { userData } = GetRequest(`${import.meta.env.VITE_API_URL}/get-users`)

  const { aPortfolioResultsFunc, resultsFunc } = useInsight()

  return (
    <>
      {
        showModal ?
          <ResultsModal
            portfolio={results.portfolio}
            handleClose={() => { setShowModal(false) }}
            candidates={
              (() => {
                console.log(aPortfolioResultsFunc(results.portfolio))
                return aPortfolioResultsFunc(results.portfolio)
              })()
            }
          /> : null
      }
      <Layout viewOverlay={showModal} style={{ gap: "60px" }} >

        <InsightGroup
          portfolios={CandidateState.isPortfolioListLoading ? CandidateState.portfolioList?.length : 0}
          isPortfolioListLoading={CandidateState.isPortfolioListLoading}
          votes={CandidateState.isVotesListLoading ? CandidateState.votesList?.length : 0}
          isVotesLoading={CandidateState.isVotesListLoading}
          voters={userData ? userData.users?.filter((item: any) => item?.customClaims.role === "voter").length : 0}
          isVotersLoading={userData ? true : false}
          isCandidatesLoading={CandidateState.isCandidateListLoading}
          candidates={CandidateState.isCandidateListLoading ? CandidateState.candidateList?.length : 0}
        />
        {
          CandidateState.isCandidateListLoading ?
            <ElectGroup

              Results={
                (() => {
                  return resultsFunc()
                })()
              }
              viewDetails={(data) => {
                setResults(data)
                setShowModal(true)
              }}
            /> : <Spinner style={{ marginTop: "100px" }} />
        }

      </Layout>
    </>
  )
}

export default Insights
