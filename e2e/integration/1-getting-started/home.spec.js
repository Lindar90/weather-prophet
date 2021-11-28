/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('allows to search for a city and navigate to a city\'s weather page', () => {
    cy.get('[data-test="async-autocomplete"]').click();
    cy.get('[data-test="async-autocomplete"]').find('input').type('Van ');

    cy.get('li[role="option"]')
      .should('have.length', 2)

    cy.contains('Vlakte van de Raan').click();
    cy.url().should('eq', 'http://localhost:3000/city/Vlakte%20van%20de%20Raan');
  })
})
