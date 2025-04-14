
# babl.one Plugin :: MySQL Database

## Overview
This plugin provides MySQL-based database access using `app.ky(name)` which returns the Kysely object for simple SQL generation. It leverages the **Kysely** library for SQL querying and allows you to generate TypeScript interfaces for the database schema using the `kysely-codegen` tool.

## Features
- Connects to a MySQL database using `app.db(name)`.
- Generates TypeScript interfaces for the database schema using **`kysely-codegen`**.
- Integrates seamlessly with **babl.one** framework.

## Installation
### Prerequisites
Make sure you have **Node.js** installed. You also need the `kysely-codegen` tool for generating TypeScript interfaces from the MySQL schema.

### Step 1: Install Dependencies
Install `kysely-codegen` as a development dependency in your project:

```bash
npm install kysely-codegen --save-dev
```

### Step 2: Install the Plugin
```bash
npm install '@babl.one/db-mysql-kysely@latest'
```
### Step 3: Configure MySQL
Configure your MySQL database in /config/mysql.json

### Step 4: Add app.use()
Add app.use to your index.ts file
```bash
      await app.use("db-mysql");
      await app.use("db-mysql-kysely");
```
### Step 5:  Generate your schema interfaces
```ts
      app.ky.generate("mysqlInstance", "../schema/mysqlInstance.ts");
```
and run your npm run dev
This will run the **`kysely-codegen`** tool, introspect the database schema, and output the TypeScript interfaces to the specified file.

### Step 6: Configure your schema 
Once the Kysely schema is created, you can register your mysql connection pool and your interfaces in your index.ts file

```ts
import { Database } from "../schema/mysqlInstance.ts";
app.ky.use<Database>("mysqlInstance");
```

### Step 7: Use it!
```ts
const result = await app.ky("mysqlInstance").insertInto('logins')
  .values({
    login_email: 'newuser@example.com',
    login_password: 'securePasswordHash',
    login_status: 'AC',  // Example of setting the status
  })
  .returning('*');
```


### Key Concepts
- **`app.ky.generate` method**: Generates TypeScript interfaces using `kysely-codegen` by querying the database schema.
- **`app.ky.use` method**: Registers an kysely instance
- **`app.ky(name)`**: A method that attaches the `Kysely` instance to the app

## License
This plugin is licensed under the MIT License.

