import { defineConfig, devices } from '@playwright/test';
import { EnvironmentManager } from './src/core/EnvironmentManager';

EnvironmentManager.loadEnvironment();


export default defineConfig({
  testDir: './tests',
  /*Maximum execution time for a single test. */
  timeout: 30000,
  /*Maximum wait time for assertions. */
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Limit parallel workers on CI for stable resource usage. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['line'],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ["allure-playwright"]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: EnvironmentManager.getBaseURL(),

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",

    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
  {
    name: "chromium",
    testMatch: /.*tests\/ui\/.*\.spec\.ts/,
    use: {
      ...devices["Desktop Chrome"],
    },
  },

  {
    name: "firefox",
    testMatch: /.*tests\/ui\/.*\.spec\.ts/,
    use: {
      ...devices["Desktop Firefox"],
    },
  },

  {
    name: "webkit",
    testMatch: /.*tests\/ui\/.*\.spec\.ts/,
    use: {
      ...devices["Desktop Safari"],
    },
  },

  {
    name: "api",
    testMatch: /.*tests\/api\/.*\.spec\.ts/,
  },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
