import type { ComponentProps, ElementType, ReactNode } from "react";
import React from "react";

type BooleanProps<PropMap> = {
  [Property in keyof PropMap]?: boolean;
};

// TODO: Improve permitted utilities to reference a structure from morse
export function makeAcornComponent<
  AdditionalProps extends Record<string, any> = {},
  ModifierProps extends Record<string, string> = {},
  BaseElementProps extends ElementType = "div",
  BaseElement extends HTMLElement = HTMLDivElement
>(
  namespacedClassName: string,
  permittedModifierClasses?: ModifierProps,
  element?: BaseElementProps,
  additionalPropsContainingClassNames?: (keyof AdditionalProps)[]
) {
  const Element = element ?? "div";
  return React.forwardRef<
    BaseElement,
    ComponentProps<BaseElementProps> &
      BooleanProps<ModifierProps> & {
        className?: string;
        children?: ReactNode;
      } & AdditionalProps
  >((props, ref) => {
    const { className, ...rest } = props;
    const classes = [namespacedClassName, className].filter(Boolean);

    for (const additionalClass of additionalPropsContainingClassNames ?? []) {
      if (props[additionalClass]) {
        classes.push(props[additionalClass]);
      }
    }

    if (permittedModifierClasses) {
      Object.keys(permittedModifierClasses).forEach((modifier) => {
        if (rest[modifier]) {
          classes.push(permittedModifierClasses[modifier]);
          delete rest[modifier];
        }
      });
    }

    // @ts-expect-error
    return <Element {...rest} ref={ref} className={classes.join(" ")} />;
  });
}
