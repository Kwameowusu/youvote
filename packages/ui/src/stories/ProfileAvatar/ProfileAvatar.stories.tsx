import { Meta } from "@storybook/react"
import React, { useState } from "react"
import { ProfileAvatar } from "uicore"

export default {
  title: "Components/Profile Avatar/Profile Avatar",
  component: ProfileAvatar,
  argTypes: {
    size: {
      control: "radio",
      options: ["cSmall", "cMedium", "cLarge", "qSmall", "qMedium", "qLarge"],
    },
    upload: {
      control: "boolean",
    },
    overlay: {
      control: "boolean",
    }
  },
} as Meta<typeof ProfileAvatar>

export const Default = (props: Meta<typeof ProfileAvatar>) => {
  const [getfile, setgetfile] = useState<File>();
  return (
    <>
      <ProfileAvatar
        onFileChange={(e) => setgetfile(e.target.files![0])}
        aFile={getfile}
        src='https://i.pravatar.cc/301'
        size="qLarge"
        alt="profile"
        handleDelete={() => { console.log("hello") }}
        {...props}
      />
      <input type="radio" style={{width:"80px" ,height:"80px" ,accentColor:"green"}} />
    </>)
}