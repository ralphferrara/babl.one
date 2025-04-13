import {
      Kysely,
      MysqlDialect,
      // Removed Generated, ColumnType - no longer needed here if defined in generated types
      Insertable // Utility type for insert data
  } from 'kysely';
  import { createPool } from 'mysql2';
  
  // --- 1. Import Generated Types ---
  // Adjust the path './database-types' if your generated file is elsewhere
  // relative to this insertLogin.ts file. If both are in 'src', this path is correct.
  import { Database } from './database-types';
  
  // --- MANUAL INTERFACES REMOVED ---
  // interface LoginsTable { ... } // Removed
  // interface Database { ... } // Removed
  
  // --- 2. Database Configuration ---
  // (Keep your dbConfig as it was)
  const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      database: process.env.DB_NAME || 'sonata_next',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'bablone!',
      connectionLimit: 10,
  };
  
  // --- 3. Create Kysely Instance ---
  const dialect = new MysqlDialect({
      pool: createPool(dbConfig)
  });
  
  // Create the Kysely instance using the imported Database interface
  const db = new Kysely<Database>({ // <-- Uses imported Database type
      dialect,
  });
  
  // --- 4. Define Insert Function ---
  // Define the type for data needed to insert a login record using the imported types
  // This ensures compatibility with the generated schema definitions
  type LoginInsertData = Insertable<Database['logins']>; // Use Database['logins']
  
  async function insertLoginRecord(loginData: LoginInsertData) {
      console.log('Attempting to insert login record:', loginData);
      try {
          const result = await db.insertInto('logins')
              .values(loginData)
              .execute(); // Use .execute()
  
          console.log('Successfully inserted login record.');
          const insertId = result.length > 0 && result[0].insertId ? result[0].insertId.toString() : 'N/A';
          console.log(`Inserted ID: ${insertId}`);
  
          return { success: true, insertedId: insertId };
  
      } catch (error) {
          console.error('Error inserting login record:', error);
          throw error;
      }
  }
  
  // --- 5. Example Usage ---
  // (Keep your main function as it was)
  async function main() {
      try {
          const uniqueEmail = `user_${Date.now()}@example.com`;
          await insertLoginRecord({
              fid_user: 101,
              login_email: uniqueEmail,
              login_password: 'a_securely_hashed_password',
              login_status: 'AC',
              // Other fields like login_verified_phone/email will use DB defaults
              // if the generated types mark them as optional for inserts
              // (which kysely-codegen usually does correctly for columns with defaults).
          });
  
      } catch (error) {
          console.error('An error occurred during the main execution:', error);
      } finally {
          // --- 6. Clean up: Destroy the connection pool ---
          console.log('Closing database connection pool...');
          await db.destroy();
          console.log('Connection pool closed.');
      }
  }
  
  // --- Run the main function ---
  main();