
import { AwaitingCard, CandidateGroup, Notification, Spinner } from 'uicore'
import Layout from '../Layout'
import { useVoteProvider } from '../contextapi/VoteProvider'
import { VoteActionType } from '../lib/reducers/votereducer'

import { useVote } from '../lib/hooks/useVote'


export function Vote() {
  const { VoteState, VoteDispatch } = useVoteProvider()
  const { submitVote, notification } = useVote()

  return (
    <Layout
      isVoteLoading={VoteState.isVoteLoading}
      submitVote={submitVote}
      notification={notification}
      activate={VoteState.election?.state as boolean} 
    >
      {
        !VoteState.isElectionLoading ? 
          <Spinner style={{marginTop:"300px"}} /> :
          <>
            {
              VoteState.election?.state ?
                <>
                  <Notification
                    style={{ marginTop: '30px' }}
                    isClose={false}
                    hexColor='#90670b'
                    status='info'
                    noteText='You can’t vote again, once submitted'
                  />
                  {
                    VoteState.isCandidateListLoading ?
                      <CandidateGroup
                        candidatesGroups={VoteState.candidateList && VoteState.candidateList}
                        getSelectedChoice={(a) => {
                          VoteDispatch({
                            type: VoteActionType.selectedChoice, payload: a
                          })

                        }}
                        portfolioList={VoteState.portfolioList && VoteState.portfolioList}
                      /> : <Spinner style={{ marginTop: "200px" }} />
                  }
                </> : <AwaitingCard />
            }
          </>
    }


    </Layout>
  )
}

Vote.displayName = 'Vote'