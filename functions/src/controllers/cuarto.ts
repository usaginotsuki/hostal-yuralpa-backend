import {db} from '../index';
import { Cuarto } from '../models/cuarto';
import { Message } from "../models/message";
import { Request, Response } from "express";


const collection="cuarto";

export async function createRoom(req:Request,res:Response){
    try{
        const newCuarto = Cuarto(req.body);
        const CuartoAdded = await db.collection(collection).add(newCuarto);
        return res.status(201).json(Message('Cuarto agregado', `Cuarto fue agregado con el id ${CuartoAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveRoom(req:Request, res:Response){
    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Cuarto no encontrado', `Cuarto con el id ${req.params.id} no encontrado`, 'warning'));               
        }        
        return res.status(200).json(Cuarto(doc.data(), doc.id));   
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function updateRoom(req: Request, res: Response) {       
    try {
        const cuartoToUpdate = Cuarto(req.body);
        await db.collection(collection).doc(req.params.id).set(cuartoToUpdate, {merge : true});
        return res.status(200).json(Message('Cuarto actualizado', `Cuarto con el id ${req.params.id} fue actualizado`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteRoom(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Cuarto eliminado', `Cuarto con el id ${req.params.id} fue eliminado correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listRoom(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('num_habitacion').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Cuarto(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countRoom(req: Request, res: Response) {       
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

