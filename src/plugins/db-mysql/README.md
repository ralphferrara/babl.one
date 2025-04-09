
# babl.one Plugin :: @babl.one/db-mysql

This plugin provides MySQL-based database access using `app.mysql(name)`.

## Overview

The **MySQL Database Plugin** integrates MySQL support into your application. It allows you to manage multiple MySQL connections using the `app.mysql(name)` function. MySQL instances can be configured with their connection details via the `config/mysql.json` file.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/mysql
    ```

## Configuration

The plugin reads the MySQL configuration from a `mysql.json` file located in the `/config` folder. Each instance of MySQL should be defined with the following structure:

### /config/mysql.json

```json
{
    "default": {
        "host"      : "localhost",
        "username"  : "root",
        "password"  : "password",
        "database"  : "mydb",
        "charset"   : "utf8mb4"
    },
    "secondary": {
        "host"      : "localhost",
        "username"  : "root",
        "password"  : "password",
        "database"  : "secondarydb",
        "charset"   : "utf8mb4"
    }
}
```

### Fields:

- `host`      : The MySQL host address.
- `username`  : The MySQL username.
- `password`  : The MySQL password.
- `database`  : The database to connect to.
- `charset`   : The charset for the connection (default: `utf8mb4`).

## API

### app.mysql(name: string)

- Returns the MySQL instance configured with the specified `name`.

## Example Usage

After configuration, you can access the MySQL instance like so:

```ts
const db = app.mysql("default"); // Default MySQL instance
```

### Closing Connections

The plugin automatically handles the closing of all MySQL connections when the application shuts down.

```ts
app.defer(async () => {
    // All MySQL instances will be closed here
});
```

## License

This project is licensed under the MIT License.
