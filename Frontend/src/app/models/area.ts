export interface Area {
  Director: Lider;
  Subdirector: Lider;
  Integrantes?: Integrante[];
}
export interface Lider {
  Nombre: string;
  Carrera: string;
  Descripcion: string;
  Icon?: string;
  Photo: string;
  Linkedin: string;
  Instagram?: string;
  Facebook?: string;
  Twitter?: string;
  Github?: string;
}
export interface Integrante {
  Nombre: string;
  Carrera: string;
  Photo: string;
  Linkedin: string;
  Github?: string;
}

