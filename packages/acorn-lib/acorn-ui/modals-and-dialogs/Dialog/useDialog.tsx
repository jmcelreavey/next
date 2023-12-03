import { useCallback, useContext, useEffect, useRef } from "react";
import { InjectedElementContext } from "../../utility/InjectedElementContext";
import { DialogContainer } from "./DialogContext";

/**
 * Provides a React escape hatch to
 * @returns
 */
export const useDialog = () => {
  const injectedElementContext = useContext(InjectedElementContext);
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const dialogPromiseResolve = useRef<(value?: unknown) => void>();
  let dialogId = "";
  const shown = useRef(false);

  const show = useCallback(<T,>(dialogElement: React.ReactElement): Promise<T | undefined> => {
    dialogId = injectedElementContext.injectElement(
      <DialogContainer close={close}>
        <div ref={dialogContainerRef}>{dialogElement}</div>
      </DialogContainer>
    );

    // While we've asked for our react elements to be added to the
    // element tree, it won't be there right now. We track this using
    // the shown boolean and the code below that detects when the
    // ref becomes available to us.
    shown.current = false;

    return new Promise((resolve, reject) => {
      // @ts-expect-error The generic nature of 'resolve' is not known until show
      // is called. As suched we can't make TS aware that dialogPromiseResolve.current
      // actually supports this assignment.
      dialogPromiseResolve.current = resolve;
    });
  }, []);

  const close = useCallback((returnValue: unknown) => {
    injectedElementContext.removeElement(dialogId);
    dialogPromiseResolve.current?.(returnValue);
  }, []);

  useEffect(() => {
    if (dialogContainerRef.current && !shown.current) {
      if (dialogContainerRef.current.childNodes.length > 0) {
        const dialog = dialogContainerRef.current.childNodes[0] as HTMLDialogElement;

        dialog.showModal();

        dialog.addEventListener("close", () => {
          dialogPromiseResolve.current?.();
        });

        shown.current = true;
      }
    }
  });

  return { show, close };
};
