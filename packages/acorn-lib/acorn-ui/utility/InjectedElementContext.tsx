import type { ReactNode} from "react";
import React, { useCallback, useState } from "react";

interface InjectedElementContextValue {
  injectElement: (element: React.ReactElement) => string;
  removeElement: (id: string) => void;
  elements: React.ReactElement[];
}

export const InjectedElementContext = React.createContext<InjectedElementContextValue>({
  injectElement: () => "",
  removeElement: () => {},
  elements: [],
});

export const useInjectedElement = () => {
  const [elements, setElements] = useState<Record<string, React.ReactElement>>({});

  const injectElement = useCallback(
    (element: React.ReactElement) => {
      const id = Math.random().toString(36).substring(2, 15);
      setElements({ ...elements, [id]: element });
      return id;
    },
    [elements]
  );

  const removeElement = useCallback(
    (elementId: string) => {
      delete elements[elementId];
      setElements({ ...elements });
    },
    [elements]
  );

  return {
    injectElement,
    removeElement,
    elements: Object.values(elements),
  };
};

export const InjectedElementContainer = (props: { children: ReactNode }) => {
  const injectedElementBehaviours = useInjectedElement();
  return (
    <InjectedElementContext.Provider value={injectedElementBehaviours}>
      {props.children}
      {injectedElementBehaviours.elements}
    </InjectedElementContext.Provider>
  );
};
