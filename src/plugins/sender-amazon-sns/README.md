# Plugin : @babl.one/sender-amazon-sns

This plugin for the [@babl.one/sender](https://www.npmjs.com/package/@babl.one/sender) component enables your application to send text messages using Amazon SNS. It provides a simple and efficient way to integrate SNS into your @babl.one messaging pipeline.

## Installation

You can install this plugin using npm or yarn:

```bash
npm install @babl.one/sender-amazon-sns
```

# Config
Add the following configuration to your "/config/senders.json"

```bash
{
      "INSTANCE_NAME" : {
            "service"         : "SNS",
            "from"            : "800-505-5555",
            "account"         : "",
            "privateKey"      : "",
            "region"          : "us-west-2"
      }
}
```
