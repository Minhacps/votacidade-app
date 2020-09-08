describe('Login with email and password', () => {
  it('Login with email and password', () => {
    cy.visit('http://app.vota.org.br');
    cy.get('#email')
      .type('albordignon23@gmail.com')
      .should('have.value', 'albordignon23@gmail.com');
    cy.get('#password').type('ifsp@1234').should('have.value', 'ifsp@1234');

    cy.get('[data-testid=submit-button]').click();
  });
});
