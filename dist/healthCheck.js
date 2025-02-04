"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityMap = void 0;
exports.checkHealth = checkHealth;
exports.updateAvailability = updateAvailability;
const axios_1 = __importDefault(require("axios"));
// Track availability per domain
exports.availabilityMap = {};
// Function to check the health of endpoints
function checkHealth(endpoints) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const endpoint of endpoints) {
            try {
                const start = Date.now();
                const response = yield axios_1.default.request({
                    method: endpoint.method || "GET",
                    url: endpoint.url,
                    headers: endpoint.headers || {},
                    timeout: 5000, // 5-second timeout
                });
                const latency = Date.now() - start;
                const isUp = response.status >= 200 && response.status < 300 && latency < 500;
                console.log(`Checked: ${endpoint.name} (${endpoint.url}) - Status: ${response.status} - Latency: ${latency}ms - ${isUp ? " UP" : " DOWN"}`);
                updateAvailability(endpoint.url, isUp);
            }
            catch (error) {
                console.error(`ERROR: Failed to check ${endpoint.name} (${endpoint.url})`);
                updateAvailability(endpoint.url, false);
            }
        }
        logAvailability();
    });
}
// Function to update availability stats per domain
function updateAvailability(url, isUp) {
    const domain = new URL(url).hostname;
    if (!exports.availabilityMap[domain]) {
        exports.availabilityMap[domain] = { totalRequests: 0, successfulRequests: 0 };
    }
    exports.availabilityMap[domain].totalRequests++;
    if (isUp)
        exports.availabilityMap[domain].successfulRequests++;
}
// Function to log availability percentages
function logAvailability() {
    console.log("\nAvailability Statistics:\n");
    for (const domain in exports.availabilityMap) {
        const { totalRequests, successfulRequests } = exports.availabilityMap[domain];
        const availability = Math.round((successfulRequests / totalRequests) * 100);
        console.log(`${domain} has ${availability}% availability percentage`);
    }
}
