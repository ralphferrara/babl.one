import { app } from './app.js';

// Lifecycle hooks
app.onInit(() => {
   const log = app.resolve<{ log: (msg: string) => void }>('logger');
   log?.log('Initializing...');
});

app.onReady(() => {
   const log = app.resolve<{ log: (msg: string) => void }>('logger');
   log?.log('App is ready');
});

app.onShutdown(() => {
   const log = app.resolve<{ log: (msg: string) => void }>('logger');
   log?.log('Graceful shutdown');
});


// Signals
process.on('SIGINT', async () => {
   console.log('\nCaught SIGINT (Ctrl+C)');
   await app.shutdown();
   process.exit(0);
});

process.on('SIGTERM', async () => {
   console.log('\nCaught SIGTERM');
   await app.shutdown();
   process.exit(0);
});

// Run
await app.init();
