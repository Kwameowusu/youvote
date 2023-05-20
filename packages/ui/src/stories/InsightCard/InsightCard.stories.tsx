import { Meta } from "@storybook/react"
import React from "react"
import { InsightCard } from "uicore";

export default {
  title: 'Components/InsightCard/Insightcard',
  component: InsightCard,
  argTypes: {
  }
} as Meta;

export const Default = (props: Meta<typeof InsightCard>) => {
  return (
    <InsightCard
      title="Total votes"
      value={100}
      {...props}
    />
  )
}