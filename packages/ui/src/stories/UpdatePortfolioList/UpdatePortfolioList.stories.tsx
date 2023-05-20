import { Meta } from "@storybook/react"
import React from "react"
import { UpdatePortfolioList } from "uicore"

export default {
  title: 'Components/UpdatePortfolioList/UpdatePortfolio List',
  component: UpdatePortfolioList,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <UpdatePortfolioList portfolioList={[{
        id: "1",
        name: "cordinator"
      }]} />
    </>
  )
}