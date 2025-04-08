# Plugin : @babl.one/sender-sendinblue

This plugin for the [@babl.one/sender](https://www.npmjs.com/package/@babl.one/sender) component enables your application to send text messages using Twilio. It provides a simple and efficient way to integrate Twilio into your @babl.one messaging pipeline.

## Installation

You can install this plugin using npm or yarn:

```bash
npm install @babl.one/sender-twilio
```

# Config
Add the following configuration to your "/config/senders.json"

```bash
{
      "INSTANCE_NAME" : {
            "service"         : "twilio",
            "from"            : "",
            "account"         : "",            
            "privateKey"      : ""
      },
}
```
