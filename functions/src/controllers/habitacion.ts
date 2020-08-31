import {db} from '../index';
import { Habitacion } from '../models/habitacion'
import { Message } from "../models/message";
import { Request, Response } from "express";

const collection="habitacion";

export async function createAcommodation(req:Request,res:Response){
    try{
        const newHabitacion = Habitacion(req.body);

        const HabitacionAdded = await db.collection(collection).add(newHabitacion);
        return res.status(201).json(Message('Alojamiento agregado', `Alojamiento fue agregado con el id ${HabitacionAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveAcommodation(req:Request, res:Response){
    let id=req.params.id;
    try{
        const doc = await db.collection(collection).doc(id).get();        
        if(!doc) {
            return res.status(404).json(Message('Alojamiento no encontrado', `Alojamiento con el id ${req.params.id} no encontrado`, 'warning'));               
        }        
        return res.status(200).json(Habitacion(doc.data(),doc.id));   
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function updateAcommodation(req: Request, res: Response) {       
    try {
        const AcommToUpdate = Habitacion(req.body);
        await db.collection(collection).doc(req.params.id).set(AcommToUpdate, {merge : true});
        return res.status(200).json(Message('Alojamiento actualizado', `Alojamiento con el id ${req.params.id} fue actualizado`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteAcommodation(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Alojamiento eliminado', `Alojamiento con el id ${req.params.id} fue eliminado correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listAcommodation(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('num_cuarto').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Habitacion(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countAcommodation(req: Request, res: Response) {       
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

