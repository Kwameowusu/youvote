import { Meta } from "@storybook/react"
import React from "react"
import { ElectGroup } from "uicore"

export default {
  title: 'Components/ElectGroup/ElectGroup',
  component: ElectGroup,
  argTypes: {}
} as Meta

export const Default = (props: Meta<typeof ElectGroup>) => {
  return (
    <>
      <ElectGroup
        viewDetails={() => {console.log('details') }}
        Results={[{
          id: '1',
          portfolio: 'Cordinator',
          name: 'John Doe',
          profileUrl:"https://i.pravatar.cc/301"
        }, {
          id: '2',
          portfolio: 'Vice Cordinator',
          name: 'Ama Doe',
          profileUrl: "https://i.pravatar.cc/320"
        }, {
          id: '3',
          portfolio: 'Secretary',
          name: 'Kofi Doe',
          profileUrl: "https://i.pravatar.cc/390"
        }, {
          id: '4',
          portfolio: 'Treasurer',
          name: 'Kwame Doe',
          profileUrl: "https://i.pravatar.cc/330"
        }, {

          id: '5',
          portfolio: 'Organizer',
          name: 'Kwesi Doe',
          profileUrl: "https://i.pravatar.cc/320"
        }
        ]
        }
        {...props}
      />
    </>
  )
}