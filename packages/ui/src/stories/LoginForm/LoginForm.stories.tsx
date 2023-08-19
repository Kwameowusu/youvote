
import { Meta } from "@storybook/react"
import React from "react"
import { LoginForm } from "uicore"

export default {
  title: 'Components/LoginForm/LoginForm',
  component: LoginForm,
  argTypes: {
  }
} as Meta

export const Default = (props: Meta<typeof LoginForm>) => {
  return (
    <>
      <LoginForm
        isLoading={false}
        title=' Admin Panel'
        handleSubmit={(e) => { e.preventDefault() }} email=""
        password=""
        setemail={() => { }}
        setpassword={() => { }}
        {...props} />
    </>
  )
}