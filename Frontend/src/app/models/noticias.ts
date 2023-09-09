export class Noticias{
  id:number;
  nombre?:string;
  descripcion?:string;
  url_img?:string;
  url_noticia?:string;
  constructor(id:number,nombre:string, descripcion:string,url_img:string,url_noticia:string){
    this.id=id;
    this.nombre= nombre;
    this.descripcion=descripcion;
    this.url_img=url_img;
    this.url_noticia=url_noticia;
  }
}
