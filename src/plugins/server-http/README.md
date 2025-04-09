# babl.one Plugin :: @babl.one/server-http
Sets up the native HTTP server with Chirp routing for multiple HTTP instances using app.http(name)

## Overview

The **HTTP Server Plugin** integrates HTTP server functionality with Chirp routing into your application. It allows you to manage multiple HTTP instances via the `app.http(name)` function. The plugin supports both HTTP and HTTPS configurations.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/server-http
    ```

## Configuration

The plugin reads the HTTP server configuration from an `http.json` file located in the `/config` folder. Each instance of the HTTP server should be defined with the following structure:

### /config/http.json

```json
{
    "default": {
        "port": 8080,
        "sslKey": "./path/to/ssl.key",
        "sslCert": "./path/to/ssl.cert",
        "sslCA": "./path/to/ssl.ca"
    }
}
```

### Fields:

- `port`      : The port on which the server will listen.
- `sslKey`    : Path to the SSL key file (for HTTPS).
- `sslCert`   : Path to the SSL certificate file (for HTTPS).
- `sslCA`     : Path to the SSL Certificate Authority file (for HTTPS).

## API

### app.http(name: string)

- Returns the HTTP instance configured with the specified `name`.

## Example Usage

After configuration, you can access the HTTP server instance like so:

```ts
const server = app.http("default"); // Default HTTP instance
```

### Starting and Stopping Servers

You can start and stop the HTTP servers using the `start()` and `stop()` methods respectively.

```ts
// Start the server
await server.start();

// Stop the server
await server.stop();
```

## License

This project is licensed under the MIT License.
