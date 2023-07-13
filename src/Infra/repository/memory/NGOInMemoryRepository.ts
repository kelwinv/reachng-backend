import {
  NGORepository,
  paginateInput,
  paginateOutput,
} from "../../../Application/repository/NGORepository";
import { NGO } from "../../../Domains/Entities/NGO";

class NGOInMemoryRepository implements NGORepository {
  public NGOs: Array<typeof NGO.prototype> = [
    {
      id: "1",
      name: "ONG A",
      mission: "Descrição da ONG A",
      projects: ["ajudando crianças"],
      address: "Endereço da ONG A",
      category: "ambiente",
      contact: [
        {
          type: "email",
          value: "ong@gmail.com",
        },
      ],
    },
  ];

  paginate({ page, size, filter }: paginateInput): Promise<paginateOutput> {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    let paginatedNGOsData = this.NGOs.slice(startIndex, endIndex);
    if (filter?.category) {
      paginatedNGOsData = paginatedNGOsData.filter(
        (ong) => ong.category === filter.category,
      );
    }
    const totalNGOs = this.NGOs.length;
    const totalPages = Math.ceil(totalNGOs / size);

    const NGOsData = paginatedNGOsData.map(
      (ngo) =>
        new NGO(
          ngo.id,
          ngo.name,
          ngo.mission,
          ngo.projects,
          ngo.address,
          ngo.category,
          ngo.contact,
          ngo?.specificNeeds,
          ngo?.externalPaymentMethod,
        ),
    );

    return new Promise((resolve) => {
      resolve({
        ngos: NGOsData,
        total: totalPages,
        totalNGOs: totalNGOs,
      });
    });
  }
}

export { NGOInMemoryRepository };
