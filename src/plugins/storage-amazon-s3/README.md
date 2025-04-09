
# babl.one Plugin :: /plugins/storage-amazon-s3
This plugin integrates with Amazon S3 to provide file storage functionality. It allows the app to store and retrieve files from S3 bucket.

This plugin provides interfaces to store and retrieve files from Amazon S3 using the `@aws-sdk/client-s3` package.

## Overview

The **StorageS3** plugin allows the integration of Amazon S3 storage with the Babl.one framework. It provides methods to upload, download, delete, and rename files in an S3 bucket.

## Features

- **Upload** files to Amazon S3
- **Download** files from Amazon S3 to a local path
- **Rename** files by copying to a new location and deleting the original
- **Delete** files from Amazon S3

## Installation

To use the plugin, you must have an AWS account and access to S3.

Install the dependencies:
```bash
npm install @aws-sdk/client-s3
```

## Configuration

In order to use the plugin, provide your AWS credentials and configuration details in the `config` object.

The plugin expects the following configuration fields:

- `region`: The AWS region of the S3 bucket
- `apiKey`: Your AWS access key ID
- `privateKey`: Your AWS secret access key

Example configuration:

```ts
const config = {
  region: 'us-west-2',
  apiKey: 'YOUR_API_KEY',
  privateKey: 'YOUR_PRIVATE_KEY',
};
```

## Methods

### `init()`

Initializes the `S3Client` using the provided AWS credentials and region.

### `read(containerName: string, file: StorageFile): Promise<StorageFile>`

Downloads a file from an S3 bucket to the local file system. The file will be written to the path specified in `file.localPath`.

### `write(containerName: string, file: StorageFile): Promise<StorageFile>`

Uploads a file to an S3 bucket. The file data is taken from `file.blob`, and it is stored at `file.remotePath`.

### `delete(containerName: string, file: StorageFile): Promise<StorageFile>`

Deletes a file from an S3 bucket using the `file.remotePath`.

### `rename(containerName: string, file: StorageFile): Promise<StorageFile>`

Renames a file in an S3 bucket by copying it to a new key (`file.remotePathNew`) and then deleting the original.

## License

This project is licensed under the MIT License.
