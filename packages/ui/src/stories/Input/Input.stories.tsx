import type { Meta } from "@storybook/react"

import { Input } from "uicore"

export default {
  title: "Components/Input/Input",
  component: Input,
  argTypes: {
    isFullwidth: {
      control: { type: "boolean" }
    },
    value: {
      control: { type: "text" }
    },
    noBorder: {
      control: { type: "boolean" }
    }
  },
  args: {
    isFullwidth: false,
    placeholder: "Text here",
    noBorder: false
  },

} as Meta<typeof Input>

export const Default = (props: Meta<typeof Input>) => {
  return <Input {...props} />
}