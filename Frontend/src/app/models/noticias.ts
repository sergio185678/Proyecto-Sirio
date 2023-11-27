export class Noticias{
  id:number;
  titulo?:string;
  descripcion?:string;
  url_img?:string;
  url_noticia?:string;
  constructor(id:number, titulo:string, descripcion:string, url_img:string, url_noticia:string){
    this.id=id;
    this.titulo= titulo;
    this.descripcion=descripcion;
    this.url_img=url_img;
    this.url_noticia=url_noticia;
  }
}
