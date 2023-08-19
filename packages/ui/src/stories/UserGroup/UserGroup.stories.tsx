import { Meta } from "@storybook/react"
import React from "react"
import { UsersGroup } from "uicore"

export default {
  title: 'Components/UsersGroup/UsersGroup',
  component: UsersGroup,
  argTypes: {
  }
} as Meta

export const Default = () => {
  return (
    <>
      <UsersGroup
        usersList={[{
          id: "1",
          email: "cordinator@gmail.com",
          role: "admin"
        }, {
          id: "2",
          email: "cordinator@gmail.com",
          role: "voter"
        }, {
          id: "3",
          email: "cordinator@gmail.com",
          role: "voter"
        }
        ]}
        handleDelete={function (arg: any): void {
          throw new Error("Function not implemented.")
        }}
      />
    </>
  )
}