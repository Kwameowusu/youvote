import { Meta } from "@storybook/react"
import React, { useState } from "react"
import { Select } from "uicore"


export default {
  title: 'Components/Input/Select',
  component: Select,
  argTypes: {
    isFullwidth: {
      control: { type: "boolean" }
    },
  }
} as Meta

export const Default = (props) => {
  const [ select,setSelect]=useState("")
  return (
    <>
      <Select
        placeholder="Select portfolio"
        isFullwidth={true}
        selected={select}
        handleChange={(ev) => {  
          setSelect(ev.target.value)
          console.log(ev.target.value)
        }}
        optionList={[{
          id: "1",
          option: "Kwame",
          value: "Owusu",
        },
          {
            id: "2",
            option: "Kwaku",
            value: "mensah",
          }
        ]}

        {...props} />
    </>
  )
}