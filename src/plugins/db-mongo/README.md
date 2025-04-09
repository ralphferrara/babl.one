# babl.one Plugin :: @babl.one/db-mongo

This plugin provides MongoDB-based access using `app.mongo(name)`.

## Overview

The **MongoDB Database Plugin** integrates MongoDB support into your application. It allows you to manage multiple MongoDB connections using the `app.db(name)` function. MongoDB instances can be configured with their connection details via the `config/mongo.json` file.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
      ```bash
      npm install @babl.one/mongo
      ```

## Configuration

The plugin reads the MongoDB configuration from a `mongo.json` file located in the `/config` folder. Each instance of MongoDB should be defined with the following structure:

### /config/mongo.json

```json
{
	"default": {
		"host"      : "localhost",
		"port"      : 27017,
		"database"  : "mydb"
	},
	"secondary": {
		"host"      : "localhost",
		"port"      : 27018,
		"database"  : "secondarydb"
	}
}
```

### Fields:

- `host`    : The MongoDB host address.
- `port`    : The port on which MongoDB is running.
- `database`: The database to connect to.

## API

### app.mongo(name: string)

- Returns the MongoDB instance configured with the specified `name`.

## Example Usage

After configuration, you can access the MongoDB instance like so:

```ts
const db = app.mongo("default"); // Default MongoDB instance
```

### Closing Connections

The plugin automatically handles the closing of all MongoDB connections when the application shuts down.

```ts
app.defer(async () => {
	// All MongoDB instances will be closed here
});
```

## License

This project is licensed under the MIT License.
