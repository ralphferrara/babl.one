
# babl.one Plugin :: @babl.one/server-router

This plugin scans the routes directory, registers handlers, ensures no conflicts, and overrides `app.route`.

## Overview

The **Router Plugin** dynamically loads and registers routes for the server. It scans the `/src/routes` directory and imports route handler classes. The plugin ensures there are no conflicts and overrides the default `app.route` function to handle HTTP requests.

## Installation

To use the plugin, follow these steps:

1. Install the plugin using npm:
    ```bash
    npm install @babl.one/server-router
    ```

## Configuration

The plugin will automatically scan the `/src/routes` directory for route handler files. Each route handler should be a TypeScript file with the following decorators:

### Route Decorator Example

```ts
@Route('/example', 'GET', 1)
class ExampleHandler {
  async execute(chirp: Chirp) {
    // handle the request
  }
}
```

### Fields:

- `path`: The path for the route.
- `method`: The HTTP method (e.g., GET, POST).
- `level`: The user security level required for the route (0 = PUBLIC, 100 = MAX).

      Levels = 0 | 1 | 2 | 3 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100

## API

### app.route(routePath: string, chirp: Chirp)

- This method is overridden by the plugin to handle requests dynamically based on the routes registered.

## Example Usage

Once the plugin is configured, routes will be automatically handled by the server-http plugin, passing the chirp component as such

```ts
app.route('/example', chirp);
```

### Dynamic Route Registration

Routes are dynamically registered from the `/src/routes` directory, and any conflicts will be logged as errors.

```ts
// Example output for route registration
app.log(`Route registered: GET-/example`, 'info');
```

### Error Handling

If a route is not found, a 404 response is sent:

```ts
// Example output for missing route
app.log('Router: No route for GET-/example', 'warn');
```

## License

This project is licensed under the MIT License.
