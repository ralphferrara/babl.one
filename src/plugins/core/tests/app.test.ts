import app                                                        from '../index';
import { describe, it, beforeAll, afterAll, expect, vi }          from 'vitest';

vi.mock('child_process', () => ({
      spawn: vi.fn(() => ({
            on: vi.fn(),
            stdout: { on: vi.fn() },
            stderr: { on: vi.fn() } 
      }))
}));

describe('babl.one :: app.ts', () => {

      beforeAll(async () => {
            await app.lock(false); // clear lock before test
      });

      afterAll(async () => {
            await app.lock(false); // cleanup lock
      });

      it('should acquire and release app lock', async () => {
            const acquired = await app.lock();
            expect(acquired).toBe(false); // not locked initially

            await app.lock(true); // acquire lock
            const isLocked = await app.lock();
            expect(isLocked).toBe(true);

            await app.lock(false); // release
            const released = await app.lock();
            expect(released).toBe(false);
      });

      it('should register and retrieve a plugin', () => {
            const dummyPlugin = { init: vi.fn(), __pluginName: 'dummy' };
            app.register('dummy', dummyPlugin);
            expect(app._plugins.get('dummy')).toBe(dummyPlugin);
      });

});