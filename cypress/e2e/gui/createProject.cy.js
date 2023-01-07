import { faker } from '@faker-js/faker' //  Importando lib Faker que permite inserir palavras aleatóriamente.

const options = { env: { snapshotOnly: true } } //  Variável criada onde é apresentada os snapshot na execução.

describe('Create Project', options, () => {
  //  Executando comandos customizados antes de executar os seguintes test cases. 
  beforeEach(() => {
    cy.api_deleteProjects() //  Deleta todos os projetos.
    cy.login()  // Realiza login.
  })

  //  Test case que verifica a criação de um projeto, inserindo dados aleatórios, com a lib faker.
  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    cy.gui_createProject(project) //  Comando customizado que cria projeto.

    // Validação do test case, onde o nome e a descrição, deve ser igual ao inserido no momento da criação.
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })
})
