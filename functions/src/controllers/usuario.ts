import {db} from '../index';
import { Usuario } from '../models/usuario';
import { Message } from "../models/message";
import { Request, Response } from "express";

const collection="usuario";

export async function createUser(req:Request,res:Response){
    try{
        const newUsuario = Usuario(req.body);
        const usuarioAdded = await db.collection(collection).add(newUsuario);
        return res.status(201).json(Message('Usuario agregado', `Usuario fue agregado con el id ${usuarioAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveUser(req:Request, res:Response){
    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Usuario no encontrado', `Persona con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Usuario(doc.data(), doc.id));   
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function updateUser(req: Request, res: Response) {       
    try {
        const userToUpdate = Usuario(req.body);
        await db.collection(collection).doc(req.params.id).set(userToUpdate, {merge : true});
        return res.status(200).json(Message('Usuario actualizado', `Usuario con el id ${req.params.id} fue actualizado`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteUser(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Usuario eliminado', `Usuario con el id ${req.params.id} fue eliminado correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listUser(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('apellido').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Usuario(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countUser(req: Request, res: Response) {       
    try {
        let snapshot = await db.collection(collection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
