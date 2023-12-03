import type { ComponentMeta } from "@storybook/react";
import { CognitoResetPasswordForm as CognitoResetPasswordFormComponent } from "./CognitoResetPasswordForm";

const StoryDetails = {
  component: CognitoResetPasswordFormComponent,
  argTypes: { handleCancel: { action: "called" } },
  args: {
    email: "jsmith@gmail.com",
    passwordPolicies: [
      {
        policyText: "Minimum of 6 characters long",
        passingRegularExpression: /^.{6,}$/,
      },
      { policyText: "At least one number", passingRegularExpression: /\d/ },
      { policyText: "At least one uppercase letter", passingRegularExpression: /[A-Z]/ },
    ],
  },
} as ComponentMeta<typeof CognitoResetPasswordFormComponent>;

export default StoryDetails;

export const CognitoResetPasswordForm = (args) => {
  return <CognitoResetPasswordFormComponent {...args} />;
};
