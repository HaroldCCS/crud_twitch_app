import { Request, Response } from 'express';
import { GameModel as Game } from '../models/game';
import getChannelByName, { getTopGames } from '../services/callsTwitch';
import { processValidationBodyJsonSchema } from '../utils/json-schema/index';


export const getGames = async( req: Request , res: Response ) => {

    const games = await Game.find();

    return res.json({ games });
}

export const getGamesTop = async( req: Request , res: Response ) => {

    const games = await getTopGames();

    return res.json({ games });
}

export const getGame = async( req: Request , res: Response ) => {
    const { id } = req.params;
    try {
        const gameById : any = await Game.findOne( {id: id} );
        if( gameById ) {
            return res.json(gameById);
        } else {
            return res.status(404).json({
                msg: `Game not found id ${ id }`
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error'
        })
    }


}

export const postGame = async( req: Request , res: Response ) => {
    const { body } = req;

    try {
        let dataValidation = processValidationBodyJsonSchema(body, "schema_gameRegister")
        if (dataValidation.status){
            console.error(dataValidation.messageError);
            return res.json( dataValidation.response );

        }
        const gameById : any = await Game.findOne( {id: body.id} );
        if( gameById ) {
            return res.json({
                msg: `Game already exists id ${ body.id }`
            });
        }
        let gamesInGame:number;
        if (body.games) {
            gamesInGame = body.games
        } else {
            let data: any = await getChannelByName(body.name);
            gamesInGame = data.data.length;
        }

        const doc = new Game({
            id: body.id,
            name: body.name,
            description: body.description || '',
            category: body.category || '',
            games: gamesInGame
          });
        await doc.save().then((result: object) => {
            return res.json( result );
        }).catch((err: any) => {
            return res.json( {msg: "Error to create game"} );
        });

    } catch (error) {
        return res.json( {msg: "Internal server error"} );
    }
}

export const putGame = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        let dataValidation = processValidationBodyJsonSchema(body, "schema_gameUpdate")
        if (dataValidation.status){
            console.error(dataValidation.messageError);
            return res.json( dataValidation.response );

        }

        const gameById : any = await Game.findOne( {id: id} );
        if( !gameById ) {
            return res.status(404).json({
                msg: `Game not found id ${ id }`
            });
        }
        let dataUpdate = {
            name: body.name || gameById.name,
            description: body.description || gameById.description,
            category: body.category || gameById.category,
            users: body.users  || gameById.users
        }


        await Game.updateOne( {id: id}, dataUpdate )
        return res.json( {msg: "Game update successfull"} );

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}


export const deleteGame = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const gameById : any = await Game.findOne( {id: id} );
    if( !gameById ) {
        return res.status(404).json({
            msg: `Game not found id ${ id }`
        });
    }

    await Game.deleteOne({id: id}).then(() => {
        return res.json( {msg: "Game delete successfull"});

    }).catch((err: any) => {
        return res.json( {msg: "Error to delete game"} );
    });

}
