describe('Create candidate user', () => {
  it('Login with email and password', () => {
    cy.visit('http://app.vota.org.br');
    cy.get('#email')
      .type('albordignon23@gmail.com')
      .should('have.value', 'albordignon23@gmail.com');
    cy.get('#password').type('ifsp@1234').should('have.value', 'ifsp@1234');

    cy.get('[data-testid=submit-button]').click();
  });

  it('Answer Questions!', () => {
    cy.contains('Questionário').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    cy.get('#answer-DP').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla');
    cy.get('button').contains('Responder').click();

    cy.get('#answer-D').check();
    cy.get('#justification').type('blabla bla', { timeout: 5000 });
    cy.get('button').contains('Responder').click();

    // cy.contains('Logout').click();

    //   // for (let i = 0; i < 30; i++) {
    //   //   cy.get('input[value=D]').check();
    //   //   cy.contains('Responder').should('be.visible').as('botaodisponivel');
    //   //   cy.wait('@botaodisponivel').then(() => {
    //   //     cy.get('button').contains('Responder', { timeout: 10000 }).click();
    //   //   });

    //   // }

    //   cy.get('#answer-DP').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('#answer-D').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=D]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=DP]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=D]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=DP]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=D]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=DP]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=D]').check();
    //   cy.get('button').contains('Responder').click();

    //   cy.get('input[value=DP]').check();
    //   cy.get('button').contains('Responder').click();
  });
});
