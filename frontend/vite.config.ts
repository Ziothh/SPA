import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  logLevel: "silent"
//   resolve: {
//       alias: {
//           "@components": path.resolve(__dirname, "./src/components")
//       }
//   }
//   root: "./public",
})
