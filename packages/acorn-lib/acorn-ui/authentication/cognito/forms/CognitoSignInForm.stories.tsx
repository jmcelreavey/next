import type { ComponentMeta } from "@storybook/react";
import { CognitoSignInForm as CognitoSignInFormComponent } from "./CognitoSignInForm";

const StoryDetails = {
  component: CognitoSignInFormComponent,
  argTypes: { handleForgotPassword: { action: "handle-forgot-password" } },
  args: {
    email: "jsmith@gmail.com",
  },
} as ComponentMeta<typeof CognitoSignInFormComponent>;

export default StoryDetails;

export const CognitoSignInForm = (args) => {
  return <CognitoSignInFormComponent {...args} />;
};
