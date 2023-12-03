import { Icon } from "morse-react";
import type { ComponentProps } from "react";
import React from "react";
import { AcornIcon } from "../../content/Icons/AcornIcon";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const NavToggleContainer = makeAcornComponent("ac-nav-toggle");

export const NavToggle = (props: ComponentProps<typeof NavToggleContainer>) => {
  const { children: _children, ...rest } = props;

  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    const closeNav = (event: Event) => {
      if (
        ["toggle-icon", "toggle-nav"].includes(
          (event.target as HTMLElement)?.id
        ) ||
        (event.target as HTMLElement).innerHTML.includes("toggle-icon")
      ) {
        return;
      }

      setToggle(false);
      window.removeEventListener("click", closeNav);
    };
    // we need to wait for the next tick before adding the event listener
    // otherwise the click event that triggered the toggle will also trigger the close
    setTimeout(() => window.addEventListener("click", closeNav), 0);
    return () => window.removeEventListener("click", closeNav);
  });

  return (
    <NavToggleContainer {...rest}>
      <input
        type="checkbox"
        id="toggle-nav"
        checked={toggle}
        onClick={(e) => {
          setToggle(!toggle);
        }}
        readOnly
      />
      <label htmlFor="toggle-nav" className="c-button +text">
        <Icon id="toggle-icon" iconName={AcornIcon.Navigation.Menu} />
        <span>Menu</span>
      </label>
    </NavToggleContainer>
  );
};
