import { StoryContext } from "@storybook/react";

export const multiSiteThemeLoadingDecorator = (
  story,
  context: StoryContext
) => {
  // Load the appropriate SCSS file based on the story path
  if (context.parameters.fileName.includes("customer-site")) {
    require("../apps/customer-site/src/styles/customer.scss");
  } else {
    require("../apps/admin-site/src/styles/admin.scss");
  }

  // Return the story
  return story();
};

multiSiteThemeLoadingDecorator;
