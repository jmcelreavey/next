import type {Meta, StoryObj} from "@storybook/react";
import { Button, Heading } from "morse-react";
import React from "react";
import Logo from "../../content/Brand/acorn-logo-blue.svg";
import { Brand } from "../../content/Brand/Brand";
import { Content } from "../../content/Content/Content";
import { Footer } from "../../footer/Footer";
import { Header } from "../../header/Header";
import { Wrap } from "../../wrap/Wrap";
import { Nav } from "./../../navigation/Nav/Nav";
import { Website } from "./Website";

const meta: Meta<typeof Website> = {
  component: Website,
  tags: ["autodocs"],
};

export default meta;

/**
 * The `<Website>` component is an alternative wrapper component
 * for the `<App>' component.
 *
 * It allows you to use the same components but creates an alternative
 * layout specifically for websites.
 *
 */

export const Example: StoryObj<typeof Website> = {
  render: () => (
    <Website>
      <Header>
        <Wrap>
          <Brand>
            <img src={Logo.src} alt="Logo" />
          </Brand>
          <Nav>
            <Nav.Item>
              <a href="/">Home</a>
            </Nav.Item>
            <Nav.Item>
              <a href="/">About Us</a>
            </Nav.Item>
            <Nav.Item>
              <a href="/">FAQs</a>
            </Nav.Item>
            <Nav.Item>
              <a href="/">Contact Us</a>
            </Nav.Item>
          </Nav>
        </Wrap>
      </Header>
      <Wrap>
        <div className="p-hero__content">
          <Heading level={Heading.Level.H1}>Find out more about us</Heading>
          <Heading level={Heading.Level.H2}>Lorem ipsum dolor</Heading>
          <Button>Find out more</Button>
        </div>
        <div className="p-hero__graphic">
          <img src="https://source.unsplash.com/3tYZjGSBwbk" alt="" />
        </div>
      </Wrap>
      <Content>
        <Wrap></Wrap>
      </Content>
      <Footer>
        <Wrap>Copyright &copy; Acorn 2023</Wrap>
      </Footer>
    </Website>
  ),
};
