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
const junitTestResultParser = __importStar(require("./junit-test-result-parser"));
const nunitTestResultParser = __importStar(require("./nunit-test-result-parser"));
const core = __importStar(require("@actions/core"));
const tagging_1 = require("./tagging");
const client_1 = require("./client");
function buildMetrics(taggedTestCases) {
    console.log(taggedTestCases);
    return [];
}
function getsupportedFrameworks() {
    return ['junit', 'nunit'];
}
function main(testFramework, testResultsFile, tagsFile, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!getsupportedFrameworks().includes(testFramework)) {
            throw new Error(testFramework + ' is not supported');
        }
        let testResults;
        switch (testFramework) {
            case 'junit':
                testResults = yield junitTestResultParser.parse(testResultsFile);
                break;
            case 'nunit':
                testResults = yield nunitTestResultParser.parse(testResultsFile);
                break;
            default:
                throw new Error(testFramework + ' is not supported');
        }
        const taggedTestCases = tagging_1.tagTestResults(testResults, tagsFile);
        const metrics = buildMetrics(taggedTestCases);
        client.sendMetrics(metrics);
    });
}
main(core.getInput('test-framework', { required: true }), core.getInput('test-report', { required: true }), core.getInput('test-results-tags', { required: true }), new client_1.DataDogClient(core.getInput('dd-api-key', { required: true })));
