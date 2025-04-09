# babl.one Plugin :: /plugins/storage-amazon-s3
This plugin integrates with Google Cloud Platform (GCP) to provide file storage functionality. It allows the app to store and retrieve files from Google Cloud Storage.

## Features

- **Read Files**: Retrieve files from a specified GCP bucket.
- **Write Files**: Upload files to a specified GCP bucket.
- **Delete Files**: Delete files from a specified GCP bucket.
- **Rename Files**: Rename files within a GCP bucket.

## Installation

To install the plugin, run the following command:

```
npm install @babl.one/storage-gcp
```

## Configuration

To use the plugin, provide the necessary configuration in your app's settings:

```ts
{
  service: 'gcp',              // The service name (gcp)
  account: 'your-gcp-account', // Your GCP account name
  privateKey: 'path-to-key-file.json', // Path to your GCP service account private key
}
```

## Usage

After installing the plugin and configuring the settings, use the `StorageGCP` class to interact with GCP storage.

### Initialize the Storage Client

```ts
import StorageGCP from '@babl.one/storage-gcp';

const storage = new StorageGCP(config);
await storage.init();
```

### Reading a File

To read a file from a GCP bucket:

```ts
const file = await storage.read('your-bucket-name', file);
```

### Writing a File

To write (upload) a file to a GCP bucket:

```ts
const file = await storage.write('your-bucket-name', file);
```

### Deleting a File

To delete a file from a GCP bucket:

```ts
const file = await storage.delete('your-bucket-name', file);
```

### Renaming a File

To rename a file within a GCP bucket:

```ts
const file = await storage.rename('your-bucket-name', file);
```

## Error Handling

Each method will return a `StorageFile` object with a `status` property indicating the current state:

- `PENDING`: The file operation is queued.
- `PROCESSING`: The file operation is in progress.
- `COMPLETED`: The file operation is successful.
- `FAILED`: The file operation has failed.
- `DELETED`: The file has been deleted.
- `RENAMED`: The file has been renamed.

## License

MIT License.
