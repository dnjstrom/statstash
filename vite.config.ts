import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import tailwindcss from "@tailwindcss/vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Avoid CORS issues with CouchDB running in Docker
      "/db": {
        target: "http://localhost:5984",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/db/, ""),
      },
    },
  },
  plugins: [
    preact(),
    tailwindcss(),
    nodePolyfills(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "StatStash",
        short_name: "StatStash",
        description: "Stores your character sheets",
        theme_color: "#051922",
        background_color: "#051922",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
})
