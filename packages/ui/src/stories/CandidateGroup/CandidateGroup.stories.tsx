import { Meta } from "@storybook/react"
import React from "react"
import { CandidateGroup } from "uicore"


export default {

  title: 'Components/CandidateGroup/CandidateGroup',
  component: CandidateGroup,
  argTypes: {
  }
} as Meta



export const Default = (props: Meta<typeof CandidateGroup>) => {
  const cordinators = [{
    id: '1',
    portfolio: 'cordinator',
    name: 'John Doe',
    profileUrl: "https://i.pravatar.cc/301",

  }, {
    id: '2',
    portfolio: 'cordinator',
    name: 'Ama Doe',
    profileUrl: "https://i.pravatar.cc/320",

  }]

  const secretaries = [{
    id: '3',
    portfolio: 'secretary',
    name: 'Kofi Doe',
    profileUrl: "https://i.pravatar.cc/390"
  }, {
    id: '4',
    portfolio: 'secretary',
    name: 'Kwame Doe',
    profileUrl: "https://i.pravatar.cc/330",

  }, {
    id: '5',
    portfolio: 'secretary',
    name: 'Kwesi Doe',
    profileUrl: "https://i.pravatar.cc/320",

  }]

  const treasurers = [{
    id: '6',
    portfolio: 'treasurer',
    name: 'Kofi Doe',
    profileUrl: "https://i.pravatar.cc/390",

  }, {
    id: '7',
    portfolio: 'treasurer',
    name: 'Kwame Doe',
    profileUrl: "https://i.pravatar.cc/330",

  }, {
    id: '8',
    portfolio: 'treasurer',
    name: 'Kwesi Doe',
    profileUrl: "https://i.pravatar.cc/320",

  }]

  const viceCordinator = [{
    id: '9',
    portfolio: 'vice-cordinator',
    name: 'Kofi Doe',
    profileUrl: "https://i.pravatar.cc/190",

  }, {
    id: '10',
    portfolio: 'vice-cordinator',
    name: 'Kwame Doe',
    profileUrl: "https://i.pravatar.cc/430",

  }, {
    id: '11',
    portfolio: 'vice-cordinator',
    name: 'Kwesi Doe',
    profileUrl: "https://i.pravatar.cc/380",

  }]

  return (
    <CandidateGroup
      candidatesGroups={[
        cordinators,
        secretaries,
        treasurers,
        viceCordinator
      ]}
      {...props}
    />
  )
}