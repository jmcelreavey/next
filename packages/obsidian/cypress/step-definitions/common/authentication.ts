import { userList } from "../../fixtures";
import { Given, Step } from "@gcdtech/obsidian";
import { homePageObject } from "../../fixtures/admin/homepage.page";

Given("I log in to {}", (user: string) => {
  Step(this, "On cpms I navigate to /");
  cy.field(homePageObject, "Email").type("admin@gcdtech.com");
  cy.field(homePageObject, "Pin").type("1234");
  cy.field(homePageObject, "Sign in with credentials").click();
});
