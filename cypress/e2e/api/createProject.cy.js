import { faker } from '@faker-js/faker' //  Importando lib Faker que permite inserir palavras aleatóriamente.

describe('Create Project', () => {
  beforeEach(() => cy.api_deleteProjects()) //  Executando comando customizado de deletar todos os projetos, antes de executar os seguintes test cases.
  
  //  Test case que verifica criação de projeto, usando uma variável, inserindo nome e descrição com a lib faker.
  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    //  Validação do test case, via API, onde o status deve ser igual a 200, body name deve ser igual ao nome criado aleatóriamente, e o body description deve ser igual a descrição criada aleatóriamente. 
    cy.api_createProject(project)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(project.name)
        expect(response.body.description).to.equal(project.description)
      })
  })
})
