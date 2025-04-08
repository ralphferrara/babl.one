# Plugin : babl.one/sender

This plugin provides the app interfaces to send email and SMS using various third-party services like SendGrid, AWS SES, Twilio, SendInBlue, and SNS.

## Overview

The **Sender Plugin** enables seamless integration of email and SMS functionalities into your application. It supports multiple service providers, allowing you to send messages based on the configured sender service.

## Installation

Ensure that the plugin is included in your project and properly configured. Follow these steps to install the plugin:

1. Install the plugin using npm:
```bash
   npm install @babl.one/sender
```

2. Configuration
The plugin uses the /config/servers.json file to configure the integrations with various email and SMS providers. This file should be updated with the appropriate credentials for the services you wish to use.

### Example /config/servers.json
```bash
{
  "defaultSendgrid": {
    "service": "sendGrid",
    "from": "your-email@example.com",
    "token": "SENDGRID_API_KEY"
  },
  "defaultSES": {
    "service": "SES",
    "from": "your-email@example.com",
    "account": "AWS_ACCOUNT_ID",
    "privateKey": "AWS_PRIVATE_KEY",
    "region": "us-west-2"
  },
  "defaultSIB": {
    "service": "sendInBlue",
    "from": "your-email@example.com",
    "account": "SENDINBLUE_ACCOUNT_ID",
    "privateKey": "SENDINBLUE_API_KEY"
  },
  "defaultTwilio": {
    "service": "twilio",
    "from": "your-phone-number",
    "account": "TWILIO_ACCOUNT_SID",
    "privateKey": "TWILIO_AUTH_TOKEN",
    "phone": "your-phone-number"
  },
  "defaultSNS": {
    "service": "SNS",
    "from": "your-phone-number",
    "account": "AWS_ACCOUNT_ID",
    "privateKey": "AWS_PRIVATE_KEY",
    "region": "us-west-2"
  }
}
```