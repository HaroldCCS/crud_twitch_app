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
exports.token = exports.validateToken = void 0;
const axios_1 = __importDefault(require("axios"));
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let clientID = process.env.ClientIDTwitch;
    let clientSecret = process.env.clientSecret;
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .post(url)
            .then((res) => {
            exports.token = res.data.access_token;
            return resolve("");
        })
            .catch((error) => {
            return reject(error);
        });
    }));
});
const validateToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = `https://id.twitch.tv/oauth2/validate`;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .get(url, { headers: { Authorization: `Bearer ${exports.token}` } })
            .then((res) => {
            return resolve("Token Successful");
        })
            .catch((error) => {
            getToken().then(res => {
                return resolve("Token restart successful");
            }).catch(err => {
                return reject("Invalid");
            });
        });
    }));
});
exports.validateToken = validateToken;
exports.token = "";
exports.default = getToken;
//# sourceMappingURL=tokenAuthTwitch.js.map