import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "morse-react";
import { Wrap } from "./Wrap";

const meta: Meta<typeof Wrap> = {
  component: Wrap,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Wrap> = {
  render: () => (
    <>
      <Wrap>
        <Heading level={Heading.Level.H2}>Default Wrap Component</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Wrap>
      <br />
      <Wrap className="+narrow">
        <Heading level={Heading.Level.H2}>Narrow Wrap Component</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Wrap>
      <br />
      <Wrap className="+align-start +narrow">
        <Heading level={Heading.Level.H2}>Aligned to the start (Not Centered)</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Wrap>
    </>
  ),
};
