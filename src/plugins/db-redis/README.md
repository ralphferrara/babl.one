
# babl.one Plugin :: @babl.one/db-redis

This plugin provides Redis-based caching using `app.cache(name)`.

## Overview

The **Redis Cache Plugin** integrates Redis-based caching into your application. It allows you to manage multiple Redis cache connections using the `app.cache(name)` function. Redis instances can be configured with their connection details via the `config/redis.json` file.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/redis
    ```

## Configuration

The plugin reads the Redis configuration from a `redis.json` file located in the `/config` folder. Each instance of Redis should be defined with the following structure:

### /config/redis.json

```json
{
    "default": {
        "host" : "localhost",
        "port" : 6379
    },
    "secondary": {
        "host" : "localhost",
        "port" : 6380
    }
}
```

### Fields:

- `host` : The Redis host address.
- `port` : The port on which Redis is running.

## API

### app.cache(name: string)

- Returns the Redis cache instance configured with the specified `name`.

## Example Usage

After configuration, you can access the Redis cache instance like so:

```ts
const cache = app.cache("default"); // Default Redis instance
```

### Caching Data

You can set and get cache values using the following methods:

```ts
// Set a cache value
await cache.set("key", "value");

// Get a cache value
const value = await cache.get("key");
```

### Deleting Cache Data

To delete a cache key:

```ts
await cache.del("key");
```

### Flushing the Cache

You can flush the cache:

```ts
await cache.flush();
```

### Closing Connections

The plugin automatically handles the closing of all Redis cache connections when the application shuts down.

```ts
app.defer(async () => {
    // All Redis cache instances will be closed here
});
```

## License

This project is licensed under the MIT License.
