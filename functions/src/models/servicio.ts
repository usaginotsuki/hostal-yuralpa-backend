import {Habitacion} from './habitacion';

export interface Servicio{
    idservicio?:string,
    servicio:string,
    costo:string,
    fecha:Date,
    detalle:string,
    habitacion?:Habitacion,
    idhabitacion:string
}

export function Servicio(data:any, id?:string){
    const {servicio, costo, fecha, detalle, idhabitacion} = data;

    let object:Servicio={
        idservicio:id,
        servicio:servicio,
        costo:costo,
        fecha:fecha,
        detalle:detalle,
        idhabitacion:idhabitacion

    }
    return object;
}
