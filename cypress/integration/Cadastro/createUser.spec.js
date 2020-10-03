/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Create User', () => {
  const password = 'ifsp@1234';
  const name = chance.name();
  const gender = chance.gender();
  const description = chance.sentence();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('http://localhost:3000');
  });

  it('creates candidate', () => {
    const email = chance.email();

    cy.contains('Cadastrar').click();
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#city').select('Campinas (SP)');
    cy.get('#password').type(password);
    cy.get('#isCandidate').check({ force: true });

    cy.get('#gender').select('Feminino');
    cy.get('#ethnicGroup').select('Amarela');
    cy.get('#age').select('55-59');
    cy.get('#cnpj').type('49.015.186/0001-41');
    cy.get('#candidateNumber').type(13);
    cy.get('#politicalParty').select('PT');
    cy.get('#description').type(description);
    cy.get('button[data-testid=submit-button]').click();
  });

  it('creates voter', () => {
    const email = chance.email();

    cy.contains('Cadastrar').click();
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#city').select('Campinas (SP)');
    cy.get('#password').type(password);

    cy.get('button[data-testid=submit-button]').click();
  });
});
