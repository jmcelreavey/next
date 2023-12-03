import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button, slowly } from "morse-react";
import { useState } from "react";
import { ListBox } from "../ListBox/ListBox";
import type { SyntheticSelectInputProps } from "./SyntheticSelectInput";
import { SyntheticSelectInput } from "./SyntheticSelectInput";
import { OptionItem } from "./types/OptionItem";

const StoryDetails = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: SyntheticSelectInput,
} as ComponentMeta<typeof SyntheticSelectInput>;

export default StoryDetails;

const SyntheticSelectInputWrapper = <ItemType,>(props: SyntheticSelectInputProps<ItemType>) => {
  const [value, setValue] = useState<ItemType>();
  return (
    <SyntheticSelectInput<ItemType>
      {...props}
      value={value}
      onValueChange={(newValue?: ItemType) => {
        setValue(newValue);
      }}
    />
  );
};

// Note this template factory (different from the normal story book template pattern) allows for
// correct typing of this component with its generic arguments.
const Template =
  <ItemType,>(): ComponentStory<typeof SyntheticSelectInput<ItemType>> =>
  (args) => {
    return <SyntheticSelectInputWrapper<ItemType> {...args} />;
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
  onValueChange: (newValue?: { name: string }) => alert(newValue?.name),
  itemToOptionTransformer: (item: { name: string }) => ({
    item,
    value: item.name,
    label: item.name.toUpperCase(),
  }),
};

interface ComplexItem { name: string; age: number }

const TemplateWithCustomItem =
  (): ComponentStory<typeof SyntheticSelectInput<ComplexItem>> => (args) => {
    return (
      <SyntheticSelectInputWrapper<ComplexItem> {...args}>
        {(option, selected) => (
          <ListBox.Item className={"u-marg u-border " + (selected ? "+selected" : "")}>
            <div className="u-pad u-flex u-justify-content-around">
              <span>{option?.item?.name}</span>
              <span>{option?.item?.age}</span>
            </div>
          </ListBox.Item>
        )}
      </SyntheticSelectInputWrapper>
    );
  };

export const CustomItemContent = TemplateWithCustomItem().bind({});
CustomItemContent.args = {
  options: [
    { name: "Joe Black", age: 44 },
    { name: "Kristen Bell", age: 42 },
    { name: "Matt Damon", age: 49 },
  ],
  onValueChange: (newValue) => alert(newValue?.name),
};

export const ListBoxWidth: ComponentStory<typeof SyntheticSelectInput> = () => {
  return (
    <>
      <p>Select with items longer than it:</p>
      <div style={{ width: "200px" }}>
        <SyntheticSelectInputWrapper
          options={[
            "Really, really, really, really long line of text 1",
            "Really long line of text 2",
          ]}
        />
      </div>

      <p>Select with items shorter than it:</p>
      <div style={{ width: "200px" }}>
        <SyntheticSelectInputWrapper options={["Short text 1", "Short text 2"]} />
      </div>

      <p>Select with items longer than it but select set to 'matchInput':</p>
      <div style={{ width: "200px" }}>
        <SyntheticSelectInputWrapper
          listBoxWidth="matchInput"
          options={[
            "Really, really, really, really long line of text 1",
            "Really long line of text 2",
          ]}
        />
      </div>
    </>
  );
};

export const WithListBoxFooter: ComponentStory<typeof SyntheticSelectInput> = () => {
  return (
    <SyntheticSelectInputWrapper
      options={["a", "b", "c", "d"]}
      listBoxHeadContent={
        <div className="u-pad">
          <input className="c-input +text +fill" placeholder="Search" />
        </div>
      }
      listBoxFootContent={
        <div className="u-pad">
          <Button>Add another</Button>
        </div>
      }
    />
  );
};
