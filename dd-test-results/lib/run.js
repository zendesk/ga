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
exports.run = void 0;
const core = __importStar(require("@actions/core"));
// import * as junitTestResultParser from './junit-test-result-parser'
// import {DataDogClient} from '../src/client'
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // IMPLEMENTED - Get the input from action.yml
            // const apiKey: string = core.getInput('dd-api-key', {required: true})
            // const testDataPath: string = core.getInput('test-data-path', {
            //   required: true
            // })
            // const testReportPath: string = core.getInput('junit-test-report', {
            //   required: true
            // })
            // IMPLEMENTED - Create the client
            // const dataDogClient = new DataDogClient(apiKey)
            // IMPLEMENTED - Parse the test results
            // const testResults = await junitTestResultParser.parse(testReportPath)
            // TODO - The following code is to parse the test data json
            // let testData = await testDataParser.parse(testDataPath)
            // TODO - Generate metrics and service checks from testResults and testData
            // let metrics = await dataDogProcessor.getMetrics(testResults, testData)
            // let serviceChecks = await dataDogProcessor.getServiceChecks(testResults, testData)
            // IMPLEMENTED - Send the metrics and service checks
            // await dataDogClient.sendMetrics(metrics)
            // await dataDogClient.sendServiceChecks(serviceChecks)
        }
        catch (error) {
            core.setFailed(`Run failed: ${error.message}`);
        }
    });
}
exports.run = run;
