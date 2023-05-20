import { Meta } from "@storybook/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { AddUserBar } from "uicore"

export default {
  title: 'Components/AddUserBar/AddUserBar',
  component: AddUserBar,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <MemoryRouter>
        <AddUserBar
          handleAdduser={() => { } } show={false}        />
      </MemoryRouter>
    </>
  )
}