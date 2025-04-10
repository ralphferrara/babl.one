# @babl.one/core

> Minimalist bootstrap kernel for the **babl.one** backend framework.

---

## Overview

`@babl.one/core` is the foundation of the babl.one backend architecture — a lean, opinionated bootstrap module designed to power a modular, composable, and blazing-fast TypeScript framework.

It provides the runtime shell and system initializer — everything else is a package.

---

## Philosophy

- **Minimal Core** — start with nothing, add only what you need
- **Fully Modular** — designed to load packages dynamically
- **Hot Reloads** - develop in record time

---

## Installation

```bash
npm create babl-one myTestApp
```

# babl.one Plugins

## [@babl.one/db-mongo](https://www.npmjs.com/package/@babl.one/core)
MongoDB database plugin for seamless integration with MongoDB, offering access via `app.db(name)`.

## [@babl.one/db-mysql](https://www.npmjs.com/package/@babl.one/core)
MySQL database plugin that allows multiple MySQL instances to be accessed via `app.db(name)`.

## [@babl.one/db-postgres](https://www.npmjs.com/package/@babl.one/core)
PostgreSQL database plugin that provides access to PostgreSQL databases with `app.db(name)`.

## [@babl.one/db-redis](https://www.npmjs.com/package/@babl.one/core)
Redis caching plugin offering an easy way to store and retrieve data using `app.cache(name)`.

## [@babl.one/health](https://www.npmjs.com/package/@babl.one/core)
Health plugin for monitoring application health, providing a health check endpoint for status reporting.

## [@babl.one/jwt](https://www.npmjs.com/package/@babl.one/core)
JWT (JSON Web Token) plugin for handling token-based authentication and authorization.

## [@babl.one/logger-pretty](https://www.npmjs.com/package/@babl.one/core)
A pretty logger plugin that colorizes and structures console output, replacing `app.log` with enhanced logging capabilities.

## [@babl.one/queue-consumers](https://www.npmjs.com/package/@babl.one/core)
A plugin that dynamically scans and registers consumer classes into RabbitMQ queues, enabling event-driven architectures.

## [@babl.one/queue-rabbitmq](https://www.npmjs.com/package/@babl.one/core)
RabbitMQ queue plugin that provides unified queue handling with support for message consumers and producers.

## [@babl.one/sender](https://www.npmjs.com/package/@babl.one/core)
A base plugin for sending messages via various providers, such as email, SMS, and push notifications.

## [@babl.one/sender-amazon-ses](https://www.npmjs.com/package/@babl.one/core)
Amazon SES plugin for sending emails using Amazon Simple Email Service (SES).

## [@babl.one/sender-amazon-sns](https://www.npmjs.com/package/@babl.one/core)
Amazon SNS plugin for sending notifications via Amazon Simple Notification Service (SNS).

## [@babl.one/sender-sendgrid](https://www.npmjs.com/package/@babl.one/core)
SendGrid plugin for sending transactional and promotional emails via SendGrid.

## [@babl.one/sender-sendinblue](https://www.npmjs.com/package/@babl.one/core)
Sendinblue plugin for sending emails, SMS, and transactional messages through Sendinblue.

## [@babl.one/sender-twilio](https://www.npmjs.com/package/@babl.one/core)
Twilio plugin for sending SMS and voice messages through Twilio’s API.

## [@babl.one/server-http](https://www.npmjs.com/package/@babl.one/core)
HTTP server plugin that sets up a native HTTP server with Chirp routing using `app.http(name)`.

## [@babl.one/server-router](https://www.npmjs.com/package/@babl.one/core)
Router plugin that scans and registers routes dynamically, ensuring there are no conflicts and overriding `app.route`.

## [@babl.one/server-sockets](https://www.npmjs.com/package/@babl.one/core)
WebSocket server plugin for managing WebSocket connections and messages using `app.sockets(name)`.

