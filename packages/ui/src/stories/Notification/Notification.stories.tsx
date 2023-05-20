import type { Meta } from "@storybook/react"
import { Notification } from "uicore"
import React from "react"

export default {
  title: "Components/Notification/Notification ",
  component: Notification,
  argTypes: {
    children: {
      control: { type: "text" }
    },
    status: {
      control: "radio",
      options: ["success", "error", "info"]
    },
    isFullwidth: {
      control: { type: "boolean" }
    }
  },
  args: {
    children: "Button",
    isFullwidth: false,
    status: "info",
    noteText: "You can’t vote again, once submitted"
  }
} as Meta<typeof Notification>

export const Default = (props: Meta<typeof Notification>) => {
  return <>
    <Notification hexColor="#900B0B" {...props} />
  </>
}