import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				clientsClaim: false,
				skipWaiting: true,
			},
			devOptions: {
				enabled: true,
			},
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
			manifest: {
				name: "Youvote Admin",
				short_name: "Youvote Admin",
				description: "Admin panel for youvote ",
				theme_color: "#ffffff",
				start_url: "/",
				icons: [
					{
						src: "logo192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "logo512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "logo512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
		}),
	],
	optimizeDeps: {
		include: ["uicore"],
	},
	resolve: {
		alias: [
			{
				find: "uicore",
				replacement: path.resolve(__dirname, "./../../packages/uicore/dist"),
			},
		],
	},
});
