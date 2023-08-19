import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import css from "rollup-plugin-css-porter";

const commonConfig = {
	input: "src/index.tsx",
	external: [
		"react",
		"clsx",
		"react/jsx-runtime",
		"react-router-dom",
		"browser-image-compression",
		"react-confetti",
	],
};

const dtsConfig = {
	...commonConfig,
	plugins: [dts(), css({ dest: "dist/index.css" })],
	output: {
		file: "dist/index.d.ts",
		format: "es",
		exports: "named",
	},
};

const jsConfig = {
	...commonConfig,
	plugins: [
		swc(
			defineRollupSwcOption({
				minify: true,
			})
		),
		postcss({
			plugins: [autoprefixer()],
			extract: true,
			minimize: true,
		}),
	],
	output: [
		{
			file: "dist/index.js",
			format: "es",
			exports: "named",
		},
		{
			file: "dist/index.cjs",
			format: "cjs",
			exports: "named",
		},
	],
};

export default [dtsConfig, jsConfig];
