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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const client_1 = require("./client");
const run_1 = require("./run");
const glob = require("@actions/glob");
const fs_1 = require("fs");
const util_1 = require("util");
const stats = util_1.promisify(fs_1.stat);
function findTestReports(testReportFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const globber = yield glob.create(testReportFile);
        const searchResults = yield globber.glob();
        const testReportFiles = new Array();
        for (const searchResult of searchResults) {
            const fileStats = yield stats(searchResult);
            if (!fileStats.isDirectory) {
                core.info(`Test report file found: ${searchResult}`);
                testReportFiles.push(searchResult);
            }
        }
        return testReportFiles;
    });
}
run_1.run(new client_1.DataDogClient(core.getInput('dd-api-key', { required: true })), {
    metricName: core.getInput('dd-metric-name', { required: true }),
    tags: core.getMultilineInput('dd-tags', { required: false }),
    host: core.getInput('dd-host', { required: true }),
    testFramework: core.getInput('test-framework', { required: true }),
    testReportFiles: findTestReports(core.getInput('test-report-file', { required: true })),
    testTagsFile: core.getInput('test-tags-file', { required: true })
});
