# babl.one Plugin :: @babl.one/queue-consumers

This plugin dynamically scans the `/src/consumers` directory and registers consumer classes into their respective queues.

## Overview

The **Consumer Loader Plugin** dynamically loads and registers consumer classes in the `src/consumers` directory. The plugin uses decorators to extract the necessary metadata for each consumer and registers it into the appropriate queues.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/queue-consumers
    ```

## Configuration

There is no special configuration required for this plugin, other than ensuring that consumer classes are located in the `/src/consumers` directory. 

The `queue-consumer` will automatically find and load these classes.

### Directory Structure

```bash
src/
  consumers/
    consumer1.ts
    /media/media.consumer.ts
    ...
```

## Plugin Usage

This plugin dynamically scans the `/src/consumers` directory for files and automatically loads and registers consumer classes into their queues.

The decorators used in the consumer classes are:

@Consumer('__instanceName', '__consumerChannel', '__consumerQueue', __consumerPriority)

- `__instanceName`: string - The name of the instance where the consumer will be registered.
- `__consumerChannel`: string - The channel associated with the consumer.
- `__consumerQueue`: string - The queue associated with the consumer.
- `__consumerPriority`: number - Optional priority for the consumer (default: 5).

### Example Consumer Class

```ts
import { Consumer } from '@babl.one/consumer-loader';

@Consumer({
  instanceName: 'myInstance',
  channelName: 'myChannel',
  queueName: 'myQueue',
  priority: 10
})
export default class MyConsumer {
  async handle(data: any) {
    console.log('Handling data:', data);
  }
}
```

### Handling Consumers in Your Application

After the `@babl.one/queue-consumers` plugin is installed, it will automatically register the consumer classes. You can add consumers to specific queues by adding the appropriate decorators to the class.

## License

This project is licensed under the MIT License.
