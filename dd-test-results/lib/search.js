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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTestReports = void 0;
// eslint-disable-next-line @typescript-eslint/no-require-imports
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
            if (!fileStats.isDirectory()) {
                testReportFiles.push(searchResult);
            }
        }
        return testReportFiles;
    });
}
exports.findTestReports = findTestReports;
