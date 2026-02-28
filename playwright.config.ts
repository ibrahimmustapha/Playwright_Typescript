import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: 1,
  expect: {
    timeout: 5_000,
  },
  reporter: "allure-playwright",
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: true,
    actionTimeout: 10_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
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
