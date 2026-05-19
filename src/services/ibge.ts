import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.IBGE_API;

export type IBGEState = { id: string; nome: string };

export const fetchStates = async (): Promise<IBGEState[]> => {
  try {
    const url = `${BASE_URL}/localidades/estados?orderBy=nome`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as IBGEState[];
    return data;
  } catch {
    return [];
  }
};

