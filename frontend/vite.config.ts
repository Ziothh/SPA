import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(), 
    svgr(), 
    react(),
    reactRefresh()
],
//   resolve: {
//       alias: {
//           "@components": path.resolve(__dirname, "./src/components")
//       }
//   }
//   root: "./public",
})
