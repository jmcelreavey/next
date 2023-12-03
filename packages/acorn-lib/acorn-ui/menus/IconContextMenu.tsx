import type { ButtonProps } from "morse-react";
import { Button } from "morse-react";
import { ContextMenu } from "./ContextMenu";

export type IconContextMenuProps = Omit<ButtonProps, "onClick" | "icon"> & {
  icon: ButtonProps["icon"];
};

export const IconContextMenu = (props: IconContextMenuProps) => {
  const {
    children,
    title,
    appearance = Button.Appearance.Text,
    ...rest
  } = props;

  return (
    <ContextMenu
      renderTrigger={(context) => (
        <Button
          {...rest}
          appearance={appearance}
          onClick={(e) => {
            context.show();
            e.stopPropagation();
          }}
        >
          {props.title}
        </Button>
      )}
    >
      {children}
    </ContextMenu>
  );
};
