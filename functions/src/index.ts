import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { routesUser, routesAcomm, routesRoom, routesService, routesMeal } from './routes';

admin.initializeApp(functions.config().firebase);

const db=admin.firestore();
db.settings({ignoreUndefinedProperties:true,  timestampsInSnapshot: true});

const server=express();

server.use(cors({origin: true}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

routesUser(server);
routesRoom(server);
routesAcomm(server);
routesService(server);
routesMeal(server);

export const api=functions.https.onRequest(server);
export{db};
