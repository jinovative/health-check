"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configLoader_1 = require("./configLoader");
const healthCheck_1 = require("./healthCheck");
if (process.argv.length < 3) {
    console.error("Usage: ts-node src/main.ts <config-file>");
    process.exit(1);
}
const configPath = process.argv[2];
const endpoints = (0, configLoader_1.loadConfig)(configPath);
console.log(`🚀 Starting health check every 15 seconds for ${endpoints.length} endpoints...`);
setInterval(() => {
    console.log(`\n🔄 Running new health check cycle at ${new Date().toLocaleTimeString()}...\n`);
    (0, healthCheck_1.checkHealth)(endpoints);
}, 15000); // ✅ Keeps running indefinitely
