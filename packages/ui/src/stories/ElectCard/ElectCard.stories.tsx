import { Meta } from "@storybook/react"
import React from "react"
import { ElectCard } from "uicore"

export default {
  title: 'Components/ElectCard/ElectCard',
  component: ElectCard,
  argTypes: {
    isList: {
      control: { type: "boolean" }
    },
    isEdit: {
      control: { type: "boolean" }
    },
    isElect: {
      control: { type: "boolean" }
    },
    isProfileUpdate:{
      control: { type: "boolean" }
    }
  }
 } as Meta

export const Default = (props: Meta<typeof ElectCard>) => { 
  return (
    <>
      <ElectCard
        votes="100"
        votePercentage="50%"
        portfolio="Cordinator"
        name="John Doe"
        isList={false}
        isEdit={false}
        handleDelete={() => { console.log('delete') }}
        handleEdit={() => { console.log('edit') }}
        isProfileUpdate={false}
        handleUpdateProfile={() => { console.log('update profile') }}
        profileUrl={"https://casalogs.netlify.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fcasalogs%2Fimage%2Fupload%2Fv1665083058%2Fusers%2Fprofile%2F0106c302-db2b-41fb-8371-fc0dc5e9d921.jpg&w=1200&q=40"}
        {...props}
      />
    </>
  )
}