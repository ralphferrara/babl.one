
# babl.one Plugin :: /plugins/storage
Provides the app interfaces to store and retrieve files from cloud or local storage

# Overview
This plugin is designed to provide a unified interface for storing and retrieving files from various storage services like cloud storage (Azure, S3, etc.) and local storage. It includes actions for reading, writing, deleting, and renaming files in storage containers.

# Plugin Details
This plugin provides the following actions:

- **READ**: Retrieves a file from the specified storage container.
- **WRITE**: Uploads a file to the specified storage container.
- **DELETE**: Deletes a file from the specified storage container.
- **RENAME**: Renames a file in the specified storage container.

# Configuration
The configuration for the storage plugin is defined in the `storage.json` file. This file should include the storage service details, such as API keys, private keys, and the region for cloud storage services like S3 or Azure.

# Methods

## init
Initializes the storage client using the provided configuration. This must be called before performing any storage operations.

```typescript
await storagePlugin.init();
```

## process
Processes a list of files and performs the appropriate actions (read, write, delete, rename) based on the file's action.

```typescript
await app.process('serviceName', 'containerName', files);
```

# Example Usage

1. Configure the storage service in the `storage.json` file.
2. Use the `app.process()` method to read, write, delete, or rename files in the specified storage containers.

# Register Storage Service

To add a new storage service to the plugin, use the `app.registerStorage` method:

```typescript
app.registerStorage('s3', S3StorageService);
app.registerStorage('azure', AzureStorageService);
```

# Error Handling
The plugin will log errors using the app's logging system if an operation fails. The file status will also be updated accordingly (e.g., `FAILED`).

# Supported Storage Services
- S3
- Azure Blob Storage
- Local storage

