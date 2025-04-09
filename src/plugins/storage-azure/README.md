

# babl.one Plugin :: /plugins/storage-azure

## Overview

This is a plugin for the `babl.one` framework that provides the app interfaces to store and retrieve files from Microsoft Azure Blob Storage. The plugin allows you to interact with Azure's Blob Storage service to manage files (upload, download, rename, and delete files).

## Features

- **Upload files** to Azure Blob Storage
- **Download files** from Azure Blob Storage to local paths
- **Rename files** in Azure Blob Storage
- **Delete files** from Azure Blob Storage

## Dependencies

- `@azure/storage-blob`: Azure SDK for JavaScript to interact with Azure Blob Storage.
- `@babl.one/storage`: Interface definitions for working with storage-related tasks in the `babl.one` framework.
- `fs`: Node.js file system module for working with local files.

## Class: StorageAzure

The `StorageAzure` class implements the `StorageAPI` interface to interact with Azure Blob Storage.

### Methods

#### `init()`

Initializes the Azure Blob Service client using the provided credentials (`account` and `privateKey`).
- **Usage**: `await storageAzure.init()`

#### `read(containerName: string, file: StorageFile)`

Downloads a file from the specified container in Azure Blob Storage and writes it to a local path.
- **Parameters**: 
  - `containerName`: The name of the container in Azure Blob Storage.
  - `file`: The file object containing the remote path and local path for the file.
- **Returns**: A promise that resolves with the updated `file` object.
- **Usage**: `await storageAzure.read('myContainer', file)`

#### `write(containerName: string, file: StorageFile)`

Uploads a file to Azure Blob Storage from a local file or a buffer.
- **Parameters**: 
  - `containerName`: The name of the container in Azure Blob Storage.
  - `file`: The file object containing the local path and blob data.
- **Returns**: A promise that resolves with the updated `file` object.
- **Usage**: `await storageAzure.write('myContainer', file)`

#### `delete(containerName: string, file: StorageFile)`

Deletes a file from Azure Blob Storage.
- **Parameters**: 
  - `containerName`: The name of the container in Azure Blob Storage.
  - `file`: The file object containing the remote path for the file to be deleted.
- **Returns**: A promise that resolves with the updated `file` object.
- **Usage**: `await storageAzure.delete('myContainer', file)`

#### `rename(containerName: string, file: StorageFile)`

Renames (or moves) a file in Azure Blob Storage by copying it to a new location and deleting the old file.
- **Parameters**: 
  - `containerName`: The name of the container in Azure Blob Storage.
  - `file`: The file object containing the remote paths for the old and new file locations.
- **Returns**: A promise that resolves with the updated `file` object.
- **Usage**: `await storageAzure.rename('myContainer', file)`

## Usage Example

```javascript
const storageAzure = new StorageAzure(config);

// Initialize the Azure Blob client
await storageAzure.init();

// Define the file object for the operation
const file = {
  remotePath: 'path/to/remote/file',
  localPath: '/path/to/local/file',
  blob: null,  // The file's data (for write operations)
  status: 'PENDING',
};

// Read a file from Azure Blob Storage to local path
await storageAzure.read('myContainer', file);

// Upload a file to Azure Blob Storage
await storageAzure.write('myContainer', file);

// Delete a file from Azure Blob Storage
await storageAzure.delete('myContainer', file);

// Rename a file in Azure Blob Storage
await storageAzure.rename('myContainer', file);
```

## Notes

- Ensure that the Azure credentials (`account` and `privateKey`) are provided in the configuration.
- This plugin uses streams to download files from Azure Blob Storage, so it works efficiently even with large files.

