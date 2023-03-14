import { devices } from '@playwright/test';
const config = {
  testDir: './tests',
  timeout: 120 * 1000,
  expect: {
    timeout: 120000
  },
  reporter: 'html',

  fullyParallel: false,
  use: {
 
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  }

  
}
export default config;
