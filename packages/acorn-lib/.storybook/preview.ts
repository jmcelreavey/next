import type { Preview } from "@storybook/react";
import { multiSiteThemeLoadingDecorator } from "./decorators";
import "../apps/admin-site/src/styles/admin.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [multiSiteThemeLoadingDecorator],
};

export default preview;
