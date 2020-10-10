import Chance from 'chance';
const { wait } = require('@testing-library/react');
const chance = new Chance();

describe('Login candidate user', () => {
  it('Login with email and password', () => {
    cy.visit('http://dev.vota.org.br');
    cy.get('#email')
      .type('albordignon23@gmail.com')
      .should('have.value', 'albordignon23@gmail.com');
    cy.get('#password').type('ifsp@1234').should('have.value', 'ifsp@1234');
    cy.get('[data-testid=submit-button]').click();
  });

  it('Answer Questions!', () => {
    cy.contains('Fechar').click({ timeout: 10000 });
    cy.contains('começar').click();

    for (let i = 0; i < 5; i++) {
      let answers = ['DT', 'D', 'C', 'CT'];
      let answer = answers[Math.floor(Math.random() * answers.length)];
      let str = 'input[value=' + answer + ']';
      cy.get(str).check({ timeout: 5000 });
      let justification = chance.sentence();

      cy.get('#justification').type(justification);
      cy.get('button').contains('Responder').click({ timeout: 5000 });
      cy.wait(3000);
    }

    cy.get('button:first').click({ timeout: 5000 });
    cy.contains('Sair').click();
  });
});
