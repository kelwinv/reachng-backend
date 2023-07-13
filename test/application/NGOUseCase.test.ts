import { SearchNGO } from "../../src/Application/useCase/SearchNGO";
import { NGO } from "../../src/Domains/Entities/NGO";
import { NGOInMemoryRepository } from "../../src/Infra/repository/memory/NGOInMemoryRepository";

describe("NGOUseCase", () => {
  const ngoRepository = new NGOInMemoryRepository();
  beforeAll(() => {
    const ngos = [
      {
        id: "1",
        name: "ONG A",
        description: "Descrição da ONG A",
        address: "Endereço da ONG A",
        contact: "Contato da ONG A",
      },
      {
        id: "2",
        name: "ONG B",
        description: "Descrição da ONG B",
        address: "Endereço da ONG B",
        contact: "Contato da ONG B",
      },
      {
        id: "3",
        name: "ONG C",
        description: "Descrição da ONG C",
        address: "Endereço da ONG C",
        contact: "Contato da ONG C",
      },
      {
        id: "4",
        name: "ONG D",
        description: "Descrição da ONG D",
        address: "Endereço da ONG D",
        contact: "Contato da ONG D",
      },
      {
        id: "5",
        name: "ONG E",
        description: "Descrição da ONG E",
        address: "Endereço da ONG E",
        contact: "Contato da ONG E",
      },
    ];

    ngoRepository.ngos = ngos;
  });

  test("should be paginated results of NGO", async () => {
    const page = 1;
    const pageSize = 2;

    const searchNGO = new SearchNGO(ngoRepository);

    const output = await searchNGO.execute({ page, pageSize });

    expect(output.ngos).toHaveLength(2);
    expect(output.page).toBe(1);
    expect(output.pageSize).toBe(2);
    expect(output.totalPages).toBe(3);

    for (const ngo of output.ngos) {
      expect(ngo).toBeInstanceOf(NGO);
    }

    const output2 = await searchNGO.execute({ page: 3, pageSize });

    expect(output2.ngos).toHaveLength(1);
    expect(output2.page).toBe(3);
    expect(output2.pageSize).toBe(2);
  });
});
