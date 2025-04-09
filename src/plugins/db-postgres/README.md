
# babl.one Plugin :: @babl.one/db-postgres

This plugin provides PostgreSQL-based database access using `app.postgres(name)`.

## Overview

The **PostgreSQL Database Plugin** integrates PostgreSQL support into your application. It allows you to manage multiple PostgreSQL connections using the `app.postgres(name)` function. PostgreSQL instances can be configured with their connection details via the `config/postgres.json` file.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/postgres
    ```

## Configuration

The plugin reads the PostgreSQL configuration from a `postgres.json` file located in the `/config` folder. Each instance of PostgreSQL should be defined with the following structure:

### /config/postgres.json

```json
{
    "default": {
        "host"      : "localhost",
        "port"      : 5432,
        "username"  : "root",
        "password"  : "password",
        "database"  : "mydb"
    },
    "secondary": {
        "host"      : "localhost",
        "port"      : 5433,
        "username"  : "root",
        "password"  : "password",
        "database"  : "secondarydb"
    }
}
```

### Fields:

- `host`      : The PostgreSQL host address.
- `port`      : The port on which PostgreSQL is running.
- `username`  : The PostgreSQL username.
- `password`  : The PostgreSQL password.
- `database`  : The database to connect to.

## API

### app.postgres(name: string)

- Returns the PostgreSQL instance configured with the specified `name`.

## Example Usage

After configuration, you can access the PostgreSQL instance like so:

```ts
const db = app.postgres("default"); // Default PostgreSQL instance
```

### Closing Connections

The plugin automatically handles the closing of all PostgreSQL connections when the application shuts down.

```ts
app.defer(async () => {
    // All PostgreSQL instances will be closed here
});
```

## License

This project is licensed under the MIT License.
