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
exports.stateTokenTwitch = exports.stateMongo = exports.stateMYSQL = void 0;
const server_1 = require("../models/server");
const stateMYSQL = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (server_1.statusDbMySql) {
        next();
    }
    else {
        console.log("Endpoint disabled, not connection to Mysql");
        return res.json({ status: "Endpoint disabled" });
    }
});
exports.stateMYSQL = stateMYSQL;
const stateMongo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (server_1.statusDbMongo) {
        next();
    }
    else {
        console.log("Endpoint disabled, not connection to Mongo");
        return res.json({ status: "Endpoint disabled" });
    }
});
exports.stateMongo = stateMongo;
const stateTokenTwitch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (server_1.statusTokenTwitch) {
        next();
    }
    else {
        console.log("Endpoint disabled, not have token to Twitch");
        return res.json({ status: "Endpoint disabled" });
    }
});
exports.stateTokenTwitch = stateTokenTwitch;
//# sourceMappingURL=statusDB.js.map