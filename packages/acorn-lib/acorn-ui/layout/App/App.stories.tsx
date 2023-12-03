import type {Meta, StoryObj} from "@storybook/react";
import { Alert, Button, ButtonBar, Icon, Pill } from "morse-react";
import { Brand } from "../../content/Brand/Brand";
import Logo from "../../content/Brand/acorn-logo-white.svg";
import { Content } from "../../content/Content/Content";
import { AcornIcon } from "../../content/Icons/AcornIcon";
import { Title } from "../../content/Title/Title";
import { Footer } from "../../footer/Footer";
import { Header } from "../../header/Header";
import { Masthead } from "../../masthead/Masthead";
import { Nav } from "../../navigation/Nav/Nav";
import { Sidebar } from "../../sidebar/Sidebar";
import { App } from "./App";

const meta: Meta<typeof App> = {
  component: App,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof App> = {
  render: () => (
    <App>
      <Brand>
        <img src={Logo.src} alt="Logo" />
      </Brand>
      <Masthead>
        <Button>Logout</Button>
      </Masthead>
      <Sidebar>
        <Nav primary>
          <Nav.Item>
            <a href="#" className="c-button +text">
              <Icon iconName={AcornIcon.All.Home} />
              Dashboard
            </a>
          </Nav.Item>
          <Nav.Item>
            <a href="#" className="c-button +text">
              <Icon iconName={AcornIcon.Business.Inventory} />
              Orders
            </a>
          </Nav.Item>
          <Nav.Item active>
            <a href="#" className="c-button +text">
              <Icon iconName={AcornIcon.People.Person} />
              Customers
              <Pill>456</Pill>
            </a>
          </Nav.Item>
          <Nav.Item>
            <a href="#" className="c-button +text">
              <Icon iconName={AcornIcon.Navigation.Settings} />
              Settings
            </a>
          </Nav.Item>
        </Nav>
      </Sidebar>
      <Header>
        <Header.Title>
          <Title>Customers</Title>
        </Header.Title>
        <Header.Actions>
          <Button className="+icon">
            <Icon iconName={AcornIcon.Action.AddCircle} className="c-button__icon" />
            <span className="c-button__text">Add Customer</span>
          </Button>
        </Header.Actions>
      </Header>
      <Content>
        <Alert color={Alert.Color.Negative}>No Customers Found</Alert>
      </Content>
      <Footer>
        <ButtonBar>
          <Button className="+secondary">Print Customer List</Button>
        </ButtonBar>
      </Footer>
    </App>
  ),
};
