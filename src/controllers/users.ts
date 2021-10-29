import { Request, Response } from 'express';
import User from '../models/user';
import getChannelByName from '../services/callsTwitch';
import { processValidationBodyJsonSchema } from '../utils/json-schema/index';


export const getUsuarios = async( req: Request , res: Response ) => {

    const users = await User.findAll();

    res.json({ users });
}

export const getUsuario = async( req: Request , res: Response ) => {
    const { id } = req.params;

    const userById = await User.findByPk( id );

    if( userById ) {
        res.json(userById);
    } else {
        res.status(404).json({
            msg: `User not found id ${ id }`
        });
    }
}

export const postUsuario = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        let dataValidation = processValidationBodyJsonSchema(body, "schema_userRegister")
        if (dataValidation.status){
            console.error(dataValidation.messageError);
            return res.json( dataValidation.response );

        }

        let data: any = await getChannelByName(body.name_twitch);

        let foundStreamer: object | undefined  | any =data.data.find((element: any) => element.display_name == body.name_twitch || element.broadcaster_login == body.name_twitch )

        if (!foundStreamer) {
            return res.json({data: "Streamer not found"})
        }

         const existsUser = await User.findOne({
             where: {
                 name: foundStreamer.display_name
             }
         });

         if (existsUser) {
             return res.status(400).json({
                 msg: `User ${foundStreamer.display_name} already exists`
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

        const usuario: any = new User(bodySend);
        await usuario.save().then((result: object) => {
            res.json( result );
        }).catch((err: any) => {
            res.json( {msg: "Error to create user"} );
        });



    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

export const putUsuario = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        let dataValidation = processValidationBodyJsonSchema(body, "schema_userUpdate")
        if (dataValidation.status){
            console.error(dataValidation.messageError);
            return res.json( dataValidation.response );

        }

        const usuario: any = await User.findByPk( id );
        if ( !usuario ) {
            return res.status(404).json({
                msg: "User not found: id " + id
            });
        }
        let dataUpdate = {}

        if (body.update_twitch_data){
            let data: any = await getChannelByName(usuario.dataValues.name)
            let foundStreamer: object | undefined  | any =data.data.find((element: any) => element.display_name == usuario.dataValues.name || element.broadcaster_login == usuario.dataValues.name )
            dataUpdate  = {
                nick_name: body.nickname || foundStreamer.display_name,
                last_game: body.last_game || foundStreamer.game_name,
                url_image: body.url_image || foundStreamer.thumbnail_url,
                title: body.title || foundStreamer.title,
                is_live: body.is_live || foundStreamer.is_live,
                description: body.description || usuario.description
            }
        }else{
            dataUpdate  = {
                nick_name: body.nickname || usuario.dataValues.nick_name,
                last_game: body.last_game || usuario.dataValues.last_game,
                url_image: body.url_image || usuario.dataValues.url_image,
                title: body.title || usuario.dataValues.title,
                is_live: body.is_live || usuario.dataValues.is_live,
                description: body.description || usuario.dataValues.description
            }
        }

        await usuario.update( dataUpdate );

        res.json( usuario );

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}


export const deleteUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await User.findByPk( id );
    if ( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estado: false });

    await usuario.destroy().then(() => {
        res.json( {usuario});
    }).catch((err: any) => {
        res.json( {msg: "Error to create user"} );
    });

}
