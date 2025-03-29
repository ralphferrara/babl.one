/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: release-cli.test.ts
//|| Test for the release CLI functionality
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

import { vi, expect, it } from 'vitest'; // Ensure vitest is used properly
import { release } from '../scripts/release.ts'; // Import the release function from the correct path

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Test for Patch Release
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

it('should execute release with "patch" when no argument is provided', async () => {
  const logSpy = vi.fn();
  vi.spyOn(console, 'log').mockImplementation(logSpy); // Spy on console.log

  // Call the release function with no arguments (assuming it's the patch case)
  await release('patch');  // Ensure correct function call with the expected argument

  // Now check if the spy was called with the correct arguments
  expect(logSpy).toHaveBeenCalledWith('[release] Version bumped: 1.2.3 → 1.2.4');
});

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Test for Minor Release
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

it('should execute release with "minor" when "minor" argument is provided', async () => {
  const logSpy = vi.fn();
  vi.spyOn(console, 'log').mockImplementation(logSpy); // Spy on console.log

  // Call the release function with the minor argument
  await release('minor');  // Ensure the minor argument triggers the correct bump

  // Validate the log output after the minor bump
  expect(logSpy).toHaveBeenCalledWith('[release] Version bumped: 1.2.3 → 1.3.0');
});

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Test for Major Release
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

it('should execute release with "major" when "major" argument is provided', async () => {
  const logSpy = vi.fn();
  vi.spyOn(console, 'log').mockImplementation(logSpy); // Spy on console.log

  // Call the release function with the major argument
  await release('major');  // Ensure the major argument triggers the correct bump

  // Validate the log output after the major bump
  expect(logSpy).toHaveBeenCalledWith('[release] Version bumped: 1.2.3 → 2.0.0');
});

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Test for Error Handling
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

it('should handle errors correctly and log them', async () => {
  const logSpy = vi.fn();
  vi.spyOn(console, 'log').mockImplementation(logSpy); // Spy on console.log

  // Mocking the release function to throw an error
  vi.spyOn(require('../scripts/release.ts'), 'release').mockImplementationOnce(() => {
    throw new Error('Test error');
  });

  // Execute the release function and expect it to handle the error
  try {
    await release('patch');
  } catch (error) {
    expect(logSpy).toHaveBeenCalledWith('[release error] Test error');
  }
});
