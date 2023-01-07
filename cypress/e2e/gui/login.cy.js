//  Test case que verifica a realização de login.
describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name') //  Variável criada que 'puxa' username inserida no arquivo cypress.env.json.
    const password = Cypress.env('user_password') //  Variável criada que 'puxa' password inserida no arquivo cypress.env.json.
    const options = { cacheSession: false } //  Variável criada para não utilizar o cache usado em outros testes.

    cy.login(user, password, options) //  Comando customizado de login, passando os valores user, password e options.

    cy.get('.qa-user-avatar').should('be.visible')  //  Validação do test case, onde o valor passado deve estar visível.
  })
})