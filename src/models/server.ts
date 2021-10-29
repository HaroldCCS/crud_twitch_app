import express, { Application } from "express";
import userRoutes from "../routes/user";
import queriesRoutes from "../routes/queries";
import gamesRoutes from "../routes/games";
import cors from "cors";

import dbSQL from "../db/mysql/connection";
import dbMONGO from "../db/mongo/connection";
import getToken from '../services/tokenAuthTwitch';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: "/api/users",
        queries: "/api/queries",
        games: "/api/games",
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";

        // Métodos iniciales
        this.dbConnectionMYSQL();
        this.dbConnectionMONGO();
        this.tokenTwitch()
        this.middlewares();
        this.routes();
    }

    async dbConnectionMYSQL() {
        try {
            await dbSQL.authenticate();
            statusDbMySql = true;
            console.log("Database MySQL online");
        } catch (error: any) {
            console.error("Error connection to MySQL")
            statusDbMySql = false;
        }
    }
    async dbConnectionMONGO() {
        try {
            await dbMONGO(process.env.DB_MONGO_CONN || "withoutURL")
            statusDbMongo = true;
            console.log("Database Mongo online");
        } catch (error: any) {
            console.error("Error connection to MongoDB")
            statusDbMongo = false;
        }
    }

    async tokenTwitch() {
        try {
            await getToken()
            statusTokenTwitch = true;
            console.log("Token successful")
        } catch (error: any) {
            statusTokenTwitch = false;
            console.error("Error to get token Twitch")
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.queries, queriesRoutes);
        this.app.use(this.apiPaths.games, gamesRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}

export let statusDbMongo: boolean = false;
export let statusDbMySql: boolean = false;
export let statusTokenTwitch: boolean = false;
export default Server;
