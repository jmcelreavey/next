import type { ButtonProps} from "morse-react";
import { Button, usePortalContext } from "morse-react";
import type { PropsWithChildren } from "react";
import React from "react";

type DialogCloseIconButtonProps = ButtonProps & {
  onDismissed?: () => void;
};

/**
 * A close button that appears as an icon.
 *
 * Usually used in the head space of a dialog and appears as an X in the top right corner.
 * @param props
 * @returns
 */
export const DialogCloseIconButton = (props: PropsWithChildren<DialogCloseIconButtonProps>) => {
  const portal = usePortalContext();

  const { onDismissed, ...rest } = props;

  const classes = ["c-dialog__close", props.className].filter(Boolean);

  return (
    <Button
      appearance={Button.Appearance.Text}
      icon
      {...rest}
      className={classes.join(" ")}
      onClick={() => {
        portal.close();
        onDismissed?.();
      }}
    >
      {props.children}
    </Button>
  );
};
