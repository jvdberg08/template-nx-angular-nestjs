describe('web-app', () => {
  it('should display welcome message', () => {
    cy.task('clear-database');
    cy.task('seed-database', { seeder: 'DatabaseSeeder' });

    cy.visit('/');
    for (let i = 1; i <= 10; i++) {
      cy.contains(`id: ${i},`).should('be.visible');
    }
  });
});
