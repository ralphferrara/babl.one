/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: app.ts
//|| Main Application file
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app        from './app';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Init
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      app.init(async () => {
            await app.use('console.pretty');
            await app.use('cache.redis');
            await app.use('db.mysql');
            await app.use('db.mongo');
            await app.use('http'); 
            await app.use('sockets');
            await app.use('router'); 
            await app.use('queue.rabbitMQ');
            await app.use('queue.consumers');

            setTimeout(async () => {
                  const imageData = {
                        url: 'https://example.com/image.jpg',
                        type: 'jpeg'
                  };
                  
                  await app.queue('main')?.send('imageQueue', imageData);
                  app.log('Sent message to imageQueue', 'info');
            }, 2000);
      });
