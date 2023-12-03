import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useRef } from "react";
import { SelectButton } from "./SelectButton";

const StoryDetails = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: SelectButton,
} as ComponentMeta<typeof SelectButton>;

export default StoryDetails;

const Template: ComponentStory<typeof SelectButton> = (args) => {
  return <SelectButton {...args} />;
};

export const DefaultPresentation = Template.bind({});
DefaultPresentation.args = {
  children: "Please Select",
};

const SearableWrapper = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <SelectButton focusableElementRef={ref} contentContainsFocusableElement>
      <input type="text" ref={ref} className="c-input c-input__box +text +reset" />
    </SelectButton>
  );
};

export const Searchable = SearableWrapper.bind({});
