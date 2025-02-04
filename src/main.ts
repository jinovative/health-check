import { loadConfig } from "./configLoader";
import { checkHealth } from "./healthCheck";

if (process.argv.length < 3) {
    console.error("Usage: ts-node src/main.ts <config-file>");
    process.exit(1);
}

const configPath = process.argv[2];
const endpoints = loadConfig(configPath);

console.log(`🚀 Starting health check every 15 seconds for ${endpoints.length} endpoints...`);

setInterval(() => {
    console.log(`\n🔄 Running new health check cycle at ${new Date().toLocaleTimeString()}...\n`);
    checkHealth(endpoints);
}, 15000); // ✅ Keeps running indefinitely
