import { defineConfig } from 'vitest/config';

export default defineConfig({
   test: {
      coverage: {
         reporter: ['text', 'json', 'html'],
         statements: 100,
         branches: 100,
         functions: 100,
         lines: 100
      }
   }
});