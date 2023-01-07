//  Comando customizado para realizar login via GUI, inserindo username e password, salvos no arquivo cypress.env.json.
Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {}, //  Variável criada para utilizar o cache usado em outros testes.
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')  //  Comando para acessar página de login.
  
      cy.get("[data-qa-selector='login_field']").type(user) 
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })  //  Variável que 'esconde' o password.
      cy.get("[data-qa-selector='sign_in_button']").click()
    }
    
    //  Variável que permite recriar sessão.
    const validate = () => {
      cy.visit('/')
      cy.location('pathname', { timeout: 1000 })
        .should('not.eq', '/users/sign_in')
    }
  
    const options = {
      cacheAcrossSpecs: true,
      validate,
    }
  
    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
  })
  

//  Comando customizado para realizar logout via GUI.
Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})
  
//  Comando customizado para criar projeto via GUI.
Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

//  Comando customizado para criar issue via GUI.
Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})

//  Comando customizado para setar label a uma issue, via GUI.
Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

//  Comando customizado para setar milestone a uma issue, via GUI.
Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})