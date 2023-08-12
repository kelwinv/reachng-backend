import { NGO } from "Domains/Entities/NGO";
import { NGORepository } from "Domains/repository/NGORepository";

class SearchNGO {
  ngoRepository: NGORepository;

  constructor(ngoRepository: NGORepository) {
    this.ngoRepository = ngoRepository;
  }

  async execute({ page, pageSize, filter }: Input): Promise<Output> {
    const { ngos, total, totalNGOs } = await this.ngoRepository.paginate({
      page,
      size: pageSize,
      filter,
    });

    return {
      ngos,
      page,
      pageSize,
      totalPages: total,
      totalNGOs,
    };
  }
}

type Input = {
  page: number;
  pageSize: number;
  filter?: {
    categoryId?: string;
  };
};

type Output = {
  ngos: NGO[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalNGOs: number;
};

export { SearchNGO };
