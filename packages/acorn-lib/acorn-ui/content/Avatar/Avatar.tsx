import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const AvatarContainer = makeAcornComponent("ac-avatar");

/**
 * The Avatar is used when we need to display photos or graphics linked
 * to a user, customer or person.
 *
 * #### CSS Variables
 * ```css
 * .ac-avatar {
 *    --ac-avatar-size: var(--touch-target);
 *    --ac-avatar-background-color: var(--color-accent);
 *    --ac-avatar-text-color: var(--color-text);
 *    --ac-avatar-font-size: font-size(milli);
 *    --ac-avatar-border-radius: 100%;
 * }
 * ```
 */

export const Avatar = (props: ComponentProps<typeof AvatarContainer>) => {
  const { children, ...rest } = props;
  return (
    <AvatarContainer className={rest.className} {...rest}>
      {children}
    </AvatarContainer>
  );
};
