import { describe, it, expect, vi, beforeEach } from 'vitest';
import Chirp from '../index';

describe('Chirp Class', () => {

      beforeEach(() => {
            vi.useFakeTimers();

            globalThis.window = {
                  location: {
                        hostname: 'mocked.example.com'
                  },
                  localStorage: {
                        setItem : ( key : string ) => "",
                        getItem : ( key : string ) => "csrf_test_token"
                  }
            } as any;
      });

      it('should initialize with default values', () => {
            const chirp = new Chirp('test', '/fail');
            expect(chirp.status).toBe('PENDING');
            expect(chirp.http).toBe(100);
            expect(chirp.route).toBe('/fail');
            expect(chirp.domain).toBe(window.location.hostname.replace(/^www\./i, '').toLowerCase());
      });

      it('should set mock response data and delay', async () => {
            const chirp = new Chirp('test', '/fail');
            chirp.mock({ greeting: 'hello' }, 200, {
                  message: 'MOCK OK',
                  route: '/mock',
                  ttl: 123,
                  headers: { 'x-test': 'yes' },
                  delay: 10
            });

            const promise = chirp.execute();           // start async logic
            vi.advanceTimersByTime(10);                // fire the fake timer
            await promise;                             // now await the promise

            expect(chirp.mockMode).toBe(true);
            expect(chirp.responsePayload.data).toEqual({ greeting: 'hello' });
            expect(chirp.responsePayload.status).toBe(200);
            expect(chirp.responsePayload.message).toBe('MOCK[MOCK OK]');
            expect(chirp.responsePayload.headers).toEqual({ 'x-test': 'yes' });

            expect(chirp.status).toBe('SUCCESS');
            expect(chirp.http).toBe(200);
      });

      it('should return undefined from data() if not successful', () => {
            const chirp = new Chirp('test', '/fail');
            expect(chirp.data('any')).toBeUndefined();
      });

      it('should set the CSRF token into localStorage', () => {
            const chirp = new Chirp('test', '/fail');
            chirp.setCSRF('csrf_test_token');
            expect(window.localStorage.getItem('csrf')).toBe('csrf_test_token');
      });

      it('should attach x-csrf-token header if present in localStorage', () => {
            const chirp = new Chirp('test', '/fail');
            window.localStorage.setItem('csrf', 'csrf_test_token');
            chirp.csrf();
            expect(chirp.headers.get('x-csrf-token')).toBe('csrf_test_token');
      });


});
