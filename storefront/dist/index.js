"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const vendure_config_1 = require("./vendure-config");
console.log('>>> [Vendure] Initializing bootstrap process...');
console.log('>>> [Vendure] Database:', vendure_config_1.config.dbConnectionOptions.type);
console.log('>>> [Vendure] Port:', vendure_config_1.config.apiOptions.port);
(0, core_1.runMigrations)(vendure_config_1.config)
    .then(() => {
    console.log('>>> [Vendure] Migrations check complete. Bootstrapping server...');
    return (0, core_1.bootstrap)(vendure_config_1.config);
})
    .then((app) => {
    console.log('>>> [Vendure] Server bootstrapped on port ' + vendure_config_1.config.apiOptions.port + '! Bootstrapping worker...');
    return (0, core_1.bootstrapWorker)(vendure_config_1.config);
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
