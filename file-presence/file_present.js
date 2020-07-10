module.exports =
module.exports = require("os");

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

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
const fs_1 = __importDefault(__webpack_require__(747));

function checkExistence(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.access(path);
        }
        catch (error) {
            return false;
        }
        return true;
    });
}

function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = core.getInput('files', { required: true });
            const failure = (core.getInput('allow_failure') || 'false').toUpperCase() === 'TRUE';
            const fileList = files
                .split(',')
                .map((item) => item.trim());
            const missingFiles = [];
            yield Promise.all(fileList.map((file) => __awaiter(this, void 0, void 0, function* () {
                const isPresent = yield checkExistence(file);
                if (!isPresent) {
                    missingFiles.push(file);
                }
            })));
            console.log(missingFiles);
            if (missingFiles.length > 0) {
                core.info(`These files don't exist: ${missingFiles.join(', ')}`);
                core.setOutput('exists', 'false');
            }
            else {
                core.info('All files exists');
                core.setOutput('exists', 'true');
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}

run();
