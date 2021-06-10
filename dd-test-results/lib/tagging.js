"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagTestResults = exports.loadTagsFromFile = void 0;
function tagTestCases(tags, testResults, testResultsTags) {
    return testResults.testSuites
        .map(testSuite => testSuite.testCases.map(testCase => tagTestCase(tags, testSuite, testCase, testResultsTags)))
        .reduce((total, current) => [...total, ...current]);
}
function tagTestCase(tags, testSuite, testCase, testResultsTags) {
    const testSuiteTags = testResultsTags.suites.find(testSuiteTags => testSuiteTags.name === testSuite.name);
    const testCaseTags = testSuiteTags === null || testSuiteTags === void 0 ? void 0 : testSuiteTags.cases.find(testCaseTags => testCaseTags.name === testCase.name);
    return Object.assign(Object.assign({}, testCase), { tags: Object.assign(Object.assign(Object.assign({}, testSuiteTags === null || testSuiteTags === void 0 ? void 0 : testSuiteTags.tags), testCaseTags === null || testCaseTags === void 0 ? void 0 : testCaseTags.tags), parseTags(tags)) });
}
function parseTags(rawTags) {
    const r = {};
    rawTags
        .filter(rawTag => rawTag.includes(':'))
        .forEach(rawTag => {
        const key = rawTag.split(':')[0];
        const value = rawTag.substring(key.length + 1);
        r[key] = value;
    });
    return r;
}
const fs_1 = __importDefault(require("fs"));
function loadTagsFromFile(filePath) {
    const data = fs_1.default.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    return json;
}
exports.loadTagsFromFile = loadTagsFromFile;
function tagTestResults(tags, testResults, tagsFile) {
    return tagTestCases(tags, testResults, loadTagsFromFile(tagsFile));
}
exports.tagTestResults = tagTestResults;
