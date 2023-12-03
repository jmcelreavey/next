import type { Meta, Story } from "@storybook/react";
import { Button } from "morse-react";
import { useRef } from "react";
import type { TriggeredLilyPadProps } from "./TriggeredLilyPad";
import { TriggeredLilyPad } from "./TriggeredLilyPad";

export default {
  component: TriggeredLilyPad,
} as Meta;

const Template: Story<TriggeredLilyPadProps> = (args) => {
  return (
    <TriggeredLilyPad
      {...args}
      renderTrigger={(context) => <Button onClick={() => context.show()}>Open Sesame</Button>}
    >
      Text in a Lily Pad
    </TriggeredLilyPad>
  );
};

export const DefaultTriggeredLilyPad = Template.bind({});
DefaultTriggeredLilyPad.args = {};

const TriggeredLilyPadWithCustomAnchorExample = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <>
      <TriggeredLilyPad
        renderTrigger={(context) => (
          <Button onClick={() => ref.current && context.show(ref.current)}>Click Here</Button>
        )}
      >
        Text in a Lily Pad
      </TriggeredLilyPad>
      <p ref={ref}>But opens relative to here</p>
    </>
  );
};

export const TriggeredLilyPadWithCustomAnchor = TriggeredLilyPadWithCustomAnchorExample.bind({});
