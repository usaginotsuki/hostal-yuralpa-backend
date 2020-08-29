/*============ Habitaciones ============*/

import {Usuario} from './usuario';
import {Cuarto} from './cuarto';


export interface Habitacion{
    idhabitacion?:string,
    fecha_entrada:Date,
    fecha_salida:Date,
    numero_habitacion:string,
    observaciones:string,
    usuario?:Usuario,
    cuarto?:Cuarto,
    idusuario:string,
    idcuarto:string
}

export function Habitacion(data:any, id?:string){

    const {fecha_entrada, fecha_salida, numero_habitacion, observaciones,idusuario,idcuarto} = data;
 
    let object:Habitacion={
        idhabitacion:id,
        fecha_entrada:fecha_entrada,
        fecha_salida:fecha_salida,
        numero_habitacion:numero_habitacion,
        observaciones:observaciones,
        idusuario:idusuario,
        idcuarto:idcuarto
    }
    return object;
}