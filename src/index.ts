import { bootstrap, bootstrapWorker, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

runMigrations(config)
  .then(() => bootstrap(config))
  .then(() => bootstrapWorker(config))
  .then(worker => worker.startJobQueue())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });