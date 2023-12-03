import { Icon } from "morse-react";
import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const GroupLi = makeAcornComponent(
  "ac-nav__group",
  { active: "+active" },
  "li"
);
const Group = (props: ComponentProps<typeof GroupLi>) => {
  const { children, ...rest } = props;
  return (
    <GroupLi {...rest}>
      <Nav secondary children={children} />
    </GroupLi>
  );
};

const GroupHeadingContainer = makeAcornComponent(
  "ac-nav__group-heading c-button +text",
  {},
  "button"
);
const GroupHeading = (props: ComponentProps<typeof GroupHeadingContainer>) => {
  const { children, ...rest } = props;
  return (
    <GroupHeadingContainer {...rest}>
      {children}
      <Icon
        iconName={"icon-keyboard_arrow_up"}
        className={`+arrow${props.hidden ? " +collapsed" : ""}`}
      />
    </GroupHeadingContainer>
  );
};

export const Nav = Object.assign(
  makeAcornComponent(
    "ac-nav",
    { primary: "+level-one", secondary: "+level-two" },
    "ul"
  ),
  {
    Group,
    GroupHeading,
    Item: makeAcornComponent(
      "ac-nav__item",
      {
        active: "+active",
        secondLevel: "+secondary-level",
      },
      "li"
    ),
  }
);
