import { NGO } from "../Entities/NGO";

interface NGORepository {
  paginate(input: paginateInput): Promise<paginateOutput>;
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
