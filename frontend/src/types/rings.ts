export interface RingProps {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

export interface RingPropsArray extends RingProps {
  id: string;
}

export interface RingCreateResponse {
  id: string;
  name: string;
}
