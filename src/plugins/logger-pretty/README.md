
# babl.one Plugin :: @babl.one/logger-pretty

This plugin replaces `app.log` with a colorized and structured console output, providing better visibility into application logs.

## Overview

The **Console Pretty Logger Plugin** enhances the logging functionality of your application by providing colorized and structured output. It supports various log levels such as `info`, `warn`, `error`, `debug`, and more. It is integrated with the `app.log` function, which is used to log messages throughout the application.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/logger-pretty
    ```

## Configuration

There is no complex configuration needed to get started with the Console Pretty Logger plugin. Simply install and initialize the plugin, and you can begin logging messages.

### Example of usage:

1. Import and initialize the plugin in your application:

```ts

npm install @babl.one/logger-pretty

```

## Logging Levels

The Console Pretty Logger plugin supports several logging levels:

- `info`: Standard informational messages.
- `warn`: Warning messages to alert you about potential issues.
- `error`: Error messages for issues that need attention.
- `success`: Indicates successful operations.
- `debug`: Debugging information for development and troubleshooting.
- `timer`: Used for displaying timed logs.
- `head`: Used for displaying prominent heading messages.
- `complete`: Marks completion of a process.
- `break`: Used for breaking the flow and throwing an error (logs in red).

### Example Usage:

```ts
app.log('This is an info message', 'info');
app.log('This is a warning message', 'warn');
app.log('This is an error message', 'error');
app.log('Operation completed successfully', 'success');
app.log('This is a debug message', 'debug');
app.log('This is a timer message', 'timer');
app.log('Header information', 'head');
app.log('Completed task message', 'complete');
app.log('This is a critical error', 'break');  // Will throw error
```

## License

This project is licensed under the MIT License.
