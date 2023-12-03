import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { slowly } from "morse-react";
import { useState } from "react";
import { ListBox } from "../ListBox/ListBox";
import { OptionItem } from "../Select/types/OptionItem";
import type { SearchInputProps } from "./SearchInput";
import { SearchInput } from "./SearchInput";

const StoryDetails = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: SearchInput,
  tags: ["autodocs"],
} as ComponentMeta<typeof SearchInput>;

export default StoryDetails;

const SearchableSelectInputWrapper = <ItemType,>(props: SearchInputProps<ItemType>) => {
  const [value, setValue] = useState<ItemType>();
  return (
    <SearchInput<ItemType>
      {...props}
      value={value}
      onValueChange={(newValue?: ItemType) => {
        setValue(newValue);
        console.log("SearchableSelectInput.onChange", newValue);
      }}
    />
  );
};

// Note this template factory (different from the normal story book template pattern) allows for
// correct typing of this component with its generic arguments.
const Template =
  <ItemType,>(): ComponentStory<typeof SearchInput<ItemType>> =>
  (args) => {
    return <SearchableSelectInputWrapper<ItemType> {...args} />;
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

export const ManuallyTransformItemsToOptions = Template<{
  name: string;
}>().bind({});
ManuallyTransformItemsToOptions.args = {
  options: [{ name: "Joe Black" }, { name: "Kristen Bell" }, { name: "Matt Damon" }],
  onValueChange: (newValue) => alert(newValue),
  itemToOptionTransformer: (item: { name: string }) => ({
    item,
    value: item.name,
    label: item.name.toUpperCase(),
  }),
};

interface ComplexItem { name: string; age: number }

const TemplateWithCustomItem = (): ComponentStory<typeof SearchInput<ComplexItem>> => (args) => {
  return (
    <SearchableSelectInputWrapper<ComplexItem> {...args}>
      {(option, selected) => (
        <ListBox.Item className={"u-marg u-border " + (selected ? "+selected" : "")}>
          <div className="u-pad u-flex u-justify-content-around">
            <span>{option?.item?.name}</span>
            <span>{option?.item?.age}</span>
          </div>
        </ListBox.Item>
      )}
    </SearchableSelectInputWrapper>
  );
};

export const CustomItemContent = TemplateWithCustomItem().bind({});
CustomItemContent.args = {
  options: [
    { name: "Joe Black", age: 44 },
    { name: "Kristen Bell", age: 42 },
    { name: "Matt Damon", age: 49 },
  ],
  onValueChange: (newValue) => alert(newValue),
};

export const AsyncSources = TemplateWithCustomItem().bind({});
AsyncSources.args = {
  options: (phrase?: string) =>
    slowly(
      () =>
        [
          { name: "Joe Black", age: 44 },
          { name: "Kristen Bell", age: 42 },
          { name: "Matt Damon", age: 49 },
        ].filter((i) => (phrase ? i.name.toLowerCase().includes(phrase.toLowerCase()) : true)),
      2000
    ),
};
