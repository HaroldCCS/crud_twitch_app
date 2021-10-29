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
exports.postUsuario = exports.getUsuario = exports.validationToken = void 0;
const user_1 = __importDefault(require("../models/user"));
const tokenAuthTwitch_1 = require("../services/tokenAuthTwitch");
const validationToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resReturn;
    try {
        resReturn = yield tokenAuthTwitch_1.validateToken();
    }
    catch (error) {
        resReturn = error;
    }
    res.json({ token: resReturn });
});
exports.validationToken = validationToken;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield user_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // try {
    //     const existeEmail = await Usuario.findOne({
    //         where: {
    //             email: body.email
    //         }
    //     });
    //     if (existeEmail) {
    //         return res.status(400).json({
    //             msg: 'Ya existe un usuario con el email ' + body.email
    //         });
    //     }
    //const usuario: any = new Usuario(body);
    //await usuario.save();
    res.json("asd");
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         msg: 'Hable con el administrador'
    //     })
    // }
});
exports.postUsuario = postUsuario;
//# sourceMappingURL=queries.js.map