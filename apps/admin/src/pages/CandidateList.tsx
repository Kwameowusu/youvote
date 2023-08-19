import { EditCandidateModal, Spinner, UpdateCandidate, UpdatePortfolioList } from 'uicore'
import Layout from '../Layout'
import { useState } from 'react';
import { useCandidateProvider } from '../contextapi/CandidateProvider';
import { CandidateActionType, aCandidateType, aPortfolioType } from '../lib/reducers/candidate-reducer';
import { useCandidatePortfolio } from '../lib/hooks/useCandidatePortfolio';
import { useUpdateACandidate } from '../lib/hooks/useUpdateACandidate';

const CandidateList = () => {
  const [showModal, setShowModal] = useState(false)




  const { CandidateState, CandidateDispatch } = useCandidateProvider();

  const { profileOnChange } = useCandidatePortfolio()

  const { profilePhotoSubmit, notification, confirmations, submitCandidateName,
    submitCandidatePortfolio, } = useUpdateACandidate()

  return (
    <>
      {
        showModal ?
          <EditCandidateModal
            handleSelectSubmit={(e) => submitCandidatePortfolio(e, CandidateState.aCandidate as aCandidateType)}
            handleNameSubmit={(e) => submitCandidateName(e, CandidateState.aCandidate as aCandidateType)}
            onFileChange={profileOnChange}
            handleClose={() => { setShowModal(false); }}
            aFile={CandidateState.candidateProfile as File}
            optionList={CandidateState.portfolioList.map((item) => ({ id: item.id, option: item.name, value: item.name }))}
            handleSelectChange={(e) => CandidateDispatch({ type: CandidateActionType.selectedPortfolio, payload: e.target.value })}
            selectedValue={CandidateState.selectedPortfolio}
            username={CandidateState.username}
            handleNameChange={(e) => CandidateDispatch({ type: CandidateActionType.username, payload: e.target.value })}
            isNameLoading={CandidateState.isNameLoading}
            isPortfolioLoading={CandidateState.isPortfolioLoading}
            isCompressing={CandidateState.isCompressing}
            isNoFile={CandidateState.isNoFile}
            isFileLoading={CandidateState.isFileLoading}
            profileUrl={CandidateState.aCandidate?.profileUrl as string}
            handleUpdateProfile={() => profilePhotoSubmit(CandidateState.aCandidate as aCandidateType)} />
          : null
      }
      <Layout
        viewOverlay={showModal || CandidateState.isPortfolioDeleteModalOpen || CandidateState.isCandidateDeleteModalOpen}
        notification={notification}
        confirmations={confirmations}
      >
        {
          CandidateState.isPortfolioListLoading ?
            <>
              <UpdatePortfolioList
                portfolioList={CandidateState.portfolioList}
                handleDelete={(getPortfolio) => {
                  CandidateDispatch({ type: CandidateActionType.aPortfolio, payload: getPortfolio as aPortfolioType })
                  CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteModalOpen, payload: true })

                  console.log(getPortfolio)
                }}
                handleEdit={(_getPortfolio) => { }}
              />
              <UpdateCandidate
                portfolioList={CandidateState.portfolioList as any}
                handleDelete={(getCandidate) => {
                  CandidateDispatch({ type: CandidateActionType.aCandidate, payload: getCandidate as aCandidateType })
                  CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteModalOpen, payload: true })

                  console.log(getCandidate)
                }}
                handleEdit={(getCandidate) => {
                  setShowModal(true)
                  CandidateDispatch({ type: CandidateActionType.aCandidate, payload: getCandidate as aCandidateType })
                  CandidateDispatch({ type: CandidateActionType.username, payload: getCandidate?.name as string })
                  CandidateDispatch({ type: CandidateActionType.selectedPortfolio, payload: getCandidate?.portfolio as string })

                }}
                AllCandidates={CandidateState.candidateList as any}
              />
            </>

            : <>
              <Spinner style={{marginTop:"300px"}} />
            </>
        }

      </Layout>
    </>
  )
}

export default CandidateList