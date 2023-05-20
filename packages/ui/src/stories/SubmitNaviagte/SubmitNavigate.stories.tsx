import { Meta } from "@storybook/react"
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { SubmitNavigate } from 'uicore';

export default {
  title: 'Components/Navigation/SubmitNavigate',
  component: SubmitNavigate,
  argTypes: {}
} as Meta;

export const Default = (props: Meta<typeof SubmitNavigate>) => {
  return (
    <>
      <MemoryRouter>
        <SubmitNavigate
          handleSubmit={() => { }}
          src="https://casalogs.netlify.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fcasalogs%2Fimage%2Fupload%2Fv1665083058%2Fusers%2Fprofile%2F0106c302-db2b-41fb-8371-fc0dc5e9d921.jpg&w=1200&q=40"
          {...props} />
      </MemoryRouter>
    </>
  )
}
