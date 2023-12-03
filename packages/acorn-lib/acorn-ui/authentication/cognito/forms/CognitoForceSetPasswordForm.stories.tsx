import type { ComponentMeta } from "@storybook/react";
import { CognitoForceSetPasswordForm as CognitoForceSetPasswordFormComponent } from "./CognitoForceSetPasswordForm";

const StoryDetails = {
  component: CognitoForceSetPasswordFormComponent,
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
} as ComponentMeta<typeof CognitoForceSetPasswordFormComponent>;

export default StoryDetails;

export const CognitoForceSetPasswordForm = (args) => {
  return <CognitoForceSetPasswordFormComponent {...args} />;
};
