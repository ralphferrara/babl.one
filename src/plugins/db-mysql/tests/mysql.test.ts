import { MySQLPlugin } from '../index.ts';
import app from '@babl.one/core';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// Assuming MySQLPlugin has a method to connect and interact with the DB
describe('MySQL Plugin', () => {
  let mysqlInstance: any;

  beforeAll(async () => {
    // Initialize MySQL Plugin
    await MySQLPlugin.init(app, './config/mysql.json');
    mysqlInstance = app.mysql('default');
  });

  it('should connect to the database', async () => {
    expect(mysqlInstance.status).toBe('OK');
  });

  it('should insert a record into logins table', async () => {
    const result = await mysqlInstance.db
      .insertInto('logins')
      .values({
        fid_user: 123, // example user ID
        login_phone: '1234567890', 
        login_email: 'test@example.com', 
        login_social: null, 
        login_status: 'AC', 
        login_verified_phone: 0, 
        login_verified_email: 1, 
        login_password: 'hashed_password'
      })
      .returning('id_login')
      .execute();

    expect(result[0].id_login).toBeDefined(); // Expecting a valid ID after insert
  });

  afterAll(async () => {
    // Close the MySQL instance after tests
    await mysqlInstance.close();
  });
});
