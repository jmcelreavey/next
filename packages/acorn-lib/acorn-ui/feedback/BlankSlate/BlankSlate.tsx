import { Heading } from "morse-react";
import Image from "next/image";
import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

export interface BlankSlateProps {
  /**
   * The path to the blank slate image
   */
  imagePath?: string;
  /**
   * The main title of the blank slate
   */
  title?: string;
}

const BlankSlateWrapper = makeAcornComponent("ac-blank-slate");

/**
 * A blank slate is displayed when there are no items have been added yet.
 *
 * It should **only be used** when the user can actually take an action to add
 * something to the system
 *
 */
export const BlankSlate = (props: ComponentProps<typeof BlankSlateWrapper> & BlankSlateProps) => {
  const { imagePath, title, children, ...rest } = props;

  return (
    <BlankSlateWrapper {...rest}>
      {imagePath && <Image alt={title ?? ""} src={imagePath} />}
      {title && <Heading level={Heading.Level.H3}>{title}</Heading>}
      {children}
    </BlankSlateWrapper>
  );
};
