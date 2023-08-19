import { Meta } from "@storybook/react"
import React from "react"
import { UpdateCandidate } from "uicore"


export default {
  title: 'Components/UpdateCandidate/UpdateCandidate',
  component: UpdateCandidate,
  argTypes: {
  }
} as Meta

export const Default = (props: Meta<typeof UpdateCandidate>) => {
  return (
    <UpdateCandidate
      handleDelete={(id?: string) => { console.log(id) }}
      handleEdit={(id?: string) => { console.log(id) }}
      AllCandidates={
        [{
          name: 'John Doe',
          portfolio: 'Cordinator',
          id: '1',
          profileUrl: "https://i.pravatar.cc/301"
        }, {
          name: 'Kwesi Doe',
          portfolio: 'Cordinator',
          profileUrl: "https://i.pravatar.cc/321",
          id: '2'
        }, {
          name: 'Kwesi Joe',
          portfolio: 'Secretary',
          id: '3',
          profileUrl: "https://i.pravatar.cc/311"

        }, {
          name: 'Ama Hoe',
          portfolio: 'Secretary',
          id: '4',
          profileUrl: "https://i.pravatar.cc/31"

        }, {
          name: 'Mama Doe',
          portfolio: 'Secretary',
          id: '5',
          profileUrl: "https://i.pravatar.cc/351"

        },
        {
          name: 'John Doe',
          portfolio: 'Treasure',
          id: '6',
          profileUrl: "https://i.pravatar.cc/311"

        }
        ]
      }
      {...props} />
  )
}