# babl.one Plugin :: @babl.one/server-sockets

This plugin sets up WebSocket servers using `app.sockets(name)`.

## Overview

The **WebSocket Server Plugin** integrates WebSocket support into your application. It allows you to create multiple WebSocket servers, handle connections, authenticate clients, and route messages. The plugin uses the `app.sockets(name)` function to access WebSocket instances.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/server-sockets
    ```

## Configuration

The plugin reads WebSocket configuration from a `sockets.json` file located in the `/config` folder. Each WebSocket instance should be defined with the following structure:

### /config/sockets.json

```json
{
    "default": {
        "port": 8080,
        "sslKey": "path/to/ssl/key",
        "sslCert": "path/to/ssl/cert",
        "sslCA": "path/to/ssl/ca"
    }
}
