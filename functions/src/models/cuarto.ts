/*============ Cuarto ============*/

export interface Cuarto{
    idcuarto?:string,
    num_habitacion:string,
    costo:string,
    camas:string,
    compartido:boolean,
    internet:boolean,
    aire:boolean,
    disponibilidad:boolean
}


export function Cuarto(data:any, id?:string){

    const {num_habitacion, costo, camas, disponibilidad, compartido, internet, aire}= data;

    let object:Cuarto={
        idcuarto:id,
        num_habitacion:num_habitacion,
        costo:costo,
        camas:camas,
        disponibilidad:disponibilidad,
        compartido:compartido,
        internet:internet,
        aire:aire


    }
    return object;
}
