import type {ComponentProps} from "react";
import { makeAcornComponent } from "../utility/makeAcornComponent";

const MastheadContainer = makeAcornComponent("ac-masthead");

export const Masthead = (props: ComponentProps<typeof MastheadContainer>) => {
  const { children, ...rest } = props;
  return (
    <MastheadContainer {...rest}>
      <header role="banner">{children}</header>
    </MastheadContainer>
  );
};
