import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/user';
import { token, validateToken } from '../services/tokenAuthTwitch';


export const validationToken = async( req: Request , res: Response ) => {
    let resReturn: string;
    try {
        resReturn = await validateToken();
    } catch (error : string | any) {
        resReturn = error;
    }
    res.json({ token: resReturn });
}

export const getUsuario = async( req: Request , res: Response ) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postUsuario = async( req: Request , res: Response ) => {

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

        res.json( "asd" );


    // } catch (error) {

    //     console.log(error);
    //     res.status(500).json({
    //         msg: 'Hable con el administrador'
    //     })
    // }

}

