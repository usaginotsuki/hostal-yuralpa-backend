import {db} from '../index';
import { Comida } from '../models/comida';
import { Message } from "../models/message";
import { Request, Response } from "express";
import {Habitacion} from '../models/habitacion';


const collection="alimentacion";

export async function createMeal(req:Request,res:Response){
    try{
        const newMeal = Comida(req.body);

        const idhabitacion=newMeal.idhabitacion;

        const docAcomm=await db.collection("habitacion").doc(idhabitacion).get();
        newMeal.habitacion=Habitacion(docAcomm.data());
        
        const MealAdded = await db.collection(collection).add(newMeal);
        return res.status(201).json(Message('Comida agregada', `Comida fue agregada con el id ${MealAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
} 

export async function retrieveMeal(req:Request, res:Response){
    try{

        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Comida no encontrada', `Comida con el id ${req.params.id} no encontrado`, 'warning'));               
        }        
        return res.status(200).json(Comida(doc.data(), doc.id));   
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function updateMeal(req: Request, res: Response) {       
    try {

        const MealToUpdate = Comida(req.body);
        await db.collection(collection).doc(req.params.id).set(MealToUpdate, {merge : true});
        return res.status(200).json(Message('Comida actualizada', `Comida con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteMeal(req: Request, res: Response) {       
    try{

        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Comida eliminada', `Comida con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listMeal(req: Request, res: Response) {       
    try {

        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('servicio').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Comida(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countMeal(req: Request, res: Response) {       
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
