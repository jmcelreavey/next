import { Icon } from "morse-react";
import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

export interface KeyPairProps {
  title?: string;
  iconName?: string;
}

const KeyPairContainer = makeAcornComponent("ac-key-pair", {});

/**
 * The `<KeyPair>` component is really useful when you've got
 * a label and/or icon and a value to display together.
 *
 * #### CSS Variables
 * ```css
 * .ac-key-pair {
 *    --ac-key-pair-background-color: var(--color-shade);
 *    --ac-key-pair-border-radius: var(--button-radius);
 *    --ac-key-pair-label-color: var( --color-text );
 *    --ac-key-pair-text-color: var( --color-text );
 * }
 * ```
 * #### Variation Classes
 * You can use a combination of these classes to achieve most common layouts
 * | Variation Class | Description |
 * | - | - |
 * | `+inline` | *Align the elements in a single row* |
 * | `+stacked` | *Align the elements stacked on top of each other* |
 * | `+bar` | *Wrapped inside a container* |
 * | `+grid` | *Sets a width on the first element* |
 * | `+large` | *Sets a larger font size* |
 * | `+spaced-apart` | *Space the items to either side of the container* |
 * | `+border-top` | *Adds a top border* |
 */

export const KeyPair = (props: ComponentProps<typeof KeyPairContainer> & KeyPairProps) => {
  const { title, children, iconName, ...rest } = props;
  return (
    <KeyPairContainer {...rest}>
      <div>
        {iconName && <Icon iconName={iconName} />}
        {title}
      </div>
      <div>{children}</div>
    </KeyPairContainer>
  );
};
