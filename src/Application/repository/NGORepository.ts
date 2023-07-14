import { NGO } from "Domains/Entities/NGO";

interface NGORepository {
  paginate(input: paginateInput): Promise<paginateOutput>;
  saveMany(input: NGO[]): Promise<void>;
}

export type paginateInput = {
  page: number;
  size: number;
  filter?: {
    category?: string;
  };
};

export type paginateOutput = {
  ngos: NGO[];
  totalNGOs: number;
  total: number;
};

export { NGORepository };
