import { faker } from '@faker-js/faker' //  Importando lib Faker que permite inserir palavras aleatóriamente.

const options = { env: { snapshotOnly: true } } //  Variável criada onde é apresentada os snapshot na execução.

describe('Create Issue', options, () => {
  //  Variável que cria uma issue, inserindo título, descrição dentro de um projeto (nome e descrição), com a lib faker.
  const issue = { 
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  //  Executando comandos customizados antes de executar os seguintes test cases. 
  beforeEach(() => {
    cy.api_deleteProjects() //  Deleta todos os projetos.
    cy.login()  // Realiza login.
    cy.api_createProject(issue.project) //  Cria projeto via API.
  })

  //  Test case que verifica a criação de uma issue, dentro de um projeto.
  it('Verify if is possible create a issue', () => {
    cy.gui_createIssue(issue)

    //  Validação do test case, onde os detalhes da issue deve ser igual ao título e descrição criadas com a lib faker.
    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})
