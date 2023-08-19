import { Meta } from "@storybook/react"
import React from "react"
import { ResultsModal } from "uicore"

export default {
  title: "Components/Results Modal/Results modal",
  component: ResultsModal,
  "argTypes": {}

} as Meta

export const Default = (props: Meta<typeof ResultsModal>) => {
  return (
    <>
      <ResultsModal
        portfolio="Secretary"
        handleClose={() => { console.log('close') }}
        candidates={
          [{
            votePercentage: '20%',
            votes: '20',
            name: 'John Doe',
            profileUrl: "https://i.pravatar.cc/301"
          }, {

            votePercentage: '10%',
            votes: "10",
            name: 'Kwesi Doe',
            profileUrl: "https://i.pravatar.cc/320"
          }
          ]
        }
        {...props} />
    </>
  )
}