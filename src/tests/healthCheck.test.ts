import { updateAvailability, availabilityMap } from "../healthCheck";

test("updateAvailability correctly tracks stats over time", () => {
    updateAvailability("https://fetch.com", true);
    updateAvailability("https://fetch.com", false);
    updateAvailability("https://fetch.com", true);
    updateAvailability("https://www.fetchrewards.com", true);

    expect(availabilityMap["fetch.com"].totalRequests).toBe(3);
    expect(availabilityMap["fetch.com"].successfulRequests).toBe(2);
    expect(availabilityMap["www.fetchrewards.com"].totalRequests).toBe(1);
    expect(availabilityMap["www.fetchrewards.com"].successfulRequests).toBe(1);
});
