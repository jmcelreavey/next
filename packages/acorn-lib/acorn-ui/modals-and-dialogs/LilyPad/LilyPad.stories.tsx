import type { Meta, Story } from "@storybook/react";
import { Button, ModalBackDrop } from "morse-react";
import type { MouseEvent} from "react";
import { useEffect, useState } from "react";
import type { LilyPadProps } from "./LilyPad";
import { LilyPad } from "./LilyPad";

export default {
  component: LilyPad,
  argTypes: {
    children: { control: "text", defaultValue: "Text in a LilyPad" },
    backdrop: {
      control: {
        type: "inline-radio",
        options: ModalBackDrop,
      },
    },

    anchorOrigin: {
      control: {
        type: "inline-radio",
        options: LilyPad.Position,
      },
    },

    LilyPadOrigin: {
      control: {
        type: "inline-radio",
        options: LilyPad.Position,
      },
    },

    draggable: { control: "boolean", defaultValue: false },
    anchorElementClickable: { control: "boolean", defaultValue: false },
  },
} as Meta;

const Template: Story<LilyPadProps> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? true);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <LilyPad
      {...args}
      isOpen={isOpen}
      onRequestClose={() => {
        !args.draggable && setIsOpen(false);
      }}
    >
      {args.children ?? <p>This is the content</p>}
    </LilyPad>
  );
};

export const DefaultLilyPad = Template.bind({});
DefaultLilyPad.args = {
  isOpen: true,
};

export const DimmedBackdrop = Template.bind({});
DimmedBackdrop.args = {
  isOpen: true,
  backdrop: ModalBackDrop.Dimmed,
};

export const DraggableLilyPad = Template.bind({});
DraggableLilyPad.args = {
  isOpen: true,
  backdrop: ModalBackDrop.Dimmed,
  draggable: true,
};

export const AnchoredLilyPad: Story<LilyPadProps> = (args) => {
  const [LilyPadAnchor, setLilyPadAnchor] = useState<HTMLButtonElement | null>(null);
  const LilyPadOpen = !!LilyPadAnchor;

  return (
    <>
      <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          setLilyPadAnchor(e.currentTarget);
        }}
      >
        LilyPad below is attached to me
      </Button>

      <LilyPad
        {...args}
        isOpen={LilyPadOpen}
        anchorElement={LilyPadAnchor}
        size={{ width: "matchAnchor", height: "auto" }}
        onRequestClose={() => {
          setLilyPadAnchor(null);
        }}
      >
        {args.children}
      </LilyPad>
    </>
  );
};
AnchoredLilyPad.args = {
  children: "I'm a LilyPad attached to the button above",
};

export const AnchoredLilyPadWithMinimumWidth: Story<LilyPadProps> = (args) => {
  const [LilyPadAnchor1, setLilyPadAnchor1] = useState<HTMLButtonElement | null>(null);
  const LilyPadOpen1 = !!LilyPadAnchor1;

  const [LilyPadAnchor2, setLilyPadAnchor2] = useState<HTMLButtonElement | null>(null);
  const LilyPadOpen2 = !!LilyPadAnchor2;

  return (
    <>
      <div>
        <Button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            setLilyPadAnchor1(e.currentTarget);
          }}
        >
          LilyPad with wide content
        </Button>

        <LilyPad
          {...args}
          isOpen={LilyPadOpen1}
          anchorElement={LilyPadAnchor1}
          size={{ width: "minimumAnchor", height: "auto" }}
          onRequestClose={() => {
            setLilyPadAnchor1(null);
          }}
        >
          I'm a LilyPad much longer than my puny anchor - notice how I am as wide as I need to be.
        </LilyPad>
      </div>
      <div>
        <Button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            setLilyPadAnchor2(e.currentTarget);
          }}
        >
          LilyPad with very small content
        </Button>

        <LilyPad
          {...args}
          isOpen={LilyPadOpen2}
          anchorElement={LilyPadAnchor2}
          size={{ width: "minimumAnchor", height: "auto" }}
          onRequestClose={() => {
            setLilyPadAnchor2(null);
          }}
        >
          Small Content
        </LilyPad>
      </div>
    </>
  );
};

