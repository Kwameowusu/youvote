import type { Meta } from "@storybook/react"
import { Button } from "uicore"
import React from "react"

export default {
  title: "Components/Button/Button ",
  component: Button,
  argTypes: {
    children: {
      control: { type: "text" }
    },
    variants: {
      control: "radio",
      options: ["outlined", "primary"],


    },
    size: {
      control: "radio",
      options: ["small", "large"]
    },
    isFullwidth: {
      control: { type: "boolean" }
    }
  },
  args: {
    children: "Button",
    variants: "primary",
    isFullwidth: false,
    size: "small"
  }
} as Meta<typeof Button>

export const Default = (props: Meta<typeof Button>) => {
  return <>
    <Button {...props} />
  </>
}