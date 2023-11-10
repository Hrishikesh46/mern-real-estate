import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // this will add 'http://localhost:8000' before 'api' everytime there is a /api request
        secure: false,
      },
    },
  },
  plugins: [react()],
});
