"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const xml2js_1 = __importDefault(require("xml2js"));
const xml2js_xpath_1 = __importDefault(require("xml2js-xpath"));
const fs_1 = __importDefault(require("fs"));
function parse(testResultPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const xmlString = yield fs_1.default.promises.readFile(testResultPath);
        const testResults = {
            testSuites: []
        };
        new xml2js_1.default.Parser({ explicitArray: false, mergeAttrs: true }).parseString(xmlString, function (err, json) {
            const foundTestCases = xml2js_xpath_1.default.find(json, '//UnitTestResult');
            const foundTestMethods = xml2js_xpath_1.default.find(json, '//TestMethod');
            foundTestCases.forEach(function (tc) {
                const testCase = parseTestCase(tc);
                // find test suite name
                const matchingTestSuite = foundTestMethods.find(({ name }) => name === testCase.name);
                const testSuiteName = matchingTestSuite.className;
                // Check if test suite already exists
                const existingTestSuite = testResults.testSuites.find(({ name }) => name === testSuiteName);
                // if it does not exist, create a new one and then append the test case
                if (existingTestSuite === undefined) {
                    const newTestSuite = { name: testSuiteName, testCases: [] };
                    newTestSuite.testCases.push(testCase);
                    testResults.testSuites.push(newTestSuite);
                }
                else {
                    // if exists, append test case to it
                    existingTestSuite.testCases.push(testCase);
                }
            });
        });
        return testResults;
    });
}
exports.parse = parse;
function parseTestCase(testCaseElement) {
    const testCase = {
        name: testCaseElement.testName,
        duration: convertDurationToSeconds(testCaseElement.duration),
        result: testCaseElement.outcome
    };
    return testCase;
}
function convertDurationToSeconds(testCaseDuration) {
    // Remove milliseconds
    const hms = testCaseDuration.split('.')[0];
    const [hours, minutes, seconds] = hms.split(':');
    // Note: +var converts string to number
    return +hours * 60 * 60 + +minutes * 60 + +seconds;
}
