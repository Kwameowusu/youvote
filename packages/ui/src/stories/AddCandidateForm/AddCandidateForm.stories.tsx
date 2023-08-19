
import { Meta } from "@storybook/react"
import React, { useState } from "react"
import { AddCandidateForm } from "uicore"

export default {
  title: 'Components/AddCandidateForm/Add Candidate Form',
  component: AddCandidateForm,
  argTypes: {
  }
} as Meta

export const Default = () => {

  const [getfile, setgetfile] = useState<File>();

  return (
    <>
      <AddCandidateForm
        onFileChange={(e) => setgetfile(e.target.files![0])}
        aFile={getfile}
      />
    </>
  )
}