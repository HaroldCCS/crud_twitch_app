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
exports.deleteGame = exports.putGame = exports.postGame = exports.getGame = exports.getGamesTop = exports.getGames = void 0;
const game_1 = require("../models/game");
const callsTwitch_1 = __importStar(require("../services/callsTwitch"));
const index_1 = require("../utils/json-schema/index");
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield game_1.GameModel.find();
    return res.json({ games });
});
exports.getGames = getGames;
const getGamesTop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield callsTwitch_1.getTopGames();
    return res.json({ games });
});
exports.getGamesTop = getGamesTop;
const getGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gameById = yield game_1.GameModel.findOne({ id: id });
        if (gameById) {
            return res.json(gameById);
        }
        else {
            return res.status(404).json({
                msg: `Game not found id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});
exports.getGame = getGame;
const postGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        let dataValidation = index_1.processValidationBodyJsonSchema(body, "schema_gameRegister");
        if (dataValidation.status) {
            console.error(dataValidation.messageError);
            return res.json(dataValidation.response);
        }
        const gameById = yield game_1.GameModel.findOne({ id: body.id });
        if (gameById) {
            return res.json({
                msg: `Game already exists id ${body.id}`
            });
        }
        let gamesInGame;
        if (body.games) {
            gamesInGame = body.games;
        }
        else {
            let data = yield callsTwitch_1.default(body.name);
            gamesInGame = data.data.length;
        }
        const doc = new game_1.GameModel({
            id: body.id,
            name: body.name,
            description: body.description || '',
            category: body.category || '',
            games: gamesInGame
        });
        yield doc.save().then((result) => {
            return res.json(result);
        }).catch((err) => {
            return res.json({ msg: "Error to create game" });
        });
    }
    catch (error) {
        return res.json({ msg: "Internal server error" });
    }
});
exports.postGame = postGame;
const putGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        let dataValidation = index_1.processValidationBodyJsonSchema(body, "schema_gameUpdate");
        if (dataValidation.status) {
            console.error(dataValidation.messageError);
            return res.json(dataValidation.response);
        }
        const gameById = yield game_1.GameModel.findOne({ id: id });
        if (!gameById) {
            return res.status(404).json({
                msg: `Game not found id ${id}`
            });
        }
        let dataUpdate = {
            name: body.name || gameById.name,
            description: body.description || gameById.description,
            category: body.category || gameById.category,
            users: body.users || gameById.users
        };
        yield game_1.GameModel.updateOne({ id: id }, dataUpdate);
        return res.json({ msg: "Game update successfull" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});
exports.putGame = putGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const gameById = yield game_1.GameModel.findOne({ id: id });
    if (!gameById) {
        return res.status(404).json({
            msg: `Game not found id ${id}`
        });
    }
    yield game_1.GameModel.deleteOne({ id: id }).then(() => {
        return res.json({ msg: "Game delete successfull" });
    }).catch((err) => {
        return res.json({ msg: "Error to delete game" });
    });
});
exports.deleteGame = deleteGame;
//# sourceMappingURL=games.js.map