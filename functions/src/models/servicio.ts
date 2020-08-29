

export interface Servicio{
    idservicio?:string,
    servicio:string,
    costo:string,
    fecha:Date,
    detalle:string,


}

export function Servicio(data:any, id?:string){
    const {servicio, costo, fecha, detalle} = data;

    let object:Servicio={
        idservicio:id,
        servicio:servicio,
        costo:costo,
        fecha:fecha,
        detalle:detalle,
      

    }
    return object;
}
