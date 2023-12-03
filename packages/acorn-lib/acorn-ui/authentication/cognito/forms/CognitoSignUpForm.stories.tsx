import type { ComponentMeta } from "@storybook/react";
import { CognitoSignUpForm as CognitoSignUpFormComponent } from "./CognitoSignUpForm";

const StoryDetails = {
  component: CognitoSignUpFormComponent,
  argTypes: { handleForgotPassword: { action: "handle-forgot-password" } },
  args: {
    passwordPolicies: [
      "be at least 8 characters long",
      "contain words from hebrew",
      "be a pallindrome in English and Greek",
    ],
  },
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
} as ComponentMeta<typeof CognitoSignUpFormComponent>;

export default StoryDetails;

export const CognitoSignUpForm = (args) => {
  return <CognitoSignUpFormComponent {...args} />;
};
