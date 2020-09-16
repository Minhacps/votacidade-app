/// <reference types="cypress" />
const users = require('../users.js');
const { politicalParties } = require('../../../src/data/form-data');
const { genders } = require('../../../src/data/form-data');
const { ages } = require('../../../src/data/form-data');
const { ethnicGroup } = require('../../../src/data/form-data');

import Chance from 'chance';
const chance = new Chance();

const url = 'http://dev.vota.org.br';
const indice = 1;

describe('Test', () => {
  const name = chance.name();
  const gender = chance.gender();
  const description = chance.sentence();

  beforeEach(() => {
    cy.visit(url);
  });

  it('has a title', () => {
    cy.contains('votacidade');
  });

  it('record a user', () => {
    cy.contains('Cadastrar').click();
    cy.get('#name').type(name).should('have.value', name);
    cy.get('#city').select(users[indice].city);
    cy.get('#email')
      .type(users[indice].email)
      .should('have.value', users[indice].email);
    cy.get('#password')
      .type(users[indice].password)
      .should('have.value', users[indice].password);
    if (users[indice].perfil === 'candidate') {
      cy.get('#isCandidate').check({ force: true });
      let gender = genders[Math.floor(Math.random() * genders.length)].category;
      cy.get('#gender').select(gender);
      let ethnic =
        ethnicGroup[Math.floor(Math.random() * ethnicGroup.length)].category;
      cy.get('#ethnicGroup').select(ethnic);
      let age = ages[Math.floor(Math.random() * ages.length)].category;
      cy.get('#age').select(age);
      cy.get('#cnpj').type('49.015.186/0001-41');
      let candidateNumber = Math.floor((Math.random() * 1000000) % 1000);
      cy.get('#candidateNumber').type(candidateNumber);
      let politicalParty =
        politicalParties[Math.floor(Math.random() * politicalParties.length)]
          .sigla;
      cy.get('#politicalParty').select(politicalParty);
      cy.get('#description').type(description);
    }
    cy.get('button[data-testid=submit-button]').click();
    cy.wait(5000);
    cy.contains('Fechar').click();
    cy.get('button:first').click({ timeout: 5000 });
    cy.contains('Sair').click();
  });
});
