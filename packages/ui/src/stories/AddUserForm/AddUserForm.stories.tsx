import { Meta } from "@storybook/react"
import React from "react"
import { AddUserFrom } from "uicore"

export default {
  title: 'Components/AddUserFrom/AddUserFrom',
  component: AddUserFrom,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <AddUserFrom
        selectedValue={""}
        handleSelectChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
          throw new Error("Function not implemented.")
        } }
        isUserLoading={false}
        email={""}
        password={""}
        handleEmailChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.")
        } }
        handlePasswordChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.")
        } } />
    </>
  )
}