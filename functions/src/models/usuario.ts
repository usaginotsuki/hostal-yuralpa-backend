export interface Usuario{
    idusuario?:string,
    nombre:string,
    apellido:string,
    nacionalidad:string,
    telefono:string
}

export function Usuario(data:any, id?:string){
    const {nombre, apellido, nacionalidad, telefono} = data;

    let object:Usuario={
        idusuario:id,
        nombre:nombre,
        apellido:apellido,
        nacionalidad:nacionalidad,
        telefono:telefono,
    }
    return object;
}
