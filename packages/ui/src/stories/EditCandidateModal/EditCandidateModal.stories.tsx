import { Meta } from "@storybook/react"
import React, { useState } from "react"
import { MemoryRouter } from "react-router-dom"
import { EditCandidateModal } from "uicore"

export default {
  title: "Components/EditCandidateModal/EditCandidateModal",
  component: EditCandidateModal,
  "argTypes": {}
} as Meta

export const Default = (props: Meta<typeof EditCandidateModal>) => {
  const [getfile, setgetfile] = useState<File>();

  return (
    <>
      <MemoryRouter>
        <EditCandidateModal
          optionList={[]}
          handleSelectChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
            throw new Error("Function not implemented.")
          }}
          selectedValue={""}
          username={""}
          handleNameChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.")
          }}
          isNameLoading={false}
          isPortfolioLoading={false}
          isCompressing={false}
          isNoFile={false}
          isFileLoading={false}
          profileUrl={""}
          handleUpdateProfile={function (): void {
            throw new Error("Function not implemented.")
          }}
          handleNameSubmit={function (e: React.FormEvent<HTMLFormElement>): void {
            throw new Error("Function not implemented.")
          }}
          handleSelectSubmit={function (e: React.FormEvent<HTMLFormElement>): void {
            throw new Error("Function not implemented.")
          }}
          onFileChange={(e) => setgetfile(e.target.files![0])}
          handleClose={() => { console.log('close') } }
          aFile={getfile}
          {...props} />
      </MemoryRouter>
    
    </>
  )
}