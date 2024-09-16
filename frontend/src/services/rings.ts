import { RingCreateResponse, RingProps, RingPropsArray } from "@/types/rings";
import api from "./api";

export const getRings = async (): Promise<RingPropsArray[]> => {
  const response = await api.get("/aneis");

  return response.data;
};

export const getRingById = async (id: string): Promise<RingProps> => {
  const response = await api.get(`/aneis/${id}`);

  const { nome, poder, portador, forjadoPor, imagem } = response.data;

  return { nome, poder, portador, forjadoPor, imagem };
};

export const createRing = async (
  ring: RingProps
): Promise<RingCreateResponse> => {
  const response = await api.post("/aneis", ring);
  const { id, nome: name } = response.data;

  return { id, name };
};

export const editRing = async (id: string, ring: RingProps): Promise<any> => {
  const response = await api.patch(`/aneis/${id}`, ring);

  return response.data;
};

export const deleteRing = async (id: string): Promise<any> => {
  const response = await api.delete(`/aneis/${id}`);

  return response.data;
};
