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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const user_1 = __importDefault(require("../models/user"));
const callsTwitch_1 = __importDefault(require("../services/callsTwitch"));
const index_1 = require("../utils/json-schema/index");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({ users });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userById = yield user_1.default.findByPk(id);
    if (userById) {
        res.json(userById);
    }
    else {
        res.status(404).json({
            msg: `User not found id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        let dataValidation = (0, index_1.processValidationBodyJsonSchema)(body, "schema_userRegister");
        if (dataValidation.status) {
            console.error(dataValidation.messageError);
            return res.json(dataValidation.response);
        }
        let data = yield (0, callsTwitch_1.default)(body.name_twitch);
        let foundStreamer = data.data.find((element) => element.display_name == body.name_twitch || element.broadcaster_login == body.name_twitch);
        if (!foundStreamer) {
            return res.json({ data: "Streamer not found" });
        }
        const existsUser = yield user_1.default.findOne({
            where: {
                name: foundStreamer.display_name
            }
        });
        if (existsUser) {
            return res.status(400).json({
                msg: `User ${foundStreamer.display_name} already exists`
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
        const usuario = new user_1.default(bodySend);
        yield usuario.save().then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json({ msg: "Error to create user" });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        let dataValidation = (0, index_1.processValidationBodyJsonSchema)(body, "schema_userUpdate");
        if (dataValidation.status) {
            console.error(dataValidation.messageError);
            return res.json(dataValidation.response);
        }
        const usuario = yield user_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "User not found: id " + id
            });
        }
        let dataUpdate = {};
        if (body.update_twitch_data) {
            let data = yield (0, callsTwitch_1.default)(usuario.dataValues.name);
            let foundStreamer = data.data.find((element) => element.display_name == usuario.dataValues.name || element.broadcaster_login == usuario.dataValues.name);
            dataUpdate = {
                nick_name: body.nickname || foundStreamer.display_name,
                last_game: body.last_game || foundStreamer.game_name,
                url_image: body.url_image || foundStreamer.thumbnail_url,
                title: body.title || foundStreamer.title,
                is_live: body.is_live || foundStreamer.is_live,
                description: body.description || usuario.description
            };
        }
        else {
            dataUpdate = {
                nick_name: body.nickname || usuario.dataValues.nick_name,
                last_game: body.last_game || usuario.dataValues.last_game,
                url_image: body.url_image || usuario.dataValues.url_image,
                title: body.title || usuario.dataValues.title,
                is_live: body.is_live || usuario.dataValues.is_live,
                description: body.description || usuario.dataValues.description
            };
        }
        yield usuario.update(dataUpdate);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield user_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.update({ estado: false });
    yield usuario.destroy().then(() => {
        res.json({ usuario });
    }).catch((err) => {
        res.json({ msg: "Error to create user" });
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=users.js.map