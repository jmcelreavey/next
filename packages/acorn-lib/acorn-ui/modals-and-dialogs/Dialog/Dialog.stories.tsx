import type { Meta, Story } from "@storybook/react";
import { Button, ButtonBar } from "morse-react";
import { useState } from "react";
import { AcornIcon } from "../../content/Icons/AcornIcon";
import { Title } from "../../content/Title/Title";
import { TextBoxInput } from "../../inputs/TextBox/TextBoxInput";
import { InjectedElementContainer } from "../../utility/InjectedElementContext";
import type { DialogProps } from "./Dialog";
import { Dialog, DialogStretch } from "./Dialog";
import { useDialogContext } from "./DialogContext";
import { useDialog } from "./useDialog";

export default {
  component: Dialog,
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Your dialog can contain any content.",
    },
    stretch: { control: "select", options: DialogStretch },
  },
  decorators: [
    (Story) => (
      <InjectedElementContainer>
        <Story />
      </InjectedElementContainer>
    ),
  ],
} as Meta;

const TestDialog = (props: DialogProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const dialogContext = useDialogContext<string>();

  return (
    <Dialog {...props}>
      <Dialog.Frame>
        <Dialog.Head className="ac-layout +spaced-apart">
          <Title>Hello </Title>
          <Button
            className="+quiet +icon"
            onClick={() => dialogContext.close()}
            icon={AcornIcon.Action.X}
          ></Button>
        </Dialog.Head>
        <Dialog.Body>
          <p>This is body content</p>
          <TextBoxInput
            name="test"
            placeholder="Enter a value..."
            value={value}
            onValueChange={(value) => setValue(value)}
          />
        </Dialog.Body>
        <Dialog.Foot>
          <ButtonBar>
            <Button onClick={() => dialogContext.close(value)}>Submit</Button>
          </ButtonBar>
        </Dialog.Foot>
      </Dialog.Frame>
    </Dialog>
  );
};

const DialogTemplate: Story<DialogProps> = (args) => {
  const dialog = useDialog();

  return (
    <>
      <Button
        onClick={async () => {
          const returnValue = await dialog.show(<TestDialog {...args} />);

          alert(returnValue);
        }}
      >
        Show Dialog
      </Button>
    </>
  );
};

export const SimpleDialog = DialogTemplate.bind({});
