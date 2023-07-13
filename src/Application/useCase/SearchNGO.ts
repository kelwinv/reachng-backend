import { NGO } from "../../Domains/Entities/NGO";
import { NGORepository } from "../repository/NGORepository";

class SearchNGO {
  ngoRepository: NGORepository;

  constructor(ngoRepository: NGORepository) {
    this.ngoRepository = ngoRepository;
  }

  async execute({ page, pageSize }: Input): Promise<Output> {
    const { ngos, total, totalNGOs } = await this.ngoRepository.paginate({
      page,
      size: pageSize,
      filter: {},
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
  pageSize: 2;
};

type Output = {
  ngos: NGO[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalNGOs: number;
};

export { SearchNGO };
