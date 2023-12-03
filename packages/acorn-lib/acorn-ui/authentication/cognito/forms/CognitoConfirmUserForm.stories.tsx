import type { ComponentMeta } from "@storybook/react";
import { CognitoConfirmUserForm as CognitoConfirmUserFormComponent } from "./CognitoConfirmUserForm";

const StoryDetails = {
  component: CognitoConfirmUserFormComponent,
  argTypes: { handleCancel: { action: "called" } },
} as ComponentMeta<typeof CognitoConfirmUserFormComponent>;

export default StoryDetails;

export const CognitoConfirmUserForm = (args) => {
  return (
    <CognitoConfirmUserFormComponent
      {...args}
      challengeCommunicationMethod={{ medium: "email", destination: "a*****@g****.com" }}
    />
  );
};
