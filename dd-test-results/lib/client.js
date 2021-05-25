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
exports.DataDogClient = void 0;
const core = __importStar(require("@actions/core"));
const http = __importStar(require("@actions/http-client"));
class DataDogClient {
    constructor(apiKey, baseURL) {
        this.client = new http.HttpClient('dd-http-client', [], {
            headers: {
                'DD-API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });
        this.baseURL = baseURL !== null && baseURL !== void 0 ? baseURL : 'https://api.datadoghq.com';
    }
    sendMetrics(metrics) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = { series: Array() };
            const now = Date.now() / 1000;
            for (const m of metrics) {
                s.series.push({
                    metric: m.name,
                    points: [[now, m.value]],
                    type: m.type,
                    host: m.host,
                    tags: m.tags
                });
            }
            core.debug(`About to send ${metrics.length} metrics`);
            const response = yield this.client.post(`${this.baseURL}/api/v1/series`, JSON.stringify(s));
            if (response.message.statusCode === undefined ||
                response.message.statusCode >= 400) {
                throw new Error(`HTTP request failed: ${response.message.statusMessage}`);
            }
        });
    }
    sendEvents(events) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = 0;
            core.debug(`About to send ${events.length} events`);
            for (const ev of events) {
                const response = yield this.client.post(`${this.baseURL}/api/v1/events`, JSON.stringify(ev));
                if (response.message.statusCode === undefined ||
                    response.message.statusCode >= 400) {
                    errors++;
                    core.error(`HTTP request failed: ${response.message.statusMessage}`);
                }
            }
            if (errors > 0) {
                throw new Error(`Failed sending ${errors} out of ${events.length} events`);
            }
        });
    }
    sendServiceChecks(apiKey, serviceChecks) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = 0;
            core.debug(`About to send ${serviceChecks.length} service checks`);
            for (const sc of serviceChecks) {
                const response = yield this.client.post(`${this.baseURL}/api/v1/check_run`, JSON.stringify(sc));
                if (response.message.statusCode === undefined ||
                    response.message.statusCode >= 400) {
                    errors++;
                    core.error(`HTTP request failed: ${response.message.statusMessage}`);
                }
            }
            if (errors > 0) {
                throw new Error(`Failed sending ${errors} out of ${serviceChecks.length} events`);
            }
        });
    }
}
exports.DataDogClient = DataDogClient;
