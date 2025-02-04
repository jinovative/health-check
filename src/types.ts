export interface Endpoint {
    name: string;
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}

export interface AvailabilityStats {
    totalRequests: number;
    successfulRequests: number;
}
