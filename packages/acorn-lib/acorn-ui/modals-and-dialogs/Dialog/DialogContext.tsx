import type { PropsWithChildren } from "react";
import React from "react";

export interface DialogContextType<T = unknown> {
  close: (returnValue?: T) => void;
}

const DialogContext = React.createContext<DialogContextType>({ close: () => {} });

export const useDialogContext = <T,>() =>
  React.useContext<DialogContextType<T>>(DialogContext as React.Context<DialogContextType<T>>);

type DialogContainerProps<T> = DialogContextType<T>;

export const DialogContainer = <T,>(props: PropsWithChildren<DialogContainerProps<T>>) => {
  const Context = DialogContext as React.Context<DialogContextType<T>>;
  const { children, ...rest } = props;
  return <Context.Provider value={rest}>{children}</Context.Provider>;
};
