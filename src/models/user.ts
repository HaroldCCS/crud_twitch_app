import { DataTypes } from 'sequelize';
import db from '../db/mysql/connection';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nick_name: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    last_game: {
        type: DataTypes.STRING
    },
    id_twitch: {
        type: DataTypes.STRING,
        unique: true
    },
    url_image: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    is_live: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.STRING
    }
}, { tableName: "User", createdAt: false, updatedAt: false });


export default User;