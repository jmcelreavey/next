import { Heading, Icon } from "morse-react";
import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

declare enum Level {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
}

export interface TitleProps {
  /**
   * The name of an icon sprite to show beside the title.
   */
  iconName?: string;

  /**
   * Controls the size of heading (h1, h2 etc.) used for the title.
   */
  headingLevel?: Level;
}

const TitleWrapper = makeAcornComponent("ac-title");

/**
 * A title can be used to introduce content appearing below the heading.
 *
 * Depending on the situation this may appear simply as larger font text but in
 * a side bar it might have a background and fill the width of the sidebar for
 * example.
 *
 * `Title` supports an iconName prop and should work in all places
 * that `Title` can be used.
 *
 *
 * @param props
 * @returns
 */
export const Title = (
  props: ComponentProps<typeof TitleWrapper> & TitleProps
) => {
  const {
    iconName,
    headingLevel = Heading.Level.H1,
    children,
    ...rest
  } = props;

  return (
    <TitleWrapper {...rest}>
      {iconName && <Icon iconName={iconName} />}
      {children && <Heading level={headingLevel}>{children}</Heading>}
    </TitleWrapper>
  );
};
