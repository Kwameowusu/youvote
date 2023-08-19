import { Meta } from "@storybook/react"
import React from "react"
import { Clipboard, Navigation, UserAdd, Users } from "uicore";
import { MemoryRouter } from "react-router-dom";

export default {
  title: 'Components/navigation/bottom Navigation',
  component: Navigation,
  argTypes: {
  },
} as Meta;    
 const allRoutes = [
  {
    id: "1",
    path: "/",
    Icon: <UserAdd />
  },
  {
    id: "2",
    path: "/insight",
    Icon: <Clipboard />

  },
  {
    id: "2",
    path: "/candidates",
    Icon: <Users />

  },
]
export const Default = (props: Meta<typeof Navigation>) => {

  return (
    <MemoryRouter>
      <Navigation
       allRoutes={allRoutes}

        {...props}
      />

    </MemoryRouter>
   
  )
};