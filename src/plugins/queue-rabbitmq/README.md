
# babl.one Plugin :: Queue System (RabbitMQ)

This plugin provides unified queue handling with consumer decorators using `app.queue(name)`.

## Overview

The **Queue System Plugin** integrates RabbitMQ support into your application. It allows you to manage queues and consumers using the `app.queue(name)` function. Queue instances can be configured with their connection details via the `config/queues.json` file.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/queue-rabbitmq
    ```

## Configuration

The plugin reads the RabbitMQ configuration from a `queues.json` file located in the `/config` folder. Each instance of RabbitMQ should be defined with the following structure:

### /config/queues.json

```json
{
    "main": {
        "host"      : "localhost",
        "port"      : 5672,
        "username"  : "guest",
        "password"  : "guest",
        "type"      : "rabbitMQ"
    }
}
```

### Fields:

- `host`      : The RabbitMQ host address.
- `port`      : The RabbitMQ port (default: 5672).
- `username`  : The RabbitMQ username (default: guest).
- `password`  : The RabbitMQ password (default: guest).
- `type`      : The type of queue (should be `rabbitMQ` for this plugin).

## API

### app.queue(name: string)

- Returns the RabbitMQ queue instance configured with the specified `name`.

## Example Usage

After configuration, you can access the RabbitMQ queue instance like so:

```ts
const queue = app.queue("main"); // Main RabbitMQ instance
```

### Sending to a Queue

To send a message to a queue, use:

```ts
await queue.send("myQueue", { data: "some data" });
```

### Registering a Consumer

To register a consumer, use:

```ts
queue.register("myQueue", "MyProcessor", processorInstance);
```

### Closing Connections

The plugin automatically handles the closing of all RabbitMQ connections when the application shuts down.

```ts
app.defer(async () => {
    // All RabbitMQ connections will be closed here
});
```

## License

This project is licensed under the MIT License.
