"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/mysql/connection"));
const User = connection_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nick_name: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    last_game: {
        type: sequelize_1.DataTypes.STRING
    },
    id_twitch: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    url_image: {
        type: sequelize_1.DataTypes.STRING
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    is_live: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    }
}, { tableName: "User", createdAt: false, updatedAt: false });
exports.default = User;
//# sourceMappingURL=user.js.map