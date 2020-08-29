/*============ Comida ============*/

import {Habitacion} from './habitacion';
export interface Comida{
    idcomida?:string,

    habitacion?:Habitacion,
    comida:string,
    costo:string,
    fecha:string,
    observaciones:string,
    idhabitacion:string

}


export function Comida(data:any, id?:string){

    const {comida, costo, fecha, observaciones, idhabitacion}= data;

    let object:Comida={
        idcomida:id,
        comida:comida,
        costo:costo,
        fecha:fecha,
        observaciones:observaciones,
        idhabitacion:idhabitacion

    }
    return object;
}
