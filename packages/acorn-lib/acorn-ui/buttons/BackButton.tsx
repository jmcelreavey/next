import type { ButtonProps } from "morse-react";
import { Button } from "morse-react";
import { useRouter } from "next/router";

export const BackButton = (props: Omit<ButtonProps, "onClick">) => {
  const router = useRouter();
  return <Button type="button" {...props} onClick={router.back} />;
};
