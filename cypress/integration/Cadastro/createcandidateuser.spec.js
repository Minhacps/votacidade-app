describe('Create candidate user', () => {
  it('Create candidate user!', () => {
    cy.visit('http://app.vota.org.br');
    cy.contains('Cadastrar').click();

    cy.get('#name')
      .type('André Luís Bordignon')
      .should('have.value', 'André Luís Bordignon');
    cy.get('#city').select('Campinas');
    cy.get('#email')
      .type('albordignon23@gmail.com')
      .should('have.value', 'albordignon23@gmail.com');
    cy.get('#password').type('ifsp@1234').should('have.value', 'ifsp@1234');
    // cy.contains('Sou candidata(o)').check()
    cy.get('[type="checkbox"]').check();
    cy.get('#gender').select('Feminino');
    cy.get('#ethnicGroup').select('Amarela');
    cy.get('#age').select('55-59');
    cy.get('#cnpj').type('49.015.186/0001-41');
    cy.get('#candidateNumber').type(13);
    cy.get('#politicalParty').select('PT');
    cy.get('#description').type('bla bla bla');
    cy.contains('Entrar').click();
  });
});
