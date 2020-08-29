import {Application} from 'express';

import { createUser, retrieveUser, updateUser, deleteUser, countUser, listUser } from './controllers/usuario';
import { createRoom, retrieveRoom, updateRoom, deleteRoom, countRoom, listRoom } from './controllers/cuarto';
import { createAcommodation, retrieveAcommodation, updateAcommodation, deleteAcommodation, countAcommodation, listAcommodation } from './controllers/habitacion';
import { createService, retrieveService, updateService, deleteService, countService, listService } from './controllers/servicio';
import { createMeal, retrieveMeal, updateMeal, deleteMeal, countMeal, listMeal } from './controllers/comida';

export function routesUser (app:Application){
    app.post('/api/user', createUser);
    app.get('/api/user/:id', retrieveUser);
    app.put('/api/user/:id', updateUser);
    app.delete('/api/user/:id', deleteUser);
    app.get('/api/count/user', countUser);
    app.get('/api/page/user/:page/:limit', listUser);

}
export function routesRoom (app:Application){
    app.post('/api/room', createRoom);
    app.get('/api/room/:id', retrieveRoom);
    app.put('/api/room/:id', updateRoom);
    app.delete('/api/room/:id', deleteRoom);
    app.get('/api/count/room', countRoom);
    app.get('/api/page/room/:page/:limit', listRoom);
}
export function routesAcomm (app:Application){
    app.post('/api/acomm', createAcommodation);
    app.get('/api/acomm/:id', retrieveAcommodation);
    app.put('/api/acomm/:id', updateAcommodation);
    app.delete('/api/acomm/:id', deleteAcommodation);
    app.get('/api/count/acomm', countAcommodation);
    app.get('/api/page/acomm/:page/:limit', listAcommodation);

}
export function routesService (app:Application){
    app.post('/api/acomm/service', createService);
    app.get('/api/acomm/service/:id', retrieveService);
    app.put('/api/acomm/service/:id', updateService);
    app.delete('/api/acomm/service/:id', deleteService);
    app.get('/api/count/acomm/service', countService);
    app.get('/api/page/acomm/service/:page/:limit', listService);

}
export function routesMeal (app:Application){
    app.post('/api/acomm/meal', createMeal);
    app.get('/api/acomm/meal/:id', retrieveMeal);
    app.put('/api/acomm/meal/:id', updateMeal);
    app.delete('/api/acomm/meal/:id', deleteMeal);
    app.get('/api/count/acomm/meal/:id', countMeal);
    app.get('/api/page/acomm/meal/:page/:limit', listMeal);

}