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

## Available Plugins 


### @babl.one/logging-pretty
A human-readable and customizable logging utility for babl.one projects, providing enhanced output for development and debugging.

### @babl.one/queue-rabbitmq
A `RabbitMQ` queue plugin for the babl.one framework, offering robust and scalable message queuing capabilities.

### @babl.one/queue-consumers 
A routing mechanism for queue message consumers within the babl.one framework, simplifying the mapping of messages to handler functions.


---

