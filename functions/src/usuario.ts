import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db;
const collection="usuario";
const subcollection="habitacion";
/*const subdb=db.collection(collection);
*/
interface Usuario{
    nombre:string,
    apellido:string,
    nacionalidad:string,
    telefono:string
}

interface Habitacion{
    fecha_entrada:string,
    fecha_salida:string,
    numero_habitacion:string,
    observaciones:string,
}

routes.get('/usuarios',async(req,res)=>{
    firebaseHelper.firestore.backup(db,collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

routes.post('/usuarios',async(req,res)=>{
    try{
        const newUsuario:Usuario={
            nombre:req.body['nombre'],
            apellido:req.body['apellido'],
            nacionalidad:req.body['nacionalidad'],
            telefono:req.body['telefono']
        }
        const UsuarioAdded=await firebaseHelper.firestore.createNewDocument(db,collection,newUsuario);
        res.status(201).send(`Usuario nuevo añadido con id ${UsuarioAdded.id}`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});

routes.get('/usuarios/:id',async(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`Un error ha ocurrido ${err}`))
});

routes.patch('/usuarios/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const Usuario:Usuario={
            nombre:req.body['nombre'],
            apellido:req.body['apellido'],
            nacionalidad:req.body['nacionalidad'],
            telefono:req.body['telefono']
        }
        await firebaseHelper.firestore.updateDocument(db,collection,id,Usuario);
        res.status(200).send(`Usuario con id ${id} fue actualizado`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});

routes.delete('/usuarios/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).send(`Usuario con id ${id} eliminado exitosamente`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});

//Subcoleccion de Habitaciones

routes.get('/usuarios/:id/habitacion',(req,res)=>{
    let data=subcollection.doc(req.params.id);
    firebaseHelper.firestore.backup(data,collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

routes.post('/usuarios',async(req,res)=>{
    try{
        const newUsuario:Usuario={
            nombre:req.body['nombre'],
            apellido:req.body['apellido'],
            nacionalidad:req.body['nacionalidad'],
            telefono:req.body['telefono']
        }
        const UsuarioAdded=await firebaseHelper.firestore.createNewDocument(db,collection,newUsuario);
        res.status(201).send(`Usuario nuevo añadido con id ${UsuarioAdded.id}`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});

routes.get('/usuarios/:id',async(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`Un error ha ocurrido ${err}`))
});

routes.patch('/usuarios/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const Usuario:Usuario={
            nombre:req.body['nombre'],
            apellido:req.body['apellido'],
            nacionalidad:req.body['nacionalidad'],
            telefono:req.body['telefono']
        }
        await firebaseHelper.firestore.updateDocument(db,collection,id,Usuario);
        res.status(200).send(`Usuario con id ${id} fue actualizado`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});
/*
routes.delete('/usuarios/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).send(`Usuario con id ${id} eliminado exitosamente`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});
*/

export {routes};