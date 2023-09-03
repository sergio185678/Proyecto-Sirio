export class Noticias{
  id:number;
  descripcion?:string;
  url_img?:string;
  url_noticia?:string;
  constructor(id:number,descripcion:string,url_img:string,url_noticia:string){
    this.id=id;
    this.descripcion=descripcion;
    this.url_img=url_img;
    this.url_noticia=url_noticia;

  }
}
