import {
  NGORepository,
  paginateInput,
  paginateOutput,
} from "Domains/repository/NGORepository";
import { NGO } from "Domains/Entities/NGO";

class NGOInMemoryRepository implements NGORepository {
  readonly NGOs: NGO[];

  constructor() {
    this.NGOs = [];
  }

  paginate({ page, size, filter }: paginateInput): Promise<paginateOutput> {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    let paginatedNGOs = this.NGOs.slice(startIndex, endIndex);
    if (filter?.categoryId) {
      paginatedNGOs = paginatedNGOs.filter(
        (ong) => ong.category.id === filter.categoryId,
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

  async deleteMany(input: NGO[]): Promise<void> {
    for (const ngo of input) {
      const index = this.NGOs.findIndex((item) => item.id === ngo.id);
      if (index !== -1) {
        this.NGOs.splice(index, 1);
      }
    }
  }

  async saveMany(input: NGO[]): Promise<void> {
    this.NGOs.push(...input);
  }
}

export { NGOInMemoryRepository };
