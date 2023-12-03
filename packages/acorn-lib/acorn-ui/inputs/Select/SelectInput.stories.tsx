import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { slowly } from "morse-react";
import { SelectInput } from "./SelectInput";
import { OptionItem } from "./types/OptionItem";

const StoryDetails = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: SelectInput,
  tags: ["autodocs"],
} as ComponentMeta<typeof SelectInput>;

export default StoryDetails;

const Template =
  <ItemType,>(): ComponentStory<typeof SelectInput<ItemType>> =>
  (args) => {
    return <SelectInput<ItemType> {...args} />;
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
  options: [{ name: "Joe Black" }, { name: "Kristen Bell" }, { name: "Matt Damon" }],
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
  onValueChange: (newValue) => alert(newValue?.name),
  itemToOptionTransformer: (item: { name: string }) => ({
    item,
    value: item.name,
    label: item.name.toUpperCase(),
  }),
};
