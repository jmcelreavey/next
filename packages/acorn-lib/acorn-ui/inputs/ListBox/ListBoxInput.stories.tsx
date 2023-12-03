import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { slowly } from "morse-react";
import { useState } from "react";
import { OptionItem } from "../Select/types/OptionItem";
import type { ListBoxInputProps } from "./ListBoxInput";
import { ListBoxInput } from "./ListBoxInput";

const StoryDetails = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: ListBoxInput,
  tags: ["autodocs"],
} as ComponentMeta<typeof ListBoxInput>;

export default StoryDetails;

const ListBoxInputWrapper = <ItemType,>(props: ListBoxInputProps<ItemType>) => {
  const [value, setValue] = useState<ItemType>();
  return (
    <ListBoxInput<ItemType>
      {...props}
      value={value}
      onValueChange={(newValue?: ItemType) => {
        setValue(newValue);
        alert("You chose " + newValue);
      }}
    />
  );
};

const Template =
  <ItemType,>(): ComponentStory<typeof ListBoxInput<ItemType>> =>
  (args) => {
    return <ListBoxInputWrapper<ItemType> {...args} />;
  };

export const SimpleArraySource = Template().bind({});
SimpleArraySource.args = {
  options: ["a", "b", "c", new OptionItem("d", "D")],
};

export const DelegateArraySource = Template().bind({});
DelegateArraySource.args = {
  options: slowly(() => ["a", "b", "c"], 1000),
};

export const AutoTransformItemsToOptions = Template().bind({});
AutoTransformItemsToOptions.args = {
  options: [
    { id: 1, name: "Joe Black" },
    { id: 2, name: "Kristen Bell" },
    { id: 3, name: "Matt Damon" },
  ],
};

export const DisabledOptions = Template().bind({});
DisabledOptions.args = {
  options: [
    new OptionItem("Joe Black", "Joe Black"),
    new OptionItem("Kristen Bell", "Kristen Bell", true),
    new OptionItem("Matt Damon", "Matt Damon"),
  ],
};

export const ManuallyTransformItemsToOptions = Template<{
  name: string;
}>().bind({});
ManuallyTransformItemsToOptions.args = {
  options: [{ name: "Joe Black" }, { name: "Kristen Bell" }, { name: "Matt Damon" }],
  itemToOptionTransformer: (item: { name: string }) => ({
    item,
    value: item.name,
    label: item.name.toUpperCase(),
  }),
};

export const LargeListFixedHeight = Template().bind({});
LargeListFixedHeight.args = {
  options: "abcdefghijklmnopqrstuvwxyz".split(""),
};
