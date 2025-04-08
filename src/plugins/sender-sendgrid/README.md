# Plugin : @babl.one/sender-sendgrid-ses

This plugin for the [@babl.one/sender](https://www.npmjs.com/package/@babl.one/sender) component enables your application to send emails using SendGrid. It provides a simple and efficient way to integrate SendGrid into your @babl.one messaging pipeline.

## Installation

You can install this plugin using npm or yarn:

```bash
npm install @babl.one/sender-sendgrid
```

# Config
Add the following configuration to your "/config/senders.json"

```bash
{
      "INSTANCE_NAME" : {
            "service"         : "sendGrid",
            "from"            : "",
            "token"           : ""
      }
}
```
