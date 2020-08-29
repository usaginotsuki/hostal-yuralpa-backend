import {db} from '../index';
import { Servicio } from '../models/servicio'
import { Message } from "../models/message";
import { Request, Response } from "express";

const collection="habitacion";
const subcollection="servicio";

export async function createService(req:Request,res:Response){
    try{

        let id1 = (req.params.id1);
        const newService = Servicio(req.body);
        const ServiceAdded = await db.collection(collection).doc(id1).collection(subcollection).add(newService);
        return res.status(201).json(Message('Servicio agregado', `Servicio fue agregado con el id ${ServiceAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
} 

export async function retrieveService(req:Request, res:Response){
    try{
        let id1 = (req.params.id1);
        const doc = await db.collection(collection).doc(id1).collection(subcollection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Servicio no encontrado', `Servicio con el id ${req.params.id} no encontrado`, 'warning'));               
        }        
        return res.status(200).json(Servicio(doc.data(), doc.id));   
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function updateService(req: Request, res: Response) {       
    try {
        let id1 = (req.params.id1);
        const AcommToUpdate = Servicio(req.body);
        await db.collection(collection).doc(id1).collection(subcollection).doc(req.params.id).set(AcommToUpdate, {merge : true});
        return res.status(200).json(Message('Servicio actualizado', `Servicio con el id ${req.params.id} fue actualizado`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteService(req: Request, res: Response) {       
    try{
        let id1 = (req.params.id1);
        await db.collection(collection).doc(id1).collection(subcollection).doc(req.params.id).delete();
        return res.status(200).json(Message('Servicio eliminado', `Servicio con el id ${req.params.id} fue eliminado correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listService(req: Request, res: Response) {       
    try {
        let id1 = (req.params.id1);
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).doc(id1).collection(subcollection).orderBy('servicio').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Servicio(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countService(req: Request, res: Response) {       
    try {
        let id1 = (req.params.id1);
        let snapshot = await db.collection(collection).doc(id1).collection(subcollection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
