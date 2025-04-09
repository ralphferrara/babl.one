
# babl.one Plugin :: @babl.one/health

This plugin provides the application with a health monitoring server. It periodically updates health data and stores it in a JSON file. The health server is run as a child process and is configurable via a `health.json` configuration file.

## Overview

The **Health Plugin** monitors the health of your application by spawning a health server. The server listens on a specified port (default 9000) and can be used to monitor the health status of your application. The health data is stored in a `.health/data/data.json` file and updated at regular intervals. The plugin also logs any health server output and errors.

## Features

- Spawns a health server to monitor the health of the application.
- Periodically updates health data and stores it in a JSON file.
- Logs the health server's output and errors.
- Configurable through a `config/health.json` file.
- Automatically cleans up resources when the application shuts down.

## Installation

1. Install the plugin via npm:
   ```bash
   npm install @babl.one/health
   ```

## Configuration

The plugin uses the `/config/health.json` file for configuration. The configuration should include the following options:

```json
{
  "secretKey"           : "your-secret-key",
  "writeInterval"       : 10000, // IN MILLISECONDS
  "port"                : 9000
}
```

- `secretKey`: The secret key used to authenticate the health checks. [ passed via headers["x-secret-key"] ] 
- `writeInterval`: The interval (in milliseconds) at which the health data is written to the `.health/data/data.json` file.
- `port`: The port on which the health server listens. Default is `9000`.

## Usage

Once the plugin is configured and initialized, the `app.health` method can be used to update health data:

```ts
app.health('connections', 100);
app.health('flueCapacitorPercentage', 88);
```

This will store the status in the health data json, which is updated based on writeInterval.

### Health Server

The health server runs as a child process and is controlled by the `monitor.cjs` script. This script is responsible for managing the health status and accepting health check requests.

### Logs

Any output or errors from the health server are logged via the `app.log` method.

## License

This plugin is part of the babl.one project and is available under the MIT License.
