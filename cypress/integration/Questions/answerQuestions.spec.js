const { wait } = require('@testing-library/react');
const users = require('../users.js');
import Chance from 'chance';
const chance = new Chance();

const url = 'http://dev.vota.org.br';

const indice = 0;

describe('Login candidate user and answers the questions', () => {
  it('Login with email and password', () => {
    cy.visit(url);
    cy.get('#email').type(users[indice].email);
    cy.get('#password')
      .type(users[indice].password)
      .should('have.value', users[indice].password);
    cy.get('[data-testid=submit-button]').click();
  });

  it('Answer Questions!', () => {
    cy.contains('Fechar').click({ timeout: 10000 });
    cy.contains('começar').click();

    for (let i = 0; i < 30; i++) {
      let answers = ['DT', 'D', 'C', 'CT'];
      let answer = answers[Math.floor(Math.random() * answers.length)];
      let str = 'input[value=' + answer + ']';
      cy.get(str).check({ timeout: 5000 });
      if (users[indice].perfil === 'candidate') {
        let justification = chance.sentence();

        cy.get('#justification').type(justification);
        if (i === 29) {
          cy.get('button').contains('Finalizar').click({ timeout: 5000 });
        } else {
          cy.get('button').contains('Responder').click({ timeout: 5000 });
        }
      }
      cy.wait(3000);
    }
    cy.get('button:first').click({ timeout: 5000 });
    cy.contains('Sair').click();
  });
});
