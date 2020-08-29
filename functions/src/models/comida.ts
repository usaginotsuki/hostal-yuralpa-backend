/*============ Comida ============*/

export interface Comida{
    idcomida?:string,
    idcliente?:string,
    comida:string,
    costo:string,
    fecha:string,
    observaciones:string,

}


export function Comida(data:any, id?:string){

    const {comida, costo, fecha, observaciones}= data;

    let object:Comida={
        idcomida:id,
        comida:comida,
        costo:costo,
        fecha:fecha,
        observaciones:observaciones,



    }
    return object;
}
