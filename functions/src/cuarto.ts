import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db;
const collection="habitacion";

interface Cuarto{
    idcuarto?:string,
    num_habitacion:string,
    costo:string,
    camas:string,
    compartido:boolean,
    internet:boolean,
    aire:boolean,
    disponibilidad:boolean
}


function Cuarto(id:string, data:any){
    let object:Cuarto={
        idcuarto:id,
        num_habitacion:data.num_habitacion,
        costo:data.costo,
        camas:data.camas,
        disponibilidad:data.disponibilidad,
        compartido:data.compartido,
        internet:data.internet,
        aire:data.aire


    }
    return object;
}

routes.get('/cuarto/page/:id',async(req,res)=>{

    var page=parseInt(req.params.id);

    var last= db.collection(collection)
    .orderBy("num_habitacion")
    .limit(((page-1)*5)+1)
    .get();

    var start=(await last).docs[(await last).docs.length-1];

    db.collection(collection)
    .orderBy("num_habitacion")
    .startAt(start.data().num_habitacion)
    .limit(5)
    .get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Cuarto(doc.id, doc.data())))
    })
    .catch(err=>res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error')));

});

routes.post('/cuarto',async(req,res)=>{
    try{
        const newCuarto:Cuarto={
            costo:req.body['costo'],
            num_habitacion:req.body['num_habitacion'],
            compartido:req.body['compartido'],
            internet:req.body['internet'],
            aire:req.body['aire'],
            camas:req.body['camas'],
            disponibilidad:req.body['disponibilidad']
        }
        const CuartoAdded=await firebaseHelper.firestore.createNewDocument(db,collection,newCuarto);
        res.status(201).json(main.Message('Usuario agregado', 
        `El cuarto se agrego a la coleccion con el id ${CuartoAdded.id}`,
         'success'));
    }
    catch(err){
        res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error'));
    }
});

routes.get('/cuarto/:id',async(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).json(Cuarto(doc.id, doc)))
    .catch(err=>res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error')));

});

routes.patch('/cuarto/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const Cuarto:Cuarto={
            costo:req.body['costo'],
            num_habitacion:req.body['num_habitacion'],
            compartido:req.body['compartido'],
            internet:req.body['internet'],
            aire:req.body['aire'],
            camas:req.body['camas'],
            disponibilidad:req.body['disponibilidad']
        }
        await firebaseHelper.firestore.updateDocument(db,collection,id,Cuarto);
        res.status(201).json(main.Message('Cuarto actualizado', 
        `El cuarto se actualizó en la coleccion con el id ${id}`,
         'success'));
    }
    catch(err){
        res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error'));
    }
});

routes.delete('/cuarto/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).json(main.Message('Cuarto eliminado', 
        `El cuarto se elimno de la coleccion con el id ${id}`,
         'success'));    }
    catch(err){
        res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error'));
    }
});

export {routes};