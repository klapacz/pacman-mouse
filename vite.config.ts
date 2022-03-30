import { defineConfig } from "vite";

export default defineConfig({
  // @ts-ignore
  base: process.env.BASE_URL || "/",
});
