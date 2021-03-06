import {db} from '../index';
import { Servicio } from '../models/servicio'
import { Message } from "../models/message";
import { Request, Response } from "express";
import {Habitacion} from '../models/habitacion';

const collection="servicio";


export async function createService(req:Request,res:Response){
    try{
        const newService = Servicio(req.body);

        const idhabitacion=newService.idhabitacion;

        const docAcomm=await db.collection("habitacion").doc(idhabitacion).get();
        newService.habitacion=Habitacion(docAcomm.data());

        const ServiceAdded = await db.collection(collection).add(newService);
        return res.status(201).json(Message('Servicio agregado', `Servicio fue agregado con el id ${ServiceAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
} 

export async function retrieveService(req:Request, res:Response){
    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
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
        const AcommToUpdate = Servicio(req.body);
        await db.collection(collection).doc(req.params.id).set(AcommToUpdate, {merge : true});
        return res.status(200).json(Message('Servicio actualizado', `Servicio con el id ${req.params.id} fue actualizado`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteService(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Servicio eliminado', `Servicio con el id ${req.params.id} fue eliminado correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listService(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('servicio').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Servicio(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countService(req: Request, res: Response) {       
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
