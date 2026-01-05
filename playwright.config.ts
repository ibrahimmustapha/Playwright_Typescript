import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    headless: false,
    actionTimeout: 0,
  },

  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "Firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "WebKit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     channel: "msedge", // runs Edge browser
    //   },
    // },
    // {
    //   name: "Google Chrome",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     channel: "chrome", // runs actual Google Chrome
    //   },
    // },
  ],
});
