import { Meta } from "@storybook/react"
import React from "react"
import { DeleteItemModal } from "uicore"

export default {
  title: 'Components/DeleteItemModal/DeleteItemModal',
  component: DeleteItemModal,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <DeleteItemModal
        confirmations={[
          { transform: true, handledelete: () => { }, handleClose: () => { } },
        ]} />
    </>
  )
}