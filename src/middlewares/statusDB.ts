import { Request, Response } from 'express';
import {statusDbMongo, statusDbMySql, statusTokenTwitch} from '../models/server'

const stateMYSQL = async (req: Request , res: Response , next: Function) => {

    if (statusDbMySql) {
        next();
    } else {
        console.log("Endpoint disabled, not connection to Mysql")
        return res.json({status: "Endpoint disabled"})
    }
}

const stateMongo = async (req: Request , res: Response , next: any) => {

    if (statusDbMongo) {
        next();
    } else {
        console.log("Endpoint disabled, not connection to Mongo")
        return res.json({status: "Endpoint disabled"})
    }
}

const stateTokenTwitch = async (req: Request , res: Response , next: any) => {

    if (statusTokenTwitch) {
        next();
    } else {
        console.log("Endpoint disabled, not have token to Twitch")
        return res.json({status: "Endpoint disabled"})
    }
}


export { stateMYSQL, stateMongo, stateTokenTwitch };