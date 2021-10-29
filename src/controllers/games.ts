import { Request, Response } from 'express';
import { GameModel as Game } from '../models/game';
import getChannelByName from '../services/callsTwitch';
import { processValidationBodyJsonSchema } from '../utils/json-schema/index';


export const getGames = async( req: Request , res: Response ) => {

    const games = await Game.find();

    res.json({ games });
}

export const getUsuario = async( req: Request , res: Response ) => {
    const { id } = req.params;
    try {
        const gameById : any = await Game.findOne( {_id: id} );
        if( gameById ) {
            res.json(gameById);
        } else {
            res.status(404).json({
                msg: `Game not found id ${ id }`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }


}

export const postUsuario = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        let dataValidation = processValidationBodyJsonSchema(body, "schema_gameRegister")
        if (dataValidation.status){
            console.error(dataValidation.messageError);
            return res.json( dataValidation.response );

        }

        let data: any = await getChannelByName(body.name_twitch);

        let foundStreamer: object | undefined  | any =data.data.find((element: any) => element.display_name == body.name_twitch || element.broadcaster_login == body.name_twitch )

        if (!foundStreamer) {
            return res.json({data: "Streamer not found"})
        }

         const existsGame = await Game.findOne({
             where: {
                 name: foundStreamer.display_name
             }
         });

         if (existsGame) {
             return res.status(400).json({
                 msg: `Game ${foundStreamer.display_name} already exists`
             });
         }

        const bodySend : object = {
            nick_name: body.nickname || foundStreamer.display_name,
            name: foundStreamer.display_name,
            last_game: foundStreamer.game_name,
            id_twitch: foundStreamer.id,
            url_image: foundStreamer.thumbnail_url,
            title: foundStreamer.title,
            is_live: foundStreamer.is_live,
            description: body.description ? body.description : ""
        }

        const usuario: any = new Game(bodySend);
        await usuario.save().then((result: object) => {
            res.json( result );
        }).catch((err: any) => {
            res.json( {msg: "Error to create game"} );
        });



    } catch (error) {


    }
}
