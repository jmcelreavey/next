import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link>;

export const ButtonLink = (props: ButtonLinkProps) => (
  <Link {...props} className={["c-button", props.className].filter(Boolean).join(" ")} />
);
