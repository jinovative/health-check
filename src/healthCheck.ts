import axios from "axios";
import { Endpoint, AvailabilityStats } from "./types";

// Track availability per domain
export const availabilityMap: Record<string, AvailabilityStats> = {};

// Function to check the health of endpoints
export async function checkHealth(endpoints: Endpoint[]) {
    for (const endpoint of endpoints) {
        try {
            const start = Date.now();
            const response = await axios.request({
                method: endpoint.method || "GET",
                url: endpoint.url,
                headers: endpoint.headers || {},
                timeout: 5000, // 5-second timeout
            });

            const latency = Date.now() - start;
            const isUp = response.status >= 200 && response.status < 300 && latency < 500;

            console.log(
                `Checked: ${endpoint.name} (${endpoint.url}) - Status: ${response.status} - Latency: ${latency}ms - ${
                    isUp ? " UP" : " DOWN"
                }`
            );

            updateAvailability(endpoint.url, isUp);
        } catch (error) {
            console.error(`ERROR: Failed to check ${endpoint.name} (${endpoint.url})`);
            updateAvailability(endpoint.url, false);
        }
    }

    logAvailability();
}

// Function to update availability stats per domain
export function updateAvailability(url: string, isUp: boolean) {
    const domain = new URL(url).hostname;

    if (!availabilityMap[domain]) {
        availabilityMap[domain] = { totalRequests: 0, successfulRequests: 0 };
    }

    availabilityMap[domain].totalRequests++;
    if (isUp) availabilityMap[domain].successfulRequests++;
}

// Function to log availability percentages
function logAvailability() {
    console.log("\nAvailability Statistics:\n");
    for (const domain in availabilityMap) {
        const { totalRequests, successfulRequests } = availabilityMap[domain];
        const availability = Math.round((successfulRequests / totalRequests) * 100);
        console.log(`${domain} has ${availability}% availability percentage`);
    }
}
