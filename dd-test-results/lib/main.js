"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const client_1 = require("./client");
const run_1 = require("./run");
const search_1 = require("./search");
run_1.run(new client_1.DataDogClient(core.getInput('dd-api-key', { required: true })), {
    metricName: core.getInput('dd-metric-name', { required: true }),
    tags: core.getMultilineInput('dd-tags', { required: false }),
    host: core.getInput('dd-host', { required: true }),
    testFramework: core.getInput('test-framework', { required: true }),
    testReportFiles: search_1.findTestReports(core.getInput('test-report-file', { required: true })),
    testTagsFile: core.getInput('test-tags-file', { required: true })
});
