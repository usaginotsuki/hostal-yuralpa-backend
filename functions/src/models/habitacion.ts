/*============ Habitaciones ============*/
import {Cuarto} from './cuarto';
import {Usuario} from './usuario'
export interface Habitacion{
    idhabitacion?:string,
    fecha_entrada:Date,
    fecha_salida:Date,
    num_cuarto:string,
    observaciones:string,
    idusuario:string,
    idcuarto:string
    cuarto?:Cuarto,
    usuario?:Usuario
}

export function Habitacion(data:any, id?:string){

    const {fecha_entrada, fecha_salida, num_cuarto, observaciones,idusuario,idcuarto, cuarto, usuario} = data;
 
    let object:Habitacion={
        idhabitacion:id,
        fecha_entrada:fecha_entrada,
        fecha_salida:fecha_salida,
        num_cuarto:num_cuarto,
        observaciones:observaciones,
        idusuario:idusuario,
        idcuarto:idcuarto,
        cuarto:cuarto,
        usuario:usuario

    }
    return object;
}