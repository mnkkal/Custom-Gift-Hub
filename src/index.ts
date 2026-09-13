import { bootstrap, bootstrapWorker, runMigrations } from '@vendure/core';
import { config } from './vendure-config';
console.log('>>> [Vendure] Initializing bootstrap process...');
console.log('>>> [Vendure] Database:', config.dbConnectionOptions.type);
console.log('>>> [Vendure] Port:', config.apiOptions.port);

runMigrations(config)
  .then(() => {
    console.log('>>> [Vendure] Migrations check complete. Bootstrapping server...');
    return bootstrap(config);
  })
  .then((app) => {
    console.log('>>> [Vendure] Server bootstrapped on port ' + config.apiOptions.port + '! Bootstrapping worker...');
    return bootstrapWorker(config);
  })
  .then(worker => {
    console.log('>>> [Vendure] Worker bootstrapped! Starting job queue...');
    return worker.startJobQueue();
  })
  .then(() => {
    console.log('>>> [Vendure] All backend services running successfully!');
  })
  .catch(err => {
    console.error('>>> [Vendure] FATAL ERROR during bootstrap:', err);
    process.exit(1);
  });