export const AnchoredLilyPadWithClickableAnchor: Story<LilyPadProps> = (args) => {
  const [LilyPadAnchor, setLilyPadAnchor] = useState<HTMLButtonElement | null>(null);
  const LilyPadOpen = !!LilyPadAnchor;

  return (
    <>
      <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (LilyPadOpen) {
            alert("You clicked the anchor while the lily pad was open");
          }
          setLilyPadAnchor(e.currentTarget);
        }}
      >
        When the LilyPad is open you can still interact with me
      </Button>
      <Button
        className="u-marg-left"
        onClick={() => {
          alert("This button was clickable when you clicked it");
        }}
      >
        But you can't interact with me when the LilyPad is open
      </Button>

      <LilyPad
        {...args}
        isOpen={LilyPadOpen}
        anchorElementClickable
        anchorElement={LilyPadAnchor}
        onRequestClose={() => {
          setLilyPadAnchor(null);
        }}
      >
        {args.children}
      </LilyPad>
    </>
  );
};
AnchoredLilyPadWithClickableAnchor.args = {
  children: "I'm a LilyPad attached to the button above",
  anchorElementClickable: true,
};

export const SnappyAnchoredLilyPadY: Story<LilyPadProps> = (args) => {
  const [LilyPadAnchor, setLilyPadAnchor] = useState<HTMLButtonElement | null>(null);
  const LilyPadOpen = !!LilyPadAnchor;

  return (
    <>
      {[...Array(20)].map((_, index) => (
        <p key={index}>Filler text</p>
      ))}
      <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          setLilyPadAnchor(e.currentTarget);
        }}
      >
        LilyPad below is attached to me
      </Button>

      <LilyPad
        {...args}
        isOpen={LilyPadOpen}
        anchorElement={LilyPadAnchor}
        onRequestClose={() => {
          setLilyPadAnchor(null);
        }}
        size={{ width: "matchAnchor", height: "auto" }}
      >
        {args.children}
      </LilyPad>

      {[...Array(20)].map((_, index) => (
        <p key={index}>Filler text</p>
      ))}
    </>
  );
};
SnappyAnchoredLilyPadY.storyName = "Snappy Anchored LilyPad (Top Bottom)";
SnappyAnchoredLilyPadY.args = {
  children:
    "I'm a LilyPad attached to the bottom left of the button, but I will snap to the top if there's no room for me below",
};

export const SnappyAnchoredLilyPadX: Story<LilyPadProps> = (args) => {
  const [LilyPadAnchor, setLilyPadAnchor] = useState<HTMLButtonElement | null>(null);
  const LilyPadOpen = !!LilyPadAnchor;

  return (
    <div className="u-flex u-flex-wrap-none">
      {[...Array(35)].map((_, index) => (
        <p key={index}>Filler text</p>
      ))}
      <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          setLilyPadAnchor(e.currentTarget);
        }}
      >
        LilyPad below is attached to me
      </Button>

      <LilyPad
        {...args}
        isOpen={LilyPadOpen}
        anchorElement={LilyPadAnchor}
        onRequestClose={() => {
          setLilyPadAnchor(null);
        }}
        size={{ width: "matchAnchor", height: "auto" }}
      >
        {args.children}
      </LilyPad>

      {[...Array(15)].map((_, index) => (
        <p key={index}>Filler text</p>
      ))}
    </div>
  );
};
SnappyAnchoredLilyPadX.storyName = "Snappy Anchored LilyPad (Left Right)";
SnappyAnchoredLilyPadX.args = {
  children:
    "I'm a LilyPad attached to the top right of the button, but I will snap to the left if there's no room for me to the right",
  anchorOrigin: LilyPad.Position.TopRight,
};
