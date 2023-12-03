import { Icon } from "morse-react";
import type { ComponentProps, PropsWithChildren } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const FieldsetContainer = makeAcornComponent("ac-fieldset", {}, "fieldset");
export const Legend = makeAcornComponent("ac-legend", {}, "legend");

type FieldsetProps = {
  /**
   * Optionally a string to show as a legend.
   */
  legend?: string;
  /**
   * An optional icon
   */
  iconName?: string;
} & PropsWithChildren;

/**
 * Presents a group of inputs surrounded by a fieldset and optionally a legend.
 *
 * Provides a useful way of thinking about form inputs as groups and can maximise
 * reusability to have named input groups in a form using Fieldset components as
 * the natural container.
 *
 * @param props
 * @returns
 */
export const Fieldset = (props: ComponentProps<typeof FieldsetContainer> & FieldsetProps) => {
  const { iconName, children, legend, ...rest } = props;

  return (
    <FieldsetContainer {...rest}>
      {legend && (
        <Legend>
          {iconName && <Icon iconName={iconName} />}
          {legend}
        </Legend>
      )}
      {children}
    </FieldsetContainer>
  );
};
