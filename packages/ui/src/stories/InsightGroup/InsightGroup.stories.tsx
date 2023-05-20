import { Meta } from "@storybook/react"
import React from "react"
import { InsightGroup } from "uicore"
export default {
  title: 'Components/InsightGroup/InsightGroup',
  component: InsightGroup,
  argTypes: {
  }
} as Meta

export const Default = (props: Meta<typeof InsightGroup>) => {
  return (
    <InsightGroup
      portfolios={6}
      votes={100}
      voters={100}
      {...props} />
  )
}