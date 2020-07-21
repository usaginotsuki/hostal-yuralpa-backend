import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

admin.initializeApp(functions.config().firebase);

const db=admin.firestore();
db.settings({ignoreUndefinedProperties:true});

const main=express();
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended:false}));
main.use('/api',require('./usuario').routes);
/*main.use('/api',require('./reservacion').routes);
main.use('/api',require('./habitacion').routes);

*/
export interface Mensaje{
    title:string,
    text:string,
    icon:string
}

export function Message(title:string, text:string, icon: string){
    let message :Mensaje = {
        title: title,
        text: text,
        icon: icon
    }
    return message;
}

export const api=functions.https.onRequest(main);
export{db};
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
