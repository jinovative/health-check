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
        const fileContent = fs_1.default.readFileSync(filePath, "utf8");
        return js_yaml_1.default.load(fileContent);
    }
    catch (error) {
        console.error("Error loading YAML file:", error);
        process.exit(1);
    }
}
