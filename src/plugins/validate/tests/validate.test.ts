/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| vitest :: validate.test.ts
//|| Tests for Validate class
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

import { describe, it, expect } from 'vitest';
import Validate from '../index';

describe('Validate', () => {

   it('validates phone numbers', () => {
      expect(Validate.phone('+1 (555) 123-4567')).toBe(true);
      expect(Validate.phone('123')).toBe(false);
   });

   it('validates emails', () => {
      expect(Validate.email('test@example.com')).toBe(true);
      expect(Validate.email('invalid-email')).toBe(false);
   });

   it('validates usernames', () => {
      expect(Validate.username('valid_user', [], [])).toBe(true);
      expect(Validate.username('in*valid', [], [])).toBe('VUN001');
      expect(Validate.username('modword', ['mod'], [])).toBe('VUN004');
      expect(Validate.username('banned', [], ['ban'])).toBe('VUN005');
   });

   it('validates 6-digit verification codes', () => {
      expect(Validate.verification('123456')).toBe(true);
      expect(Validate.verification('abc123')).toBe(false);
   });

   it('validates passwords', () => {
      expect(Validate.password('strongPass123')).toBe(true);
      expect(Validate.password('short')).toBe(false);
   });

   it('validates gender', () => {
      expect(Validate.gender('male', { male: 'Male', female: 'Female' })).toBe(true);
      expect(Validate.gender('other', { male: 'Male', female: 'Female' })).toBe(false);
   });

   it('validates DOB', () => {
      const valid18 = new Date();
      valid18.setFullYear(valid18.getFullYear() - 18);
      expect(Validate.dob(valid18.toISOString().slice(0, 10))).toBe(true);
      expect(Validate.dob('2020-01-01')).toBe(false);
   });

   it('validates non-blank strings', () => {
      expect(Validate.blank('hello')).toBe(true);
      expect(Validate.blank('   ')).toBe(false);
   });

   it('validates minimum length', () => {
      expect(Validate.minLength('hello', 3)).toBe(true);
      expect(Validate.minLength('hi', 3)).toBe(false);
   });

   it('validates in array', () => {
      expect(Validate.inArray('apple', ['apple', 'banana'])).toBe(true);
      expect(Validate.inArray('pear', ['apple', 'banana'])).toBe(false);
   });

   it('validates credit card number', () => {
      expect(Validate.creditCardNumber('4111111111111111')).toBe(true);
      expect(Validate.creditCardNumber('1234567890123456')).toBe(false);
   });

   it('validates credit card expiration', () => {
      const now = new Date();
      expect(Validate.creditCardExpiration(now.getMonth() + 1, now.getFullYear())).toBe(true);
      expect(Validate.creditCardExpiration(1, 2000)).toBe(false);
   });

   it('validates CVV', () => {
      expect(Validate.cvv('4111111111111111', '123')).toBe(true);
      expect(Validate.cvv('371449635398431', '1234')).toBe(true); // AMEX
      expect(Validate.cvv('4111111111111111', '12')).toBe(false);
   });

   it('validates amount format', () => {
      expect(Validate.amount('10.99')).toBe(true);
      expect(Validate.amount('10.999')).toBe(false);
   });

   it('validates numbers', () => {
      expect(Validate.number(42)).toBe(true);
      expect(Validate.number('not a number')).toBe(false);
   });

});
