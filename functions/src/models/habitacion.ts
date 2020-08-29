/*============ Habitaciones ============*/



export interface Habitacion{
    idhabitacion?:string,
    fecha_entrada:Date,
    fecha_salida:Date,
    numero_habitacion:string,
    observaciones:string,
    
}

export function Habitacion(data:any, id?:string){

    const {fecha_entrada, fecha_salida, numero_habitacion, observaciones} = data;
 
    let object:Habitacion={
        idhabitacion:id,
        fecha_entrada:fecha_entrada,
        fecha_salida:fecha_salida,
        numero_habitacion:numero_habitacion,
        observaciones:observaciones,
        
    }
    return object;
}