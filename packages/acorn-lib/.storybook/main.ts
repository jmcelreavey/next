import type { StorybookConfig } from "@storybook/nextjs";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../apps/admin-site/**/*.mdx",
    "../apps/admin-site/**/*.stories.@(js|jsx|ts|tsx)",
    "../apps/customer-site/**/*.mdx",
    "../apps/customer-site/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/acorn-lib/**/*.mdx",
    "../packages/acorn-lib/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  staticDirs: ["../packages/acorn-lib/acorn-ui/content/Icons"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
