import { Button, Icon } from "morse-react";
import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { Count } from "../content/Count/Count";
import { AcornIcon } from "../content/Icons/AcornIcon";

type AccordionProps = {
  title: string;
  count?: string;
  isExpanded?: boolean;
} & PropsWithChildren;

/**
 * The accordion component is used when you need to condense the information
 * on a screen into expandable modules.
 *
 *
 * @param props
 * @returns
 */

const Accordion: FC<AccordionProps> = (props: AccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(props.isExpanded ?? false);

  const handleClick = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <div className={"ac-accordion " + (!expanded ? "" : "+expanded")}>
      <Button
        type="button"
        className="+subtle +long ac-accordion__label ac-layout +spaced-apart"
        onClick={() => handleClick()}
        aria-expanded={!expanded ? "false" : "true"}
      >
        <div>
          <p className="ac-accordion__label-text">{props.title}</p>
          {props.count ? <Count count={props.count}></Count> : ""}
        </div>
        <Icon iconName={AcornIcon.All.KeyboardArrowDown} />
      </Button>
      {expanded && (
        <div className="ac-accordion__content">{props.children}</div>
      )}
    </div>
  );
};

export default Accordion;
