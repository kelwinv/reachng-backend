import {
  NGORepository,
  paginateInput,
  paginateOutput,
} from "Application/repository/NGORepository";
import { NGO } from "Domains/Entities/NGO";

class NGOInMemoryRepository implements NGORepository {
  NGOs: NGO[];

  constructor() {
    this.NGOs = [];
  }

  async saveMany(input: NGO[]): Promise<void> {
    this.NGOs.push(...input);
  }

  paginate({ page, size, filter }: paginateInput): Promise<paginateOutput> {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    let paginatedNGOs = this.NGOs.slice(startIndex, endIndex);
    if (filter?.category) {
      paginatedNGOs = paginatedNGOs.filter(
        (ong) => ong.category.name === filter.category,
      );
    }
    const totalNGOs = this.NGOs.length;
    const totalPages = Math.ceil(totalNGOs / size);

    return new Promise((resolve) => {
      resolve({
        ngos: paginatedNGOs,
        total: totalPages,
        totalNGOs: totalNGOs,
      });
    });
  }
}

export { NGOInMemoryRepository };
