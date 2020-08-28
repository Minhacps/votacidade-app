describe('Login with Google', () => {
  it('Login with Google', () => {
    cy.visit('http://app.vota.org.br');
    cy.contains('Entrar com Google').click();
  });
});
