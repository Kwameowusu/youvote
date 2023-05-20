import { Meta } from "@storybook/react"
import React from "react"
import { Button, Input, UpdateForm } from "uicore"

export default {
  title: 'Components/UpdateForm/UpdateForm',
  component: UpdateForm,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <UpdateForm >
        <Input type= "text" placeholder="Enter username" required isFullwidth/>
        <Button isFullwidth >
          Update
        </Button>
      </UpdateForm>
    </>
  )
}