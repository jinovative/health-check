"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthCheck_1 = require("../healthCheck");
test("updateAvailability correctly tracks stats over time", () => {
    (0, healthCheck_1.updateAvailability)("https://fetch.com", true);
    (0, healthCheck_1.updateAvailability)("https://fetch.com", false);
    (0, healthCheck_1.updateAvailability)("https://fetch.com", true);
    (0, healthCheck_1.updateAvailability)("https://www.fetchrewards.com", true);
    expect(healthCheck_1.availabilityMap["fetch.com"].totalRequests).toBe(3);
    expect(healthCheck_1.availabilityMap["fetch.com"].successfulRequests).toBe(2);
    expect(healthCheck_1.availabilityMap["www.fetchrewards.com"].totalRequests).toBe(1);
    expect(healthCheck_1.availabilityMap["www.fetchrewards.com"].successfulRequests).toBe(1);
});
