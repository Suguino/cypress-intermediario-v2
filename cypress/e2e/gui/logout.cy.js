describe('Logout', () => {
    beforeEach(() => {
      cy.login()  //  Comando customizado que realiza login antes do test case.
      cy.visit('/') //  Comando customizado que acessa tela de inicial.
    })
    
    // Test Case que verifica a realização de logout.
    it('successfully', () => {
      cy.logout() //  Comando customizado de logout.
  
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`) //  Validação do test case, onde a url deve ser igual ao baseUrl/user/sign_in.
    })
  })
  