import React from "react"
import { Meta } from "@storybook/react"
import { CheckCandidate } from "uicore"


export default {
  title: 'Components/Check Candidate/Check Candidate',
  component: CheckCandidate,
  argTypes: {

  },
} as Meta

export const Default = (props: Meta<typeof CheckCandidate>) => {
  return (
    <CheckCandidate
      {...props}
    />
  )
}
