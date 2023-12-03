import type { ComponentMeta } from "@storybook/react";
import { CognitoMfaMethod } from "../types";
import { CognitoSetupMfaForm as CognitoSetupMfaFormComponent } from "./CognitoSetupMfaForm";

const StoryDetails = {
  component: CognitoSetupMfaFormComponent,
  argTypes: {
    handleVerifyTotp: { action: "handle-verify-totp" },
    handleCancel: { action: "cancel" },
  },
  args: {
    permittedMfaMethods: [CognitoMfaMethod.Totp],
    secret: "GJASDKDFKC4342KFSKDSKKDFS45SFCSAFWEFASDFWE3",
    secretQrCodeContent:
      "otpauth://totp/Example:alice@site.com?secret=GJASDKDFKC4342KFSKDSKKDFS45SFCSAFWEFASDFWE3",
  },
} as ComponentMeta<typeof CognitoSetupMfaFormComponent>;

export default StoryDetails;

export const CognitoSetupMfaForm = (args) => {
  return <CognitoSetupMfaFormComponent {...args} />;
};
