describe('web-app', () => {
  it('should display welcome message', () => {
    cy.task('clear-database');
    cy.task('seed-database', { seeder: 'DatabaseSeeder' });
    cy.visit('/');
    cy.get('input#email-input')
      .should('be.visible')
      .type('development@riskchallenger.nl');
    cy.get('input#password-input').should('be.visible').type('Evolution36!');
    cy.get('button').click();
    for (let i = 1; i <= 10; i++) {
      cy.contains(`id: ${i},`).should('be.visible');
    }
  });
});
