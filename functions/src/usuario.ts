import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db;
const collection="usuario";
const subcollection="habitacion";
const subdb=db.collection(collection);



interface Usuario{
    idusuario?:string,
    nombre:string,
    apellido:string,
    nacionalidad:string,
    telefono:string
}

interface Habitacion{
    idhabitacion?:string,
    fecha_entrada:string,
    fecha_salida:string,
    numero_habitacion:string,
    observaciones:string,
}

function Usuario(id:string, data:any){
    let object:Usuario={
        idusuario:id,
        nombre:data.nombre,
        apellido:data.apellido,
        nacionalidad:data.nacionalidad,
        telefono:data.telefono,
    }
    return object;
}

routes.get('/usuarios',async(req,res)=>{
    db.collection(collection).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Usuario(doc.id, doc.data())))
    })
    .catch(err=>res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error')));

/*    firebaseHelper.firestore.backup(db,collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));*/
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
        res.status(201).json(main.Message('Usuario agregado', 
        `El usuario se agrego a la coleccion con el id ${UsuarioAdded.id}`,
         'success'));
    }
    catch(err){
        res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error'));
    }
});

routes.get('/usuarios/:id',async(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).json(Usuario(doc.id, doc)))
    .catch(err=>res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error')));

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
        res.status(201).json(main.Message('Usuario actualizado', 
        `El usuario se actualizó en la coleccion con el id ${id}`,
         'success'));
    }
    catch(err){
        res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error'));
    }
});

routes.delete('/usuarios/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).json(main.Message('Usuario eliminado', 
        `El usuario se elimno de la coleccion con el id ${id}`,
         'success'));    }
    catch(err){
        res.status(400).json(main.Message('Un error ha ocurrido', `${err}`,'error'));
    }
});

//Subcoleccion de Habitaciones

routes.get('/usuarios/:id/habitacion',(req,res)=>{
    let data=subdb.doc(req.params.id);
    firebaseHelper.firestore.backup(data,subcollection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`Un error ha ocurrido ${err}`));
});

routes.post('/usuarios/:id/habitacion',async(req,res)=>{
    try{
        const newHabitacion:Habitacion={
            fecha_entrada:req.body['fecha_entrada'],
            fecha_salida:req.body['fecha_salida'],
            numero_habitacion:req.body['numero_habitacion'],
            observaciones:req.body['observaciones'],
        }
        let data=subdb.doc(req.params.id);
        const HabitacionAdded=await firebaseHelper.firestore.createNewDocument(data,subcollection,newHabitacion);
        res.status(201).send(`Habitacion fue añadida con id ${HabitacionAdded.id}`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});

routes.get('/usuarios/:id/habitacion/:id2',(req,res)=>{
    let data=subdb.doc(req.params.id);
    firebaseHelper.firestore.getDocument(data,subcollection,req.params.id2)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`Un error ha ocurrido ${err}`))
});

routes.patch('/usuarios/:id/habitacion/:id2',async(req,res)=>{
    try{
        let data=subdb.doc(req.params.id);
        var id2=req.params.id2;
        const newHabitacion:Habitacion={
            fecha_entrada:req.body['fecha_entrada'],
            fecha_salida:req.body['fecha_salida'],
            numero_habitacion:req.body['numero_habitacion'],
            observaciones:req.body['observaciones'],
        }
        await firebaseHelper.firestore.updateDocument(data,subcollection,id2,newHabitacion);
        res.status(200).send(`Reservacion con id ${id2} fue actualizado`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});

routes.delete('/usuarios/:id/habitacion/:id2',async(req,res)=>{
    try{
        let data=db.collection(req.params.id);
        let id2=req.params.id2;
        await firebaseHelper.firestore.deleteDocument(data,subcollection,id2);
        res.status(200).send(`Habitacion con id ${id2} eliminado exitosamente`);
    }
    catch(err){
        res.status(400).send(`Un error ha ocurrido ${err}`);
    }
});


export {routes};