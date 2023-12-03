import type { ComponentMeta } from "@storybook/react";
import { CognitoMfaMethod } from "../types";
import { CognitoVerifyMfaForm as CognitoVerifyMfaFormComponent } from "./CognitoVerifyMfaForm";

const StoryDetails = {
  component: CognitoVerifyMfaFormComponent,
  argTypes: {
    handleVerifyTotp: { action: "handle-verify-totp" },
    handleCancel: { action: "cancel" },
  },
  args: { mfaMethod: CognitoMfaMethod.Totp },
} as ComponentMeta<typeof CognitoVerifyMfaFormComponent>;

export default StoryDetails;

export const CognitoVerifyMfaForm = (args) => {
  return <CognitoVerifyMfaFormComponent {...args} />;
};
