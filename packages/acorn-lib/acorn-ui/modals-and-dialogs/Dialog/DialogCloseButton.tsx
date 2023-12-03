import type { ButtonProps} from "morse-react";
import { Button, usePortalContext } from "morse-react";
import type { PropsWithChildren } from "react";
import React from "react";

type DialogCloseButtonProps = ButtonProps;

export const DialogCloseButton = (props: PropsWithChildren<DialogCloseButtonProps>) => {
  const portal = usePortalContext();

  return (
    <Button
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        portal.close();
        props.onClick?.(e);
      }}
    >
      {props.children}
    </Button>
  );
};
