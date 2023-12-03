import { Loader } from "morse-react";
import type { MutableRefObject, ReactElement, ReactNode } from "react";
import { useRef } from "react";
import type { TriggeredLilyPadContextType } from "../../modals-and-dialogs/LilyPad/TriggeredLilyPad";
import {
  TriggeredLilyPad,
  TriggeredLilyPadContext,
} from "../../modals-and-dialogs/LilyPad/TriggeredLilyPad";
import { ListBox } from "../ListBox/ListBox";
import { useOptionsSource } from "./hooks/useOptionsSource";
import type { SelectedOptionsConfiguration } from "./hooks/useSelectedOptions";
import { useSelectedOptions } from "./hooks/useSelectedOptions";
import type { OptionItem } from "./types/OptionItem";
import type { SelectInputProps } from "./types/SelectInputProps";

export type SyntheticSelectInputBaseProps<
  ItemType,
  Multiple extends boolean = false
> = SelectInputProps<ItemType, Multiple> & {
  /**
   * The text to show when no value is selected. Defaults to "Select an item"
   */
  placeholder?: string | false;

  children?: (option: OptionItem<ItemType>, selected: boolean) => ReactNode;

  valueComparator?: SelectedOptionsConfiguration<ItemType>["valueComparator"];

  className?: string;

  listBoxWidth?: "matchInput" | "minimumInput" | string;

  listBoxHeadContent?: ReactNode;

  listBoxFootContent?: ReactNode;
};

export const valueIsMultiple = <ItemType,>(
  value: ItemType | ItemType[]
): value is ItemType[] => {
  return Array.isArray(value);
};

export const SyntheticSelectInputBase = <
  ItemType,
  Multiple extends boolean = false
>(
  props: SyntheticSelectInputBaseProps<ItemType, Multiple> & {
    phrase?: string;
    renderTrigger: (
      context: TriggeredLilyPadContextType,
      focusableElementRef: MutableRefObject<HTMLInputElement | null>,
      selectedOptions: OptionItem<ItemType>[]
    ) => ReactElement;
  }
) => {
  const { listBoxWidth = "minimumAnchor", phrase, renderTrigger } = props;

  const { options, loading } = useOptionsSource<ItemType>({
    phrase,
    options: props.options,
    itemToOptionTransformer: props.itemToOptionTransformer,
  });

  let selectedItems: ItemType[] = [];

  if (props.value) {
    if (Array.isArray(props.value)) {
      selectedItems = props.value;
    } else {
      // @ts-expect-error isArray guard above insufficient to show that props.value must be ItemType
      selectedItems = [props.value];
    }
  }

  const { selectedOptions } = useSelectedOptions({
    selectedItems,
    options,
    valueComparator: props.valueComparator,
  });

  const selectButtonRef = useRef<HTMLInputElement | null>(null);

  const itemRender: (
    option: OptionItem<ItemType>,
    selected: boolean,
    index: number
  ) => ReactNode =
    props.children ??
    ((option, selected, index) => (
      <ListBox.Item key={index} selected={selected} disabled={option.disabled}>
        {option?.label}
      </ListBox.Item>
    ));

  const listBoxWidthMap: Record<string, string> = {
    matchInput: "matchAnchor",
    minimumInput: "minimumAnchor",
  };

  const classes = ["c-acorn-select", props.className ?? ""];

  return (
    <div className={classes.join(" ")}>
      <TriggeredLilyPad
        className="c-dropdown"
        size={{
          width: listBoxWidthMap[listBoxWidth]
            ? listBoxWidthMap[listBoxWidth]
            : listBoxWidth,
          height: "auto",
        }}
        renderTrigger={(context) => {
          return renderTrigger(context, selectButtonRef, selectedOptions);
        }}
      >
        <TriggeredLilyPadContext.Consumer>
          {(context) => (
            <ListBox>
              {loading ? (
                <div
                  className="c-alert +align-start c-dropdown__alert +loading"
                  role="alert"
                >
                  <span className="c-alert__icon">
                    <Loader />
                  </span>
                  <span className="c-alert__text">Loading...</span>
                </div>
              ) : (
                props.listBoxHeadContent && (
                  <ListBox.Head>{props.listBoxHeadContent}</ListBox.Head>
                )
              )}
              <ListBox.Body
                focusableElementRef={selectButtonRef}
                onItemSelected={(index) => {
                  const selectedOption = options[index];
                  if (selectedOption?.disabled) {
                    return;
                  }

                  if (
                    valueIsMultiple(props.value) &&
                    props.multiple &&
                    selectedOption?.item
                  ) {
                    // @ts-expect-error valueIsMultiple guard above insufficient to show that
                    // props.value must be ItemType
                    props.onValueChange?.([
                      ...props.value,
                      selectedOption?.item,
                    ]);
                  } else {
                    // @ts-expect-error valueIsMultiple guard above insufficient to show that
                    // props.value must be ItemType
                    props.onValueChange(selectedOption.item);
                  }

                  context.hide();
                }}
              >
                {!loading &&
                  options.map((option, index) =>
                    itemRender(option, selectedOptions.includes(option), index)
                  )}
              </ListBox.Body>
              {props.listBoxFootContent && (
                <ListBox.Foot>{props.listBoxFootContent}</ListBox.Foot>
              )}
            </ListBox>
          )}
        </TriggeredLilyPadContext.Consumer>
      </TriggeredLilyPad>
    </div>
  );
};
