import type { ComponentMeta } from "@storybook/react";
import { CognitoChangePasswordForm as CognitoChangePasswordFormComponent } from "./CognitoChangePasswordForm";

const StoryDetails = {
  component: CognitoChangePasswordFormComponent,
  argTypes: { handleCancel: { action: "called" } },
  args: {
    passwordPolicies: [
      {
        policyText: "Minimum of 6 characters long",
        passingRegularExpression: /^.{6,}$/,
      },
      { policyText: "At least one number", passingRegularExpression: /\d/ },
      { policyText: "At least one uppercase letter", passingRegularExpression: /[A-Z]/ },
    ],
  },
} as ComponentMeta<typeof CognitoChangePasswordForm>;

export default StoryDetails;

export const CognitoChangePasswordForm = (args) => {
  return <CognitoChangePasswordFormComponent {...args} />;
};
