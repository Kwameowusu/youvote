import { Meta } from "@storybook/react"
import React from "react"
import { AwaitingCard } from "uicore"

export default {
  title: 'Components/AwaitingCard/AwaitingCard',
  component: AwaitingCard,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <AwaitingCard />
    </>
  )
}