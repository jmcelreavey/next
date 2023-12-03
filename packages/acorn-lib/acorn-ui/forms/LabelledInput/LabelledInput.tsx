import { Field, Label, wordifyCamelCase } from "morse-react";
import type { ComponentProps } from "react";
import React from "react";
import { TextBoxInput } from "../../inputs/TextBox/TextBoxInput";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const LabelledInputContainer = makeAcornComponent("ac-labelled-input");

type LabelledInputProps = {
  /**
   * The name of the labelled field.
   *
   * This is used to index the errors prop to look for any appropriate validation message
   * that might be provided by the page. If the name prop is not provided the name
   * can be inferred from the child component.
   */
  name?: string;
  /**
   * The label to display for the input.
   *
   * If not provided the label will be created by passing the resolved name
   * into `wordifyCamelCase`.
   *
   * @see name
   */
  label?: string;

  /**
   * An object containing fields mapped to error messages
   */
  errors?: Record<string, { message?: string }>;
} & (
  | {
      children?: React.ReactElement;
      inputProps?: never;
    }
  | {
      children?: never;
      inputProps?: ComponentProps<typeof TextBoxInput>;
    }
);

/**
 * LabelledInput presents an input with a label and optional error message.
 *
 * The input can be passed as a child, or if no child is provided a TextBoxInput
 * will be created and used adopting the name passed directly to the LabelledInput..
 *
 *
 * @param props
 * @returns
 */
export const LabelledInput = (
  props: ComponentProps<typeof LabelledInputContainer> & LabelledInputProps
) => {
  const { children, errors, name, label, inputProps, ...rest } = props;

  const concreteName = name ?? children?.props?.name;
  const concreteLabel =
    label ?? (concreteName ? wordifyCamelCase(concreteName) : "");

  const feedbackText =
    getNestedProperty(errors, `${concreteName}.message`) || "";

  return (
    <LabelledInputContainer {...rest}>
      <Field
        feedbackText={feedbackText}
        className={feedbackText ? "+error" : ""}
      >
        {concreteLabel && <Label htmlFor={concreteName}>{concreteLabel}</Label>}
        {!children ? (
          <TextBoxInput name={concreteName} {...inputProps} />
        ) : (
          children
        )}
      </Field>
    </LabelledInputContainer>
  );
};

function getNestedProperty(object: any, path: string): string | undefined {
  const pathArray = path.split(".");
  let value: any = object;
  for (const key of pathArray) {
    if (value === null || value === undefined) {
      return undefined;
    }
    value = value[key];
  }
  return value;
}
