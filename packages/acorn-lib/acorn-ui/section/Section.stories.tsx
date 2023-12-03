import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "morse-react";
import { Section } from "./Section";

const meta: Meta<typeof Section> = {
  component: Section,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Section> = {
  render: () => (
    <>
      <Section>
        <Heading level={Heading.Level.H2}>Default Section</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Section>
      <br />
      <Section className="+color-1">
        <Heading level={Heading.Level.H2} className="u-color-white">
          Color 1 Section
        </Heading>
        <p className="u-color-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Section>
      <br />
      <Section className="+color-2">
        <Heading level={Heading.Level.H2} className="u-color-white">
          Color 2 Section
        </Heading>
        <p className="u-color-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Section>
      <br />
      <Section className="+color-shade">
        <Heading level={Heading.Level.H2}>Color Shade Section</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Section>
      <br />
      <Section className="+border-top">
        <Heading level={Heading.Level.H2}>Border Top Section</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Section>
      <Section className="+rounded +color-shade">
        <Heading level={Heading.Level.H2}>Rounded Section</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices eget ligula at
          fringilla. Vestibulum laoreet in libero eu aliquet. Vestibulum aliquet orci commodo elit
          aliquet gravida.
        </p>
      </Section>
    </>
  ),
};
