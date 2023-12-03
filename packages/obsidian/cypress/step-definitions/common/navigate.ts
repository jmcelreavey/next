import { Given } from "@gcdtech/obsidian";

Given(`On {} I navigate to {}`, (site: string, url: string) => {
  const siteObj = {
    cpms: "http://localhost:3010",
    admin: "http://localhost:3010",
    customer: "http://localhost:3005",
  };
  cy.visit(siteObj[site.toLowerCase()] + url);
});

// On admin I navigate to
// On customer I navigate to
