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
        xml2js_1.default.parseString(xmlString, function (err, json) {
            const testCasesMatches = xml2js_xpath_1.default.find(json, '//test-case');
            testCasesMatches.forEach(function (testCaseItem) {
                appendToTestSuite(testCaseItem['$'], testResults.testSuites);
            });
        });
        return testResults;
    });
}
exports.parse = parse;
function parseTestCase(testCaseElement) {
    const testCase = {
        name: testCaseElement.name,
        duration: testCaseElement.duration,
        result: testCaseElement.result == 'Passed' ? 'succeeded' : 'failed'
    };
    return testCase;
}
function appendToTestSuite(testCaseElement, testSuites) {
    const testCaseParsed = parseTestCase(testCaseElement);
    const testSuiteName = testCaseElement.fullname.replace(testCaseElement.name, '');
    const existingTestSuite = testSuites.find(({ name }) => name === testSuiteName);
    if (existingTestSuite === undefined) {
        const newTestSuite = { name: testSuiteName, testCases: [] };
        newTestSuite.testCases.push(testCaseParsed);
        testSuites.push(newTestSuite);
    }
    else {
        existingTestSuite.testCases.push(testCaseParsed);
    }
}
