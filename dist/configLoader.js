"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
function loadConfig(filePath) {
    try {
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Configuration file not found.");
        }
        const fileContent = fs_1.default.readFileSync(filePath, "utf8");
        const endpoints = js_yaml_1.default.load(fileContent);
        if (!Array.isArray(endpoints)) {
            throw new Error("Invalid YAML format: Expected a list of endpoints.");
        }
        return endpoints;
    }
    catch (error) {
        console.error("Error loading YAML file:", error.message);
        process.exit(1);
    }
}
