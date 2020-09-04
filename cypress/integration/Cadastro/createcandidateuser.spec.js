/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Test', () => {
  const email = chance.email();
  const password = 'ifsp@1234';
  const name = chance.name();
  const gender = chance.gender();
  const description = chance.sentence();

  beforeEach(() => {
    cy.visit('http://app.vota.org.br');
  });

  it('has a title', () => {
    cy.contains('votacidade');
  });

  it('record candidate', () => {
    cy.contains('Cadastrar').click();
    cy.get('#name').type(name).should('have.value', name);
    cy.get('#city').select('Campinas');
    cy.get('#email').type(email).should('have.value', email);
    cy.get('#password').type(password).should('have.value', password);
    // cy.contains('Sou candidata(o)').check()
    cy.get('[type="checkbox"]').check();
    cy.get('#gender').select('Feminino');
    cy.get('#ethnicGroup').select('Amarela');
    cy.get('#age').select('55-59');
    cy.get('#cnpj').type('49.015.186/0001-41');
    cy.get('#candidateNumber').type(13);
    cy.get('#politicalParty').select('PT');
    cy.get('#description').type(description);
    cy.get('button[data-testid=submit-button]').click();
    cy.contains('Questionário').click();

    for (let i = 0; i < 30; i++) {
      cy.get('input[value=D]').check();
      // cy.get('button').contains('Responder', { timeout: 10000 }).click();
      cy.contains('Responder').should('be.visible');
    }

    // cy.get('input[value=D]').check();
    // cy.get('button').contains('Responder', { timeout: 10000 }).click();

    // cy.get('input[value=D]').check();
    // cy.contains('Responder', { timeout: 10000 }).click();

    // cy.get('input[value=D]').check();
    // cy.contains('Responder', { timeout: 10000 }).click();
  });

  //   cy.contains('Entrar').click();
  // });
});
