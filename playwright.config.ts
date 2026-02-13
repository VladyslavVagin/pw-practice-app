import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options'
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 600000,
  expect: {
    timeout: 20000
  },
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    globalsQaUrl: 'https://globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200'
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 },
      }
    }
  ]
});
