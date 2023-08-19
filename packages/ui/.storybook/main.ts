import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	framework: "@storybook/react-vite",
	docs: {
		autodocs: true,
	},
	core: {
		builder: "@storybook/builder-vite",
	},
	async viteFinal(config, _options) {
		// Add your configuration here
		return {
			...config,
			define: { "process.env": {} },
			resolve: {
				alias: [
					{
						find: "uicore",
						replacement: path.resolve(__dirname, "./../../uicore/dist"),
					},
				],
			},
		};
	},
};

export default config;
