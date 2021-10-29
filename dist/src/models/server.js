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
exports.statusTokenTwitch = exports.statusDbMySql = exports.statusDbMongo = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const queries_1 = __importDefault(require("../routes/queries"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/mysql/connection"));
const connection_2 = __importDefault(require("../db/mongo/connection"));
const tokenAuthTwitch_1 = __importDefault(require("../services/tokenAuthTwitch"));
class Server {
    constructor() {
        this.apiPaths = {
            users: "/api/users",
            queries: "/api/queries",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        // Métodos iniciales
        this.dbConnectionMYSQL();
        this.dbConnectionMONGO();
        this.tokenTwitch();
        this.middlewares();
        this.routes();
    }
    dbConnectionMYSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                exports.statusDbMySql = true;
                console.log("Database MySQL online");
            }
            catch (error) {
                console.error("Error connection to MySQL");
                exports.statusDbMySql = false;
            }
        });
    }
    dbConnectionMONGO() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connection_2.default)(process.env.DB_MONGO_CONN || "withoutURL");
                exports.statusDbMongo = true;
                console.log("Database Mongo online");
            }
            catch (error) {
                console.error("Error connection to MongoDB");
                exports.statusDbMongo = false;
            }
        });
    }
    tokenTwitch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, tokenAuthTwitch_1.default)();
                exports.statusTokenTwitch = true;
                console.log("Token successful");
            }
            catch (error) {
                exports.statusTokenTwitch = false;
                console.error("Error to get token Twitch");
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.queries, queries_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.statusDbMongo = false;
exports.statusDbMySql = false;
exports.statusTokenTwitch = false;
exports.default = Server;
//# sourceMappingURL=server.js.map