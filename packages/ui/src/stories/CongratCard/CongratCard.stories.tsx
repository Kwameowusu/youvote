import { Meta } from "@storybook/react"
import { CongratCard } from "uicore"
import React from "react"

export default {
  title: 'Components/CongratCard/CongratCard',
  component: CongratCard,
  argTypes: {
  }
} as Meta

export const Default = (props: Meta<typeof CongratCard>) => {
  return (
    <CongratCard
      profileUrl="https://i.pravatar.cc/301"
      {...props}
    />
  )
}