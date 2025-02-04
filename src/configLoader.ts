import fs from "fs";
import yaml from "js-yaml";
import { Endpoint } from "./types";

export function loadConfig(filePath: string): Endpoint[] {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error("Configuration file not found.");
        }

        const fileContent = fs.readFileSync(filePath, "utf8");
        const endpoints = yaml.load(fileContent) as Endpoint[];

        if (!Array.isArray(endpoints)) {
            throw new Error("Invalid YAML format: Expected a list of endpoints.");
        }

        return endpoints;
    } catch (error: unknown) {
        console.error("Error loading YAML file:", (error as Error).message);
        process.exit(1);
    }
}
