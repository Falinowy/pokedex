describe('cards', () => {
  it('check and edit pokemon', () => {
    cy.visit('/');
    cy.wait(7000);
    cy.get('[ng-reflect-router-link="/cards/pl3-1/Darkness"]').click();
    cy.get('label').contains('Artist:').should('be.visible');
    cy.get('[data-cy=artist]').clear();
    cy.get('[data-cy=artist]').should('be.visible').type('test');
    cy.get('[data-cy=hp]').clear();
    cy.get('[data-cy=hp]').should('be.visible').type('100');
    cy.get('[data-cy=nationalPokedexNumbers]').clear();
    cy.get('[data-cy=nationalPokedexNumbers]').should('be.visible').type('2');
    cy.get('[data-cy=number]').clear();
    cy.get('[data-cy=number]').should('be.visible').type('6');
    cy.get('[data-cy=rarity]').clear();
    cy.get('[data-cy=rarity]').should('be.visible').type('Rare');
    cy.get('[data-cy=types]').clear();
    cy.get('[data-cy=types]').should('be.visible').type('Grass');
    cy.get('[data-cy=submit]').click();
    cy.get('.mat-snack-bar-container').contains('Pokemon has been successfully edited!').should('be.visible');
    cy.wait(5000);
    cy.get('[ng-reflect-router-link="/cards/ex3-1/Darkness"] > .mat-focus-indicator').click();
  });
  it('displays form validation', () => {
    cy.wait(7000);
    cy.get('[data-cy=artist]').clear();
    cy.get('[data-cy=hp]').click();
    cy.get('.alert > .ng-star-inserted').contains('Name is required');
    cy.get('[data-cy=artist]').clear();
    cy.get('[data-cy=artist]').should('be.visible').type('te');
    cy.get('[data-cy=hp]').click();
    cy.get('.alert > .ng-star-inserted').contains('Name should be 3 character');
  });
  it('back to home page', () => {
    cy.get('[data-cy=back]').click();
    cy.wait(7000);
    cy.get('[data-cy=back]').click();
  });
});
