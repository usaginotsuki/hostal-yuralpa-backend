/*============ Comida ============*/

import {Habitacion} from './habitacion';
export interface Comida{
    idcomida?:string,
    comida:string,
    costo:string,
    fecha:string,
    observaciones:string,
    acomms:Array<Habitacion>[]
}


export function Comida(data:any, id?:string){

    const {comida, costo, fecha, observaciones,acomms}= data;

    let object:Comida={
        idcomida:id,
        comida:comida,
        costo:costo,
        fecha:fecha,
        observaciones:observaciones,
        acomms:acomms

    }
    return object;
}
