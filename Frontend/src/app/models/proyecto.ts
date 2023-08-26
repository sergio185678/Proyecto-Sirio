export class Proyecto{
    id:number;
    nombre?:string;
    concurso?:string;
    categoria?:string;
    fecha?:number;
    url_img_principal?:string;
    constructor(id:number,nombre:string,concurso:string,categoria:string,fecha:number,url_img_principal:string){
        this.id=id;
        this.nombre=nombre;
        this.concurso=concurso;
        this.categoria=categoria;
        this.fecha=fecha;
        this.url_img_principal=url_img_principal;
    }
}