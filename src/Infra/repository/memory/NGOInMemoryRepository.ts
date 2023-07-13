import {
  NGORepository,
  paginateInput,
  paginateOutput,
} from "../../../Application/repository/NGORepository";
import { NGO } from "../../../Domains/Entities/NGO";

class NGOInMemoryRepository implements NGORepository {
  public ngos = [
    {
      id: "1",
      name: "ONG A",
      description: "Descrição da ONG A",
      address: "Endereço da ONG A",
      contact: "Contato da ONG A",
    },
  ];
  paginate({ page, size }: paginateInput): Promise<paginateOutput> {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedNGOsData = this.ngos.slice(startIndex, endIndex);
    const totalNGOs = this.ngos.length;
    const totalPages = Math.ceil(totalNGOs / size);

    const ngosData = paginatedNGOsData.map(
      ({ id, name, address, contact, description }) =>
        new NGO(id, name, description, address, contact),
    );

    return new Promise((resolve) => {
      resolve({
        ngos: ngosData,
        total: totalPages,
        totalNGOs: totalNGOs,
      });
    });
  }
}

export { NGOInMemoryRepository };
