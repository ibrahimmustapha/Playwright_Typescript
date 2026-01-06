import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30000,
  fullyParallel: true,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    headless: true,
    actionTimeout: 0,
  },

  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
