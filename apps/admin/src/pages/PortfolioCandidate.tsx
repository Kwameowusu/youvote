import { AddCandidateForm, Spinner } from 'uicore'
import { Button } from 'uicore'
import { Input } from 'uicore'
import { UpdateForm } from 'uicore'
import Layout from '../Layout'
import { CandidateActionType } from '../lib/reducers/candidate-reducer'

import { useCandidatePortfolio } from '../lib/hooks/useCandidatePortfolio'

const PortfolioCandidate = () => {



  const { notification, addPortfolio, CandidateDispatch, CandidateState, profileOnChange, onCandidateSubmit } = useCandidatePortfolio()




  return (
    <>
      <Layout style={{ gap: "70px" }}
        notification={notification}
      >
        <UpdateForm style={{ marginTop: "40px" }} title='Add Portfolio' onSubmit={(e) => {
          addPortfolio(e,)
        }} >
          <Input type="text" placeholder="Enter portfolio" value={CandidateState.portfolio || ""} onChange={(e) => CandidateDispatch({ type: CandidateActionType.portfolio, payload: e.target.value })} required isFullwidth />
          <Button
            disabled={CandidateState.isPortfolioLoading && Boolean(CandidateState.portfolio)}
            isFullwidth >
            {
              CandidateState.isPortfolioLoading && CandidateState.portfolio ? <Spinner /> : "Submit"
            }
          </Button>
        </UpdateForm>
        <AddCandidateForm

          onSubmit={onCandidateSubmit}
          onFileChange={profileOnChange}
          aFile={CandidateState.candidateProfile as File}
          portfolioList={CandidateState.portfolioList?.map((item) => (
            {
              id: item.id,
              option: item.name,
              value: item.name
            }
          ))}
          isCandidateLoading={CandidateState.isCandidateLoading}
          onSelectChange={(e) => CandidateDispatch({ type: CandidateActionType.selectedPortfolio, payload: e.target.value })}
          selectValue={CandidateState.selectedPortfolio}
          isNoFile={CandidateState.isNoFile}
          isCompressing={CandidateState.isCompressing}
          nameOnChange={(e) => CandidateDispatch({ type: CandidateActionType.username, payload: e.target.value })}
          username={CandidateState.username} />
      </Layout>
    </>
  )
}



export default PortfolioCandidate