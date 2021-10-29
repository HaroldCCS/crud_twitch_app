import { Sequelize } from 'sequelize';

const db = new Sequelize('crud_twitch', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default db;
