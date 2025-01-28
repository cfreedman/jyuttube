import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    rollupOptions: 
      {
        input: ["./index.html", "./src/content-scripts/main.ts"],
        output: {
          entryFileNames: (chunk) => {
            if (chunk.facadeModuleId?.includes("index.html")) {
              return "main.js"
            } else {
              return "content.js"
            }
          }
        }
      },
  }
})
