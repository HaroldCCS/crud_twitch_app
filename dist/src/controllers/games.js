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
exports.postUsuario = exports.getUsuario = exports.getGames = void 0;
const game_1 = require("../models/game");
const callsTwitch_1 = __importDefault(require("../services/callsTwitch"));
const index_1 = require("../utils/json-schema/index");
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield game_1.GameModel.find();
    res.json({ games });
});
exports.getGames = getGames;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gameById = yield game_1.GameModel.findOne({ _id: id });
        if (gameById) {
            res.json(gameById);
        }
        else {
            res.status(404).json({
                msg: `Game not found id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        let dataValidation = index_1.processValidationBodyJsonSchema(body, "schema_gameRegister");
        if (dataValidation.status) {
            console.error(dataValidation.messageError);
            return res.json(dataValidation.response);
        }
        let data = yield callsTwitch_1.default(body.name_twitch);
        let foundStreamer = data.data.find((element) => element.display_name == body.name_twitch || element.broadcaster_login == body.name_twitch);
        if (!foundStreamer) {
            return res.json({ data: "Streamer not found" });
        }
        const existsGame = yield game_1.GameModel.findOne({
            where: {
                name: foundStreamer.display_name
            }
        });
        if (existsGame) {
            return res.status(400).json({
                msg: `Game ${foundStreamer.display_name} already exists`
            });
        }
        const bodySend = {
            nick_name: body.nickname || foundStreamer.display_name,
            name: foundStreamer.display_name,
            last_game: foundStreamer.game_name,
            id_twitch: foundStreamer.id,
            url_image: foundStreamer.thumbnail_url,
            title: foundStreamer.title,
            is_live: foundStreamer.is_live,
            description: body.description ? body.description : ""
        };
        const usuario = new game_1.GameModel(bodySend);
        yield usuario.save().then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json({ msg: "Error to create game" });
        });
    }
    catch (error) {
    }
});
exports.postUsuario = postUsuario;
//# sourceMappingURL=games.js.